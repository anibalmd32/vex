CREATE TABLE `transaction_type` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`deleted_at` text
);
--> statement-breakpoint
CREATE TABLE `transaction` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`dollar_amount` text NOT NULL,
	`bolivar_amount` text NOT NULL,
	`current_rate` text NOT NULL,
	`payment_proof_url` text,
	`payment_details` text,
	`type_transaction_id` integer NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`deleted_at` text,
	FOREIGN KEY (`type_transaction_id`) REFERENCES `transaction_type`(`id`) ON UPDATE no action ON DELETE no action
);
