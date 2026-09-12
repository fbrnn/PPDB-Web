CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`email` varchar(255) NOT NULL,
	`name` varchar(255),
	`role` enum('STUDENT','ADMIN','SUPER_ADMIN') NOT NULL DEFAULT 'STUDENT',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `admin_allowlist` (
	`id` varchar(36) NOT NULL,
	`email` varchar(255) NOT NULL,
	`role` enum('ADMIN','SUPER_ADMIN') NOT NULL DEFAULT 'ADMIN',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `admin_allowlist_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_allowlist_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `otps` (
	`id` varchar(36) NOT NULL,
	`email` varchar(255) NOT NULL,
	`code` varchar(6) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`used_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `otps_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `registrations` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`status` enum('DRAFT','SUBMITTED','REVISION_REQUIRED','VERIFIED') NOT NULL DEFAULT 'DRAFT',
	`full_name` varchar(255),
	`nisn` varchar(20),
	`nik` varchar(20),
	`gender` enum('L','P'),
	`birth_place` varchar(100),
	`birth_date` date,
	`religion` varchar(50),
	`phone_number` varchar(25),
	`address` text,
	`rt_rw` varchar(20),
	`village` varchar(100),
	`district` varchar(100),
	`city` varchar(100),
	`postal_code` varchar(10),
	`previous_school_name` varchar(255),
	`previous_school_npsn` varchar(20),
	`graduation_year` varchar(4),
	`diploma_number` varchar(100),
	`father_name` varchar(255),
	`father_nik` varchar(20),
	`father_occupation` varchar(100),
	`father_phone` varchar(25),
	`mother_name` varchar(255),
	`mother_nik` varchar(20),
	`mother_occupation` varchar(100),
	`mother_phone` varchar(25),
	`guardian_name` varchar(255),
	`guardian_nik` varchar(20),
	`guardian_occupation` varchar(100),
	`guardian_phone` varchar(25),
	`guardian_relation` varchar(50),
	`revision_notes` text,
	`submitted_at` timestamp,
	`verified_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `registrations_id` PRIMARY KEY(`id`),
	CONSTRAINT `registrations_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
ALTER TABLE `registrations` ADD CONSTRAINT `registrations_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;