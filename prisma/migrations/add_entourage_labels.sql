-- Add customizable label columns for entourage fixed fields
-- Already in Prisma schema but may not be in DB yet

ALTER TABLE Invitation
  ADD COLUMN IF NOT EXISTS bestManLabel VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS maidOfHonorLabel VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS groomsMenLabel VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS bridesMaidsLabel VARCHAR(255) NULL;
