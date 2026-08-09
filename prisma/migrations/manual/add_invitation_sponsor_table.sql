-- Free-form secondary sponsor rows (label + names per side).
-- Mirrors InvitationEntourage, but stores the two rendered columns explicitly
-- instead of encoding a side into the label string.
--
-- The legacy Invitation.secondarySponsor / secondarySponsorRight text columns
-- are intentionally left untouched — this table is additive.

CREATE TABLE IF NOT EXISTS InvitationSponsor (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  invitationId INT UNSIGNED NOT NULL,
  label        VARCHAR(100) NOT NULL DEFAULT '',
  labelRight   VARCHAR(100) NOT NULL DEFAULT '',
  nameLeft     TEXT         NOT NULL,
  nameRight    TEXT         NOT NULL,
  `order`      INT UNSIGNED NOT NULL DEFAULT 0,
  createdAt    TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt    TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_invitation_sponsor_invitation_id (invitationId),
  KEY idx_invitation_sponsor_invitation_order (invitationId, `order`),
  CONSTRAINT InvitationSponsor_ibfk_1
    FOREIGN KEY (invitationId) REFERENCES Invitation (id)
    ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
