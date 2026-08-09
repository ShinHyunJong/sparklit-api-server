-- Add an "Other" payment method type plus a free-text bank/label column.
--
-- - type enum gains 'OTHER' so users can pick a bank not in the preset list.
-- - customLabel holds the free-text bank/wallet name shown for OTHER entries.
--
-- Run via:
--   npx prisma db execute \
--     --file=./prisma/migrations/manual/add_payment_method_other.sql \
--     --schema=./prisma/schema.prisma

ALTER TABLE `InvitationPaymentMethod`
  MODIFY COLUMN `type` ENUM(
    'GCASH',
    'MAYA',
    'AUB',
    'BANKCOM',
    'BDO',
    'BPI',
    'CHINABANK',
    'EASTWEST',
    'GOTYME',
    'METROBANK',
    'PBCOM',
    'PNB',
    'RCBC',
    'SEABANK',
    'SECURITY_BANK',
    'UNIONBANK',
    'OTHER'
  ) NOT NULL;

ALTER TABLE `InvitationPaymentMethod`
  ADD COLUMN `customLabel` VARCHAR(100) NULL AFTER `type`;
