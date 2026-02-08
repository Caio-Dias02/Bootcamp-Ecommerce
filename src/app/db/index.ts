import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { relations } from 'drizzle-orm';

import * as schema from "./schema";

const categoryRelations = relations(schema.categoryTable, (params) => ({
  products: params.many(schema.productTable),
}));

const productRelations = relations(schema.productTable, (params) => ({
  category: params.one(schema.categoryTable, {
    fields: [schema.productTable.categoryId],
    references: [schema.categoryTable.id],
  }),
  variants: params.many(schema.productVariantTable),
}));

const productVariantRelations = relations(schema.productVariantTable, (params) => ({
  product: params.one(schema.productTable, {
    fields: [schema.productVariantTable.productId],
    references: [schema.productTable.id],
  }),
}));

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: {
    ...schema,
    categoryRelations,
    productRelations,
    productVariantRelations,
  },
});
