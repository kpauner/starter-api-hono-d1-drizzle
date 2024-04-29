import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
	image: text('image'),
});

export const posts = sqliteTable('posts', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	title: text('title').notNull(),
	slug: text('slug').notNull(),
	description: text('description'),
	image: text('image'),
	body: text('body'),
	createdAt: integer('createdAt', { mode: 'timestamp_ms' }),
});

export const postRelations = relations(posts, ({ many }) => ({
	postCategories: many(postOnCategories),
}));

export const categories = sqliteTable('categories', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
});

export const categoryRelations = relations(categories, ({ many }) => ({
	posts: many(postOnCategories),
}));

export const postOnCategories = sqliteTable('post_categories', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	postId: integer('post_id')
		.notNull()
		.references(() => posts.id),
	categoryId: integer('category_id')
		.notNull()
		.references(() => categories.id),
});

export const postOnCategoriesRelations = relations(postOnCategories, ({ one }) => ({
	post: one(posts, {
		fields: [postOnCategories.postId],
		references: [posts.id],
	}),

	category: one(categories, {
		fields: [postOnCategories.categoryId],
		references: [categories.id],
	}),
}));
