CREATE TABLE `sites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`site` text NOT NULL,
	`year` integer NOT NULL,
	`url` text NOT NULL,
	`createdAt` integer NOT NULL,
	`file` blob NOT NULL
);
