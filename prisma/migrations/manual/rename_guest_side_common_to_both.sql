-- Rename InvitationGuestGroup.side enum value `common` -> `both`.
--
-- MySQL enums can't be "renamed" in place, so we widen the enum to include both
-- values, migrate the data, then narrow it back without `common`.
-- Run this against the database BEFORE deploying the code that expects `both`.

-- 1) Widen the enum so both old and new values are valid during migration.
ALTER TABLE InvitationGuestGroup
  MODIFY COLUMN side ENUM('groom', 'bride', 'common', 'both')
  NULL DEFAULT 'both';

-- 2) Migrate existing rows from the old value to the new one.
UPDATE InvitationGuestGroup
  SET side = 'both'
  WHERE side = 'common';

-- 3) Narrow the enum to the final set (drops `common`).
ALTER TABLE InvitationGuestGroup
  MODIFY COLUMN side ENUM('groom', 'bride', 'both')
  NULL DEFAULT 'both';
