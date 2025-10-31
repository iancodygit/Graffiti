import { pgTable, serial, text, timestamp, real, integer, boolean, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  deviceId: text('device_id').notNull().unique(),
  username: text('username').notNull().default('Guest User'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const artists = pgTable('artists', {
  id: serial('id').primaryKey(),
  handle: text('handle').notNull().unique(),
  bio: text('bio'),
  avatar: text('avatar'),
  socialLinks: jsonb('social_links').$type<{ instagram?: string; twitter?: string; website?: string }>(),
  notionId: text('notion_id').unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const graffitiPins = pgTable('graffiti_pins', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
  images: jsonb('images').notNull().$type<string[]>(),
  styleTags: jsonb('style_tags').$type<string[]>(),
  artistId: integer('artist_id').references(() => artists.id),
  status: text('status').notNull().default('active'),
  city: text('city'),
  description: text('description'),
  notionId: text('notion_id').unique(),
  submittedByUserId: integer('submitted_by_user_id').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const likes = pgTable('likes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  pinId: integer('pin_id').notNull().references(() => graffitiPins.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const savedPins = pgTable('saved_pins', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  pinId: integer('pin_id').notNull().references(() => graffitiPins.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  likes: many(likes),
  savedPins: many(savedPins),
  submissions: many(graffitiPins),
}));

export const artistsRelations = relations(artists, ({ many }) => ({
  pins: many(graffitiPins),
}));

export const graffitiPinsRelations = relations(graffitiPins, ({ one, many }) => ({
  artist: one(artists, {
    fields: [graffitiPins.artistId],
    references: [artists.id],
  }),
  submittedBy: one(users, {
    fields: [graffitiPins.submittedByUserId],
    references: [users.id],
  }),
  likes: many(likes),
  savedBy: many(savedPins),
}));

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
  pin: one(graffitiPins, {
    fields: [likes.pinId],
    references: [graffitiPins.id],
  }),
}));

export const savedPinsRelations = relations(savedPins, ({ one }) => ({
  user: one(users, {
    fields: [savedPins.userId],
    references: [users.id],
  }),
  pin: one(graffitiPins, {
    fields: [savedPins.pinId],
    references: [graffitiPins.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Artist = typeof artists.$inferSelect;
export type InsertArtist = typeof artists.$inferInsert;
export type GraffitiPin = typeof graffitiPins.$inferSelect;
export type InsertGraffitiPin = typeof graffitiPins.$inferInsert;
export type Like = typeof likes.$inferSelect;
export type SavedPin = typeof savedPins.$inferSelect;
