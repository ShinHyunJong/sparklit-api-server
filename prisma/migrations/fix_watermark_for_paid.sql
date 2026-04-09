-- Align legacy Invitation rows so watermarkEnabled matches billingStatus.
-- Paid invitations must not show the FREE TRIAL watermark.

UPDATE Invitation
SET watermarkEnabled = 0
WHERE billingStatus = 'PAID'
  AND watermarkEnabled = 1;

-- Also ensure non-paid invitations do show the watermark.
UPDATE Invitation
SET watermarkEnabled = 1
WHERE billingStatus <> 'PAID'
  AND watermarkEnabled = 0;
