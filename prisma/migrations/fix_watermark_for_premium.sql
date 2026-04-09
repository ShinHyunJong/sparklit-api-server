-- Turn off watermark for all Premium invitations.
-- Run once to clean up legacy rows where watermarkEnabled is out of sync.

UPDATE Invitation
SET watermarkEnabled = 0
WHERE currentPlanCode = 'PREMIUM'
  AND watermarkEnabled = 1;

-- Verify after running:
-- SELECT id, uniqueId, billingStatus, currentPlanCode, watermarkEnabled
-- FROM Invitation
-- WHERE currentPlanCode = 'PREMIUM' AND watermarkEnabled = 1;
