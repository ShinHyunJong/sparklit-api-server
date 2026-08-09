-- DEPLOY ORDER (required): run this SQL against the target DB BEFORE deploying
-- the API. The regenerated Prisma client selects these columns on every
-- Invitation query — deploying the API first breaks ALL invitation reads.
-- Order: (1) this SQL on prod DB → (2) deploy sparklit-api-server → (3) deploy sparklit-web.
-- Columns are additive with defaults; no backfill needed. Web-first is degraded-but-safe.

-- Opening animation settings (editor accordion: on/off + 3 custom text lines)
ALTER TABLE `Invitation`
  ADD COLUMN `openingEnabled` TINYINT(1) NOT NULL DEFAULT 0,
  ADD COLUMN `openingText1` VARCHAR(100) NULL,
  ADD COLUMN `openingText2` VARCHAR(100) NULL,
  ADD COLUMN `openingText3` VARCHAR(100) NULL;
