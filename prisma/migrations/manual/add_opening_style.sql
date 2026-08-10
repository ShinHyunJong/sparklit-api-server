-- Presentation options for the opening animation (text color, font scale, ...).
-- Stored as JSON so new options can be added without another migration.
--
-- MySQL does not support ADD COLUMN IF NOT EXISTS, so guard with a check
-- to keep this script safe to re-run.

SET @exists := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'Invitation'
    AND COLUMN_NAME = 'openingStyle'
);

SET @sql := IF(
  @exists = 0,
  'ALTER TABLE Invitation ADD COLUMN openingStyle JSON NULL',
  'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
