-- Backfill Mr./Mrs. prefixes into parent name columns.
-- Previously the frontend hardcoded "Mr." and "Mrs." before each parent name.
-- We removed the hardcoded prefix so users can freely edit the full label
-- (e.g. drop the title, use "Dr.", "Engr.", etc.). Run this once to copy
-- the old implicit prefix into the stored value.
--
-- Guards:
--   - Only update non-null, non-empty values.
--   - Skip rows that already start with Mr./Mrs. (case-insensitive) so the
--     migration is idempotent and safe to re-run.

UPDATE Invitation
SET groomDadName = CONCAT('Mr. ', groomDadName)
WHERE groomDadName IS NOT NULL
  AND groomDadName <> ''
  AND LOWER(groomDadName) NOT LIKE 'mr.%'
  AND LOWER(groomDadName) NOT LIKE 'mr %';

UPDATE Invitation
SET brideDadName = CONCAT('Mr. ', brideDadName)
WHERE brideDadName IS NOT NULL
  AND brideDadName <> ''
  AND LOWER(brideDadName) NOT LIKE 'mr.%'
  AND LOWER(brideDadName) NOT LIKE 'mr %';

UPDATE Invitation
SET groomMomName = CONCAT('Mrs. ', groomMomName)
WHERE groomMomName IS NOT NULL
  AND groomMomName <> ''
  AND LOWER(groomMomName) NOT LIKE 'mrs.%'
  AND LOWER(groomMomName) NOT LIKE 'mrs %';

UPDATE Invitation
SET brideMomName = CONCAT('Mrs. ', brideMomName)
WHERE brideMomName IS NOT NULL
  AND brideMomName <> ''
  AND LOWER(brideMomName) NOT LIKE 'mrs.%'
  AND LOWER(brideMomName) NOT LIKE 'mrs %';

-- Verify after running:
-- SELECT id, uniqueId, groomDadName, groomMomName, brideDadName, brideMomName
-- FROM Invitation
-- WHERE groomDadName IS NOT NULL OR groomMomName IS NOT NULL
--    OR brideDadName IS NOT NULL OR brideMomName IS NOT NULL;
