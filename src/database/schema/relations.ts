import { relations } from "drizzle-orm";
import { transaction } from "./transactionSchema";
import { transactionType } from "./transactionTypeSchema";

export const transactionRelations = relations(transaction, ({ one }) => ({
  typeTransaction: one(transactionType, {
    fields: [
      transaction.typeTransactionId,
    ],
    references: [
      transactionType.id,
    ],
  }),
}));

export const transactionTypeRelations = relations(
  transactionType,
  ({ many }) => ({
    transactions: many(transaction),
  }),
);
