import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const userTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const categoryTable = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const categoryRelations = relations(categoryTable, (params)=>{
    return {
        products: params.many(productTable),
    }
})
 

export const productTable = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  categoryId: uuid('category_id').references(() => categoryTable.id).notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const productRelations = relations(productTable, (params)=>{
    return {
        category: params.one(categoryTable, {
            fields: [productTable.categoryId],
            references: [categoryTable.id],
        }),
        variants: params.many(productVariantTable),
    }
})

export const productVariantTable = pgTable('product_variants', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => productTable.id).notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  color: text('color').notNull(),
  priceInCents: integer('price_in_cents').notNull(),
  imageUrl: text('image_url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const productVariantRelations = relations(productVariantTable, (params)=>{
    return {
        product: params.one(productTable, {
            fields: [productVariantTable.productId],
            references: [productTable.id],
        }),
    }
})

