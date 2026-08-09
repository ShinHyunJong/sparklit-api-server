-- Adds the InvitationPaymentMethod table.
--
-- Stores per-payment-method details (GCash / BPI / BDO) attached to an
-- invitation. Replaces the free-text Invitation.bankAccount column going
-- forward, but bankAccount is kept untouched for now (no data migration).
--
-- Run via:
--   echo "$(cat prisma/migrations/manual/add_invitation_payment_method.sql)" \
--     | npx prisma db execute --stdin --schema=./prisma/schema.prisma

CREATE TABLE `InvitationPaymentMethod` (
  `id`            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `invitationId`  INT UNSIGNED NOT NULL,
  `type`          ENUM('GCASH', 'BPI', 'BDO') NOT NULL,
  `accountName`   VARCHAR(100) NULL,
  `accountNumber` VARCHAR(100) NULL,
  `qrImageKey`    VARCHAR(255) NULL,
  `memo`          TEXT NULL,
  `order`         INT UNSIGNED NOT NULL DEFAULT 0,
  `createdAt`     DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`     DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_payment_method_invitation` (`invitationId`),
  INDEX `idx_payment_method_invitation_order` (`invitationId`, `order`),
  CONSTRAINT `fk_payment_method_invitation`
    FOREIGN KEY (`invitationId`) REFERENCES `Invitation`(`id`)
    ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
