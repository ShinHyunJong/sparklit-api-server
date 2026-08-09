-- Adds an explicit access-mode column to Invitation so a Private/Common
-- invitation whose shared password hasn't been entered yet is not misread as
-- Specific (previously inferred from an empty universalPassword).
--
-- Values: 'common' | 'specific' (NULL for Public / not-yet-set).
ALTER TABLE `Invitation` ADD COLUMN `accessMode` VARCHAR(20) NULL;

-- Backfill existing Private invitations from the old inference rule so behavior
-- is unchanged for current data: password present -> common, else specific.
UPDATE `Invitation`
SET `accessMode` = CASE
  WHEN `isPasswordProtected` = 1 AND `universalPassword` IS NOT NULL AND `universalPassword` <> '' THEN 'common'
  WHEN `isPasswordProtected` = 1 THEN 'specific'
  ELSE NULL
END;
