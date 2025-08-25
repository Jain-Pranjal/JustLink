import { createTRPCRouter, protectedProcedure } from '@/trpc/init'
import { db } from '@/db'
import { user, workspaces, tags, shortLinks, shortLinkTags } from '@/db/schema'
import { z } from 'zod'
import { eq, and, inArray } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'

const RESERVED_USERNAMES = [
    'admin',
    'root',
    'support',
    'help',
    'contact',
    'about',
    'privacy',
    'terms',
    'login',
    'logout',
    'signup',
    'register',
    'api',
    'dashboard',
    'settings',
    'profile',
    'user',
    'users',
    'team',
    'workspace',
    'folio',
    'shortlink',
    'analytics',
    'system',
    'www',
    'app',
    'static',
    'cdn',
    'assets',
    'public',
    'null',
    'undefined',
]

const validateUsername = (username: string) => {
    const lower = username.toLowerCase()
    if (RESERVED_USERNAMES.includes(lower)) {
        throw new Error('This username is reserved, please choose another.')
    }
}

export const dashboardRouter = createTRPCRouter({
    // user need to login or signup to make the username and it will be displayed when go to the dashboard
    // as this username is created after the user is already been signed up thats why we are updating that records
    createUsername: protectedProcedure
        .input(
            z.object({
                username: z.string().min(3).max(30),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { username } = input
            const { auth } = ctx

            validateUsername(username)

            // Check if username is taken
            const [existingUsername] = await db
                .select()
                .from(user)
                .where(eq(user.userName, username))
                .limit(1)

            if (existingUsername) {
                throw new TRPCError({
                    code: 'CONFLICT',
                    message: 'Username is already taken',
                })
            }

            // Update existing logged-in user
            await db
                .update(user)
                .set({ userName: username })
                .where(eq(user.id, auth.user.id))

            return { success: true, userName: username }
        }),

    // Delete user account
    deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
        const { auth } = ctx

        // Delete user account from database
        await db.delete(user).where(eq(user.id, auth.user.id))

        return { success: true }
    }),

    // Get all workspaces for current user
    getWorkspaces: protectedProcedure.query(async ({ ctx }) => {
        const { auth } = ctx

        const [items] = await db
            .select()
            .from(workspaces)
            .where(eq(workspaces.userId, auth.user.id))

        return items
    }),

    // Get single workspace by id
    getWorkspaceById: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .query(async ({ input, ctx }) => {
            const { auth } = ctx

            const [workspace] = await db
                .select()
                .from(workspaces)
                .where(
                    and(
                        eq(workspaces.id, input.id),
                        eq(workspaces.userId, auth.user.id)
                    )
                )
                .limit(1)

            if (!workspace) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Workspace not found',
                })
            }

            return workspace
        }),

    // create workspace
    createWorkspace: protectedProcedure
        .input(
            z.object({
                name: z.string().min(3).max(100),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { auth } = ctx
            const { name } = input

            // Create workspace in database
            const [createdWorkspace] = await db
                .insert(workspaces)
                .values({
                    name,
                    slug: name.toLowerCase().replace(/\s+/g, '-'),
                    userId: auth.user.id,
                })
                .returning()

            return { success: true, workspace: createdWorkspace }
        }),

    // delete workspace

    deleteWorkspace: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { auth } = ctx
            const { id } = input

            // Delete workspace from database
            const [deletedWorkspace] = await db
                .delete(workspaces)
                .where(
                    and(
                        eq(workspaces.id, id),
                        eq(workspaces.userId, auth.user.id)
                    )
                )
                .returning()

            if (!deletedWorkspace) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Workspace not found',
                })
            }

            return { success: true }
        }),

    // Profile
    // Get current user profile
    getProfile: protectedProcedure.query(async ({ ctx }) => {
        const { auth } = ctx

        const [profile] = await db
            .select()
            .from(user)
            .where(eq(user.id, auth.user.id))
            .limit(1)

        if (!profile) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'User not found',
            })
        }

        return profile
    }),
})

// TODO: need to handle the data for the clicks so we can update that as well
export const shortLinkRouter = createTRPCRouter({
    // Create short link
    createShortLink: protectedProcedure
        .input(
            z.object({
                slug: z.string().min(3).max(100),
                destination: z.string().url(),
                expiresAt: z.date().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { auth } = ctx
            const { slug, destination, expiresAt } = input

            // Ensure slug is globally unique
            const [existingSlug] = await db
                .select()
                .from(shortLinks)
                .where(eq(shortLinks.slug, slug))
                .limit(1)

            if (existingSlug) {
                throw new TRPCError({
                    code: 'CONFLICT',
                    message: 'Slug is already taken. Try a different one.',
                })
            }

            // Insert new shortlink
            const [createdLink] = await db
                .insert(shortLinks)
                .values({
                    userId: auth.user.id,
                    slug,
                    destination,
                    expiresAt,
                })
                .returning()

            return { success: true, shortLink: createdLink }
        }),

    // Get all short links for logged-in user
    getAllShortLinks: protectedProcedure.query(async ({ ctx }) => {
        const { auth } = ctx

        const [links] = await db
            .select()
            .from(shortLinks)
            .where(eq(shortLinks.userId, auth.user.id))

        return { shortLinks: links }
    }),

    // Get single shortlink by slug
    getShortLink: protectedProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ input, ctx }) => {
            const { slug } = input
            const { auth } = ctx
            const [link] = await db
                .select()
                .from(shortLinks)
                .where(
                    and(
                        eq(shortLinks.slug, slug),
                        eq(shortLinks.userId, auth.user.id)
                    )
                )
                .limit(1)

            if (!link) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Short link not found',
                })
            }

            return { shortLink: link }
        }),

    updateShortLink: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                slug: z.string().min(3).max(100),
                destination: z.string().url(),
                expiresAt: z.date().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { auth } = ctx
            const { id, slug, destination, expiresAt } = input

            // Check if slug is taken by another link
            const [existingSlug] = await db
                .select()
                .from(shortLinks)
                .where(eq(shortLinks.slug, slug))
                .limit(1)

            if (existingSlug && existingSlug.id !== id) {
                throw new TRPCError({
                    code: 'CONFLICT',
                    message: 'Slug is already taken. Try a different one.',
                })
            }

            // Update the short link
            const [updatedLink] = await db
                .update(shortLinks)
                .set({
                    slug,
                    destination,
                    expiresAt,
                    updatedAt: new Date(),
                })
                .where(
                    and(
                        eq(shortLinks.id, id),
                        eq(shortLinks.userId, auth.user.id)
                    )
                )
                .returning()

            if (!updatedLink) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Short link not found or not owned by you',
                })
            }

            return { success: true, shortLink: updatedLink }
        }),

    // Delete short link
    deleteShortLink: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { auth } = ctx
            const { id } = input

            const [deleted] = await db
                .delete(shortLinks)
                .where(
                    and(
                        eq(shortLinks.id, id),
                        eq(shortLinks.userId, auth.user.id)
                    )
                )
                .returning()

            if (!deleted) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Short link not found or not owned by you',
                })
            }

            return { success: true }
        }),
})

export const tagRouter = createTRPCRouter({
    createTag: protectedProcedure
        .input(
            z.object({
                workspaceId: z.string(),
                tagName: z.string().min(1).max(50),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { auth } = ctx
            const { workspaceId, tagName } = input

            try {
                const [tag] = await db
                    .insert(tags)
                    .values({
                        tagName,
                        workspaceId,
                        userId: auth.user.id,
                    })
                    .onConflictDoNothing() // prevent duplicate tagName in same workspace
                    .returning()

                if (!tag) {
                    throw new TRPCError({
                        code: 'CONFLICT',
                        message: 'Tag already exists in this workspace',
                    })
                }

                return { success: true, tag }
            } catch (err) {
                console.error(err)
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to create tag',
                })
            }
        }),

    // Get all tags of user for a particular workspace
    getAllTags: protectedProcedure
        .input(z.object({ workspaceId: z.string() }))
        .query(async ({ input, ctx }) => {
            const { workspaceId } = input
            const { auth } = ctx

            const allTags = await db
                .select()
                .from(tags)
                .where(
                    and(
                        eq(tags.workspaceId, workspaceId),
                        eq(tags.userId, auth.user.id)
                    )
                )

            return { tags: allTags }
        }),

    //   DELETE TAG
    deleteTag: protectedProcedure
        .input(z.object({ tagId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { auth } = ctx

            const [deleted] = await db
                .delete(tags)
                .where(
                    and(eq(tags.id, input.tagId), eq(tags.userId, auth.user.id))
                )
                .returning()

            if (!deleted) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Tag not found',
                })
            }

            return { success: true }
        }),

    // Update tag
    updateTag: protectedProcedure
        .input(
            z.object({ tagId: z.string(), tagName: z.string().min(1).max(50) })
        )
        .mutation(async ({ input, ctx }) => {
            const { auth } = ctx
            const { tagId, tagName } = input

            const [updatedTag] = await db
                .update(tags)
                .set({ tagName })
                .where(and(eq(tags.id, tagId), eq(tags.userId, auth.user.id)))
                .returning()

            if (!updatedTag) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Tag not found or not owned by you',
                })
            }

            return { success: true, tag: updatedTag }
        }),

    // Attach tags to short link
    attachTagsToShortLink: protectedProcedure
        .input(
            z.object({
                shortLinkId: z.string(),
                tagIds: z.array(z.string()).min(1),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { auth } = ctx
            const { shortLinkId, tagIds } = input

            // Ensure shortLink belongs to the user
            const [shortLink] = await db
                .select()
                .from(shortLinks)
                .where(
                    and(
                        eq(shortLinks.id, shortLinkId),
                        eq(shortLinks.userId, auth.user.id)
                    )
                )
                .limit(1)
            if (!shortLink) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Short link not found or not owned by you',
                })
            }

            const values = tagIds.map((tagId) => ({
                shortLinkId,
                tagId,
                createdAt: new Date(),
            }))

            // Insert many (conflict-safe due to unique constraint)
            await db.insert(shortLinkTags).values(values).onConflictDoNothing()

            return { success: true }
        }),

    // detach tags from short link
    detachTagsFromShortLink: protectedProcedure
        .input(
            z.object({
                shortLinkId: z.string(),
                tagIds: z.array(z.string()).min(1),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { auth } = ctx
            const { shortLinkId, tagIds } = input

            // Ensure shortLink belongs to the user
            const [shortLink] = await db
                .select()
                .from(shortLinks)
                .where(
                    and(
                        eq(shortLinks.id, shortLinkId),
                        eq(shortLinks.userId, auth.user.id)
                    )
                )
                .limit(1)
            if (!shortLink) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Short link not found or not owned by you',
                })
            }

            await db
                .delete(shortLinkTags)
                .where(
                    and(
                        eq(shortLinkTags.shortLinkId, shortLinkId),
                        inArray(shortLinkTags.tagId, tagIds)
                    )
                )

            return { success: true }
        }),

    getTagsOfShortLink: protectedProcedure
        .input(z.object({ shortLinkId: z.string() }))
        .query(async ({ input, ctx }) => {
            const { auth } = ctx

            const [shortLink] = await db
                .select()
                .from(shortLinks)
                .where(
                    and(
                        eq(shortLinks.id, input.shortLinkId),
                        eq(shortLinks.userId, auth.user.id)
                    )
                )
                .limit(1)

            if (!shortLink) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Short link not found or not owned by you',
                })
            }

            const tagsWithDetails = await db
                .select({
                    id: tags.id,
                    tagName: tags.tagName,
                })
                .from(shortLinkTags)
                .innerJoin(tags, eq(shortLinkTags.tagId, tags.id))
                .where(eq(shortLinkTags.shortLinkId, input.shortLinkId))

            return { tags: tagsWithDetails }
        }),
})
