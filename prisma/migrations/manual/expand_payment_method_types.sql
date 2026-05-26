-- Expand the InvitationPaymentMethod.type enum to include all e-wallet and
-- bank options used in the Philippines.
--
-- Original: ENUM('GCASH', 'BPI', 'BDO')
-- New: 2 e-wallets + 14 banks
--
-- Run via:
--   npx prisma db execute \
--     --file=./prisma/migrations/manual/expand_payment_method_types.sql \
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
    'UNIONBANK'
  ) NOT NULL;
