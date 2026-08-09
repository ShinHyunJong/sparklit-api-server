-- Two-column sponsor sections can carry a different role on each side
-- (e.g. "TO LIGHT OUR WAY" left, "TO CLOTHE US AS ONE" right), so the label
-- is stored per side just like the names.

ALTER TABLE InvitationSponsor
  ADD COLUMN IF NOT EXISTS labelRight VARCHAR(100) NOT NULL DEFAULT '' AFTER label;
