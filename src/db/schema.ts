import { desc, relations } from 'drizzle-orm'
import {
    boolean,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    unique,
    varchar,
} from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

// Common base fields for all tables
const baseFields = {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => nanoid(10)),
    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
}

// TODO: need to make a component to take the username(globally) after signup + workspace user name also for that user(not globally) - unique per user
//TODO: do we have the username for google login?
//TODO: so we need to insert the username in both the user and folio tables (will work like workspace)

export const user = pgTable('user', {
    ...baseFields,
    userName: text('user_name').unique(), // Will be set after social auth signup
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    onboardingComplete: boolean('onboarding_complete')
        .$defaultFn(() => false)
        .notNull(),
    lastWorkspaceId: text('last_workspace_id'),
    emailVerified: boolean('email_verified')
        .$defaultFn(() => false)
        .notNull(),
    image: text('image'),
})

export const userRelations = relations(user, ({ one }) => ({
    lastWorkspace: one(workspaces, {
        fields: [user.lastWorkspaceId],
        references: [workspaces.id],
    }),
}))

export const session = pgTable('session', {
    ...baseFields,
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
    ...baseFields,
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
})

export const verification = pgTable('verification', {
    ...baseFields,
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
})

// waitlist
export const waitlist = pgTable('waitlist', {
    ...baseFields,
    email: text('email').notNull().unique(), // Unique email for each waitlist
})

// ---------------- WORKSPACES ----------------
export const workspaces = pgTable(
    'workspaces',
    {
        ...baseFields,
        name: text('name').notNull(),
        slug: text('slug').notNull(),
        description: text('description'),

        userId: text('user_id')
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
    },
    (table) => ({
        uniqueUserSlug: unique().on(table.userId, table.slug), // enforce per-user slug uniqueness
    })
)

export const workspaceRelations = relations(workspaces, ({ one }) => ({
    user: one(user, {
        fields: [workspaces.userId],
        references: [user.id],
    }),
}))

// ---------------- WORKSPACE MEMBERS (for team feature) ----------------
export const workspaceMembers = pgTable('workspace_members', {
    ...baseFields,

    workspaceId: text('workspace_id')
        .notNull()
        .references(() => workspaces.id, { onDelete: 'cascade' }),

    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),

    role: text('role').notNull().default('member'), // owner | admin | member
})

// --------------FOLIOS (Link-in-bio page)-------------------
export const folios = pgTable(
    'folios',
    {
        ...baseFields,
        userId: text('user_id')
            .references(() => user.id, { onDelete: 'cascade' })
            .notNull(),
        workspaceId: text('workspace_id')
            .notNull()
            .references(() => workspaces.id, { onDelete: 'cascade' }),

        slug: varchar('slug', { length: 100 }).notNull(), //justlink.live/@pranjal
        displayName: varchar('display_name', { length: 255 }),
        bio: text('bio'),
        theme: varchar('theme', { length: 50 }),
    },
    (table) => ({
        uniquePerFolio: unique().on(table.slug), // each folio handle must be unique globally
    })
)

export const foliosRelations = relations(folios, ({ one, many }) => ({
    user: one(user, {
        fields: [folios.userId],
        references: [user.id],
    }),
    items: many(folioItems),
}))

// --------------FOLIO ITEMS (Links inside folio)-------------------
export const folioItems = pgTable('folio_items', {
    ...baseFields,
    folioId: text('folio_id')
        .references(() => folios.id, { onDelete: 'cascade' })
        .notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    url: text('url'),
    description: text('description'),
    type: varchar('type', { length: 50 }).notNull().default('link'),
    icon: varchar('icon', { length: 100 }),
    color: varchar('color', { length: 50 }),
    image: text('image'),
    username: varchar('username', { length: 255 }),
    followers: varchar('followers', { length: 100 }),
    action: varchar('action', { length: 100 }),
    subtitle: varchar('subtitle', { length: 255 }),
    order: integer('order'),
    isActive: boolean('is_active').default(true).notNull(),
})

export const folioItemsRelations = relations(folioItems, ({ one }) => ({
    folio: one(folios, {
        fields: [folioItems.folioId],
        references: [folios.id],
    }),
}))

// --------------SHORT LINKS-------------------
export const shortLinks = pgTable('short_links', {
    ...baseFields,

    // Each shortlink is owned by a single user
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),

    // Each shortlink belongs to a workspace
    workspaceId: text('workspace_id')
        .notNull()
        .references(() => workspaces.id, { onDelete: 'cascade' }),

    // Globally unique slug (no matter workspace)
    slug: varchar('slug', { length: 100 }).notNull().unique(),
    isArchived: boolean('is_archived').default(false).notNull(),

    destination: text('destination').notNull(),
    clicks: integer('clicks').default(0).notNull(), //TODO: need to make a separate route that will auto inc this
    expiresAt: timestamp('expires_at'),
})

export const shortLinksRelations = relations(shortLinks, ({ one, many }) => ({
    user: one(user, {
        fields: [shortLinks.userId],
        references: [user.id],
    }),
    workspace: one(workspaces, {
        fields: [shortLinks.workspaceId],
        references: [workspaces.id],
    }),
    tags: many(shortLinkTags),
}))

// --------------TAGS (Grouping for short links)-------------------
export const tagColorEnum = pgEnum('tag_color', [
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
    'orange',
    'pink',
])

// --------------TAGS (Grouping for short links)-------------------
export const tags = pgTable(
    'tags',
    {
        ...baseFields,

        userId: text('user_id')
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
        workspaceId: text('workspace_id')
            .notNull()
            .references(() => workspaces.id, { onDelete: 'cascade' }),
        tagName: varchar('tag_name', { length: 50 }).notNull(),
        tagColour: tagColorEnum('tag_colour').notNull(),
    },
    (table) => ({
        uniqueWorkspaceTag: unique().on(table.workspaceId, table.tagName),
    })
)

// --------------SHORT LINK TAGS (Join table) for many-to-many relationship-------------------
export const shortLinkTags = pgTable(
    'short_link_tags',
    {
        ...baseFields,
        shortLinkId: text('short_link_id')
            .references(() => shortLinks.id, { onDelete: 'cascade' })
            .notNull(),
        tagId: text('tag_id')
            .references(() => tags.id, { onDelete: 'cascade' })
            .notNull(),
    },
    (table) => ({
        //  same tag shouldn’t be added twice to the same shortLink
        uniqueShortLinkTag: unique().on(table.shortLinkId, table.tagId),
    })
)

export const tagsRelations = relations(tags, ({ many, one }) => ({
    workspace: one(workspaces, {
        fields: [tags.workspaceId],
        references: [workspaces.id],
    }),
    shortLinks: many(shortLinkTags),
}))

// many to many relationship between shortLinks and tags
export const shortLinkTagsRelations = relations(shortLinkTags, ({ one }) => ({
    shortLink: one(shortLinks, {
        fields: [shortLinkTags.shortLinkId],
        references: [shortLinks.id],
    }),
    tag: one(tags, {
        fields: [shortLinkTags.tagId],
        references: [tags.id],
    }),
}))

// Analytics Clicks
export const targetTypeEnum = pgEnum('target_type', ['folio', 'shortlink']) //we can extend this to track other types

export const analytics = pgTable('analytics', {
    ...baseFields,
    targetType: targetTypeEnum('target_type').notNull(), // folio | shortlink
    targetId: text('target_id').notNull(), // points to folios.id OR shortLinks.id

    userAgent: varchar('user_agent', { length: 500 }),
    ipAddress: varchar('ip_address', { length: 100 }),
    country: varchar('country', { length: 100 }),
    city: varchar('city', { length: 100 }),
    referrer: varchar('referrer', { length: 500 }),
})

export const FullSchema = {
    user,
    session,
    account,
    verification,
    waitlist,
    workspaces,
    workspaceMembers,
    shortLinks,
    shortLinkTags,
    tags,
    analytics,
    folios,
    folioItems,
}

// for the analytics :- https://ga-dev-tools.google/campaign-url-builder/
/*

THESE SETTING WILL BE USED FOR THE ANALYTICS FOR THE LINKS THAT CONTAINS ALL THE OTHER LINKS IN THAT

use the UTM parameter in order to track the source of the link of the user (liktree) 

and for the IP address :- https://ipapi.co/
*/

/*
issue was worksapce was unique gloablly but we need a diff user to be able to create their own workspace with the same name 
Soln- so we take the username and append in the url so that url will be app.justlink.live/username/workspaceslug and username is always globally unnique instead of worksapce slug 
*/
