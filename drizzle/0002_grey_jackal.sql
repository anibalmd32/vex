PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_test` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` text
);
--> statement-breakpoint
INSERT INTO `__new_test`("id", "title", "content", "created_at", "updated_at", "deleted_at") SELECT "id", "title", "content", "created_at", "updated_at", "deleted_at" FROM `test`;--> statement-breakpoint
DROP TABLE `test`;--> statement-breakpoint
ALTER TABLE `__new_test` RENAME TO `test`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_transaction_type` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`key` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` text
);
--> statement-breakpoint
INSERT INTO `__new_transaction_type`("id", "name", "key", "created_at", "updated_at", "deleted_at") SELECT "id", "name", "key", "created_at", "updated_at", "deleted_at" FROM `transaction_type`;--> statement-breakpoint
DROP TABLE `transaction_type`;--> statement-breakpoint
ALTER TABLE `__new_transaction_type` RENAME TO `transaction_type`;--> statement-breakpoint
CREATE TABLE `__new_transaction` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`dollar_amount` text NOT NULL,
	`bolivar_amount` text NOT NULL,
	`current_rate` text NOT NULL,
	`payment_proof_url` text,
	`payment_details` text,
	`type_transaction_id` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` text,
	FOREIGN KEY (`type_transaction_id`) REFERENCES `transaction_type`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_transaction`("id", "dollar_amount", "bolivar_amount", "current_rate", "payment_proof_url", "payment_details", "type_transaction_id", "created_at", "updated_at", "deleted_at") SELECT "id", "dollar_amount", "bolivar_amount", "current_rate", "payment_proof_url", "payment_details", "type_transaction_id", "created_at", "updated_at", "deleted_at" FROM `transaction`;--> statement-breakpoint
DROP TABLE `transaction`;--> statement-breakpoint
ALTER TABLE `__new_transaction` RENAME TO `transaction`;