-- Independent column count + right-side text for primary and secondary sponsors.
--
-- `sponsorColumns` (already exists) → controls PRIMARY sponsor layout.
-- `secondarySponsorColumns`         → controls SECONDARY sponsor layout.
-- `primarySponsorRight`             → right-column text (only used when sponsorColumns = 2)
-- `secondarySponsorRight`           → right-column text (only used when secondarySponsorColumns = 2)
--
-- Run via:
--   npx prisma db execute \
--     --file=./prisma/migrations/manual/add_secondary_sponsor_columns.sql \
--     --schema=./prisma/schema.prisma

ALTER TABLE `Invitation`
  ADD COLUMN `secondarySponsorColumns` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  ADD COLUMN `primarySponsorRight`     TEXT NULL,
  ADD COLUMN `secondarySponsorRight`   TEXT NULL;
