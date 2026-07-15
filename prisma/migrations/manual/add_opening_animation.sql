-- Opening animation settings (editor accordion: on/off + 3 custom text lines)
ALTER TABLE `Invitation`
  ADD COLUMN `openingEnabled` TINYINT(1) NOT NULL DEFAULT 0,
  ADD COLUMN `openingText1` VARCHAR(100) NULL,
  ADD COLUMN `openingText2` VARCHAR(100) NULL,
  ADD COLUMN `openingText3` VARCHAR(100) NULL;
