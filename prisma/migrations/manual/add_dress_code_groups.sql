-- Dress Code Groups — make dress code free-form (label rename + add/remove
-- groups), like Entourage / Secondary Sponsor.
--
-- Introduces InvitationDressCodeGroup (label / description / photoKey / order)
-- and links InvitationDressColor to a group via groupId. All additions are
-- nullable / new tables → existing rows and queries are unaffected.
--
-- This file is SCHEMA ONLY (run once, before deploying the API that includes
-- dressCodeGroupList in findOne). The data backfill lives in
-- sync_dress_code_groups.cjs, which is idempotent — run it after this file,
-- again right after the new dress-code UI is deployed, and once more later to
-- catch writes from stale clients:
--
--   node -r dotenv/config prisma/migrations/manual/sync_dress_code_groups.cjs --dry
--   node -r dotenv/config prisma/migrations/manual/sync_dress_code_groups.cjs
--   node -r dotenv/config prisma/migrations/manual/sync_dress_code_groups.cjs --only-missing   # after new UI is live
--
-- Statements are split (no multi-statement, no IF NOT EXISTS on ADD COLUMN)
-- because MySQL + `prisma db execute` runs them one at a time.

-- 1) New group table -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `InvitationDressCodeGroup` (
  `id`           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `invitationId` INT UNSIGNED NOT NULL,
  `label`        VARCHAR(100) NULL,
  `description`  TEXT NULL,
  `photoKey`     VARCHAR(255) NULL,
  `order`        INT UNSIGNED NOT NULL DEFAULT 0,
  `createdAt`    TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`    TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_dress_code_group_invitation_id` (`invitationId`),
  KEY `idx_dress_code_group_invitation_order` (`invitationId`, `order`),
  CONSTRAINT `InvitationDressCodeGroup_ibfk_1`
    FOREIGN KEY (`invitationId`) REFERENCES `Invitation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2) Link colors to a group ----------------------------------------------------
ALTER TABLE `InvitationDressColor` ADD COLUMN `groupId` INT UNSIGNED NULL;

-- 3) FK + index for the new column ---------------------------------------------
ALTER TABLE `InvitationDressColor` ADD INDEX `InvitationDressColor_groupId` (`groupId`);

ALTER TABLE `InvitationDressColor`
  ADD CONSTRAINT `InvitationDressColor_ibfk_2`
  FOREIGN KEY (`groupId`) REFERENCES `InvitationDressCodeGroup` (`id`) ON DELETE CASCADE;

-- 4) Backfill ------------------------------------------------------------------
-- Moved to sync_dress_code_groups.cjs (see header). The previous inline
-- INSERT ... SELECT backfill was not re-runnable: it duplicated groups for
-- invitations that already had them, and could not pick up legacy writes made
-- by old clients after the first run.
