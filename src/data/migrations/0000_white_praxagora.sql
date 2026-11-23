CREATE TABLE `business_profile` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`owner` text,
	`email` text,
	`phone` text,
	`address` text,
	`abn` text,
	`logo_path` text,
	`currency_code` text DEFAULT 'AUD' NOT NULL,
	`gst_enabled` integer DEFAULT false NOT NULL,
	`tax_rate_bps` integer DEFAULT 1000 NOT NULL,
	`default_terms` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `clients` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`phone` text,
	`billing_address` text,
	`service_address` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE TABLE `document_items` (
	`id` text PRIMARY KEY NOT NULL,
	`document_id` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`description` text NOT NULL,
	`quantity` real DEFAULT 1 NOT NULL,
	`rate_minor` integer NOT NULL,
	`total_minor` integer NOT NULL,
	FOREIGN KEY (`document_id`) REFERENCES `documents`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` text PRIMARY KEY NOT NULL,
	`doc_type` text NOT NULL,
	`display_number` text NOT NULL,
	`client_id` text,
	`client_snapshot` text NOT NULL,
	`issue_date` text NOT NULL,
	`due_date` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`currency` text DEFAULT 'AUD' NOT NULL,
	`discount_type` text,
	`discount_value_minor` integer,
	`tax_snapshot` text NOT NULL,
	`subtotal_minor` integer DEFAULT 0 NOT NULL,
	`total_minor` integer DEFAULT 0 NOT NULL,
	`notes` text,
	`source_quote_id` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `documents_display_number_unique` ON `documents` (`display_number`);--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`document_id` text NOT NULL,
	`paid_at` text NOT NULL,
	`method` text NOT NULL,
	`reference` text,
	`notes` text,
	FOREIGN KEY (`document_id`) REFERENCES `documents`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `payments_document_id_unique` ON `payments` (`document_id`);--> statement-breakpoint
CREATE TABLE `service_presets` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`category` text NOT NULL,
	`pricing_mode` text DEFAULT 'fixed' NOT NULL,
	`unit_rate_minor` integer DEFAULT 0 NOT NULL,
	`enabled` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
