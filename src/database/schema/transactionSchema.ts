import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id } from "./helpers/id";
import { timestamps } from "./helpers/timestamp";
import { transactionType } from "./transactionTypeSchema";

interface PaymentMetadata {
  platformName?: string;
  bankName?: string;
  accountNumber?: string;
  accountType?: string;
  phoneNumber?: string;
  shoppingCenterName?: string;
  reason?: string;
}

interface PaymentItemsMetadata {
  name?: string;
  quantity?: number;
  price?: string;
  currency?: string;
  dollarAmount?: string;
  bolivarAmount?: string;
  currentRate?: string;
}

interface PaymentDetails {
  origin?: PaymentMetadata;
  target?: PaymentMetadata;
  items?: PaymentItemsMetadata[];
}

export const transaction = sqliteTable("transaction", {
  id,
  dollarAmount: text("dollar_amount").notNull(),
  bolivarAmount: text("bolivar_amount").notNull(),
  currentRate: text("current_rate").notNull(),
  paymentProofUrl: text("payment_proof_url"),
  paymentDetails: text("payment_details", {
    mode: "json",
  }).$type<PaymentDetails>(),
  typeTransactionId: integer("type_transaction_id")
    .notNull()
    .references(() => transactionType.id),
  ...timestamps,
});
