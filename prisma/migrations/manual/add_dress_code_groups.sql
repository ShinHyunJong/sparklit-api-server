-- Dress Code Groups — make dress code free-form (label rename + add/remove
-- groups), like Entourage / Secondary Sponsor.
--
-- Introduces InvitationDressCodeGroup (label / description / photoKey / order)
-- and links InvitationDressColor to a group via groupId. Existing Gentlemen /
-- Ladies data is backfilled into two groups so nothing changes for current
-- invitations. All additions are nullable / new tables → existing rows and
-- queries are unaffected.
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

-- 4) Backfill Gentlemen groups -------------------------------------------------
-- One group per invitation that has any gentleman dress-code data (description,
-- a photo, or at least one color). Label stays NULL so the frontend shows its
-- default ("Gentlemen"). order = 0.
INSERT INTO `InvitationDressCodeGroup` (`invitationId`, `label`, `description`, `photoKey`, `order`)
SELECT
  inv.`id`,
  NULL,
  inv.`dressCodeGentleman`,
  (
    SELECT p.`croppedKey`
    FROM `InvitationCoverPhoto` p
    WHERE p.`invitationId` = inv.`id` AND p.`type` = 'dressCodeGentleman'
    LIMIT 1
  ),
  0
FROM `Invitation` inv
WHERE
  (inv.`dressCodeGentleman` IS NOT NULL AND inv.`dressCodeGentleman` <> '')
  OR EXISTS (
    SELECT 1 FROM `InvitationCoverPhoto` p
    WHERE p.`invitationId` = inv.`id` AND p.`type` = 'dressCodeGentleman'
  )
  OR EXISTS (
    SELECT 1 FROM `InvitationDressColor` c
    WHERE c.`invitationId` = inv.`id` AND c.`type` = 'gentleman'
  );

-- 5) Backfill Ladies groups ----------------------------------------------------
INSERT INTO `InvitationDressCodeGroup` (`invitationId`, `label`, `description`, `photoKey`, `order`)
SELECT
  inv.`id`,
  NULL,
  inv.`dressCodeLady`,
  (
    SELECT p.`croppedKey`
    FROM `InvitationCoverPhoto` p
    WHERE p.`invitationId` = inv.`id` AND p.`type` = 'dressCodeLady'
    LIMIT 1
  ),
  1
FROM `Invitation` inv
WHERE
  (inv.`dressCodeLady` IS NOT NULL AND inv.`dressCodeLady` <> '')
  OR EXISTS (
    SELECT 1 FROM `InvitationCoverPhoto` p
    WHERE p.`invitationId` = inv.`id` AND p.`type` = 'dressCodeLady'
  )
  OR EXISTS (
    SELECT 1 FROM `InvitationDressColor` c
    WHERE c.`invitationId` = inv.`id` AND c.`type` = 'lady'
  );

-- 6) Point existing colors at their new group ----------------------------------
-- Match on (invitationId, type) → the group created above with the matching
-- order (gentleman → order 0, lady → order 1).
UPDATE `InvitationDressColor` c
JOIN `InvitationDressCodeGroup` g
  ON g.`invitationId` = c.`invitationId`
  AND g.`order` = 0
SET c.`groupId` = g.`id`
WHERE c.`type` = 'gentleman' AND c.`groupId` IS NULL;

UPDATE `InvitationDressColor` c
JOIN `InvitationDressCodeGroup` g
  ON g.`invitationId` = c.`invitationId`
  AND g.`order` = 1
SET c.`groupId` = g.`id`
WHERE c.`type` = 'lady' AND c.`groupId` IS NULL;
