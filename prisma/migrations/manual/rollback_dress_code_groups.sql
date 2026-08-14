-- Rollback for add_dress_code_groups.sql.
-- Removes the group link + table. Original dress-code data (Invitation text
-- columns, cover photos, InvitationDressColor.type) is untouched by the forward
-- migration, so dropping these fully reverts the change.

ALTER TABLE `InvitationDressColor` DROP FOREIGN KEY `InvitationDressColor_ibfk_2`;
ALTER TABLE `InvitationDressColor` DROP INDEX `InvitationDressColor_groupId`;
ALTER TABLE `InvitationDressColor` DROP COLUMN `groupId`;
DROP TABLE IF EXISTS `InvitationDressCodeGroup`;
