-- Add a column to control sponsor section layout (1 or 2 columns).
--
-- Run via:
--   npx prisma db execute \
--     --file=./prisma/migrations/manual/add_sponsor_columns.sql \
--     --schema=./prisma/schema.prisma

ALTER TABLE `Invitation`
  ADD COLUMN `sponsorColumns` TINYINT UNSIGNED NOT NULL DEFAULT 1;
