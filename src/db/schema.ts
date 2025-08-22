import {
    pgTable,
    text,
    varchar,
    timestamp,
    integer,
    boolean,
    unique,
    pgEnum,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { nanoid } from 'nanoid'

// TODO: need to make a component to take the username(globally) after signup + workspace user name also for that user(not globally) - unique per user
//TODO: do we have the username for google login?
//TODO: so we need to insert the username in both the user and folio tables (will work like workspace)

export const user = pgTable('user', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => nanoid(10)),
    userName: text('user_name').notNull().unique(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified')
        .$defaultFn(() => false)
        .notNull(),
    image: text('image'),
    createdAt: timestamp('created_at')
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    updatedAt: timestamp('updated_at')
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
})

export const session = pgTable('session', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => nanoid(10)),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
})

export const account = pgTable('account', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => nanoid(10)),
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
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
})

export const verification = pgTable('verification', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => nanoid(10)),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').$defaultFn(
        () => /* @__PURE__ */ new Date()
    ),
    updatedAt: timestamp('updated_at').$defaultFn(
        () => /* @__PURE__ */ new Date()
    ),
})

// waitlist
export const waitlist = pgTable('waitlist', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => nanoid(10)),
    email: text('email').notNull().unique(), // Unique email for each waitlist
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
        .defaultNow()
        .notNull(),
})

// ---------------- WORKSPACES ----------------
export const workspaces = pgTable(
    'workspaces',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => nanoid(10)),
        name: text('name').notNull(),
        slug: text('slug').notNull(),
        description: text('description'),

        userId: text('user_id')
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),

        createdAt: timestamp('created_at', { withTimezone: true })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp('updated_at', { withTimezone: true })
            .defaultNow()
            .notNull(),
    },
    (table) => ({
        uniqueUserSlug: unique().on(table.userId, table.slug), // enforce per-user slug uniqueness
    })
)

// ---------------- WORKSPACE MEMBERS (for team feature) ----------------
export const workspaceMembers = pgTable('workspace_members', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => nanoid(10)),

    workspaceId: text('workspace_id')
        .notNull()
        .references(() => workspaces.id, { onDelete: 'cascade' }),

    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),

    role: text('role').notNull().default('member'), // owner | admin | member

    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
})

// --------------FOLIOS (Link-in-bio page)-------------------
export const folios = pgTable(
    'folios',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => nanoid(10)),
        userId: text('user_id')
            .references(() => user.id, { onDelete: 'cascade' })
            .notNull(),
        workspaceId: text('workspace_id')
            .notNull()
            .references(() => workspaces.id, { onDelete: 'cascade' }),

        slug: varchar('slug', { length: 100 }).notNull(), //justlink.live/@pranjal
        title: varchar('title', { length: 255 }),
        bio: text('bio'),
        theme: varchar('theme', { length: 50 }),
        createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp('updated_at', { withTimezone: true })
            .defaultNow()
            .notNull(),
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
    id: text('id')
        .primaryKey()
        .$defaultFn(() => nanoid(10)),
    folioId: text('folio_id')
        .references(() => folios.id, { onDelete: 'cascade' })
        .notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    url: text('url').notNull(),
    order: integer('order'),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
        .defaultNow()
        .notNull(),
})

export const folioItemsRelations = relations(folioItems, ({ one }) => ({
    folio: one(folios, {
        fields: [folioItems.folioId],
        references: [folios.id],
    }),
}))

// --------------SHORT LINKS------------------- (dub.co)
export const shortLinks = pgTable('short_links', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => nanoid(10)),

    // Each shortlink is owned by a single user
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),

    // Globally unique slug (no matter workspace)
    slug: varchar('slug', { length: 100 }).notNull().unique(),

    destination: text('destination').notNull(),
    clicks: integer('clicks').default(0).notNull(),
    expiresAt: timestamp('expires_at'),

    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
        .defaultNow()
        .notNull(),
})

export const shortLinksRelations = relations(shortLinks, ({ one, many }) => ({
    user: one(user, {
        fields: [shortLinks.userId],
        references: [user.id],
    }),
    tags: many(shortLinkTags),
}))

// --------------TAGS (Grouping for short links)-------------------
export const tags = pgTable(
    'tags',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => nanoid(10)),
        workspaceId: text('workspace_id')
            .notNull()
            .references(() => workspaces.id, { onDelete: 'cascade' }),
        tagName: varchar('tag_name', { length: 50 }).notNull(),
        createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
            .defaultNow()
            .notNull(),
    },
    (table) => ({
        uniqueWorkspaceTag: unique().on(table.workspaceId, table.tagName),
    })
)

// --------------SHORT LINK TAGS (Join table)-------------------
export const shortLinkTags = pgTable(
    'short_link_tags',
    {
        id: text('id')
            .primaryKey()
            .$defaultFn(() => nanoid(10)),
        shortLinkId: text('short_link_id')
            .references(() => shortLinks.id, { onDelete: 'cascade' })
            .notNull(),
        tagId: text('tag_id')
            .references(() => tags.id, { onDelete: 'cascade' })
            .notNull(),
        createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
            .defaultNow()
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
    id: text('id')
        .primaryKey()
        .$defaultFn(() => nanoid(10)),
    targetType: targetTypeEnum('target_type').notNull(), // folio | shortlink
    targetId: text('target_id').notNull(), // points to folios.id OR shortLinks.id

    userAgent: varchar('user_agent', { length: 500 }),
    ipAddress: varchar('ip_address', { length: 100 }),
    country: varchar('country', { length: 100 }),
    city: varchar('city', { length: 100 }),
    referrer: varchar('referrer', { length: 500 }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
        .defaultNow()
        .notNull(),
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
