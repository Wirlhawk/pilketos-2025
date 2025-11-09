/*
  Warnings:

  - The values [EXIT_BILIK] on the enum `ActivityType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ActivityType_new" AS ENUM ('ADD_QUEUE', 'REMOVE_QUEUE', 'ENTER_BILIK', 'REMOVE_BILIK', 'COMPLETE_VOTE', 'SYSTEM');
ALTER TABLE "ActivityLog" ALTER COLUMN "type" TYPE "ActivityType_new" USING ("type"::text::"ActivityType_new");
ALTER TYPE "ActivityType" RENAME TO "ActivityType_old";
ALTER TYPE "ActivityType_new" RENAME TO "ActivityType";
DROP TYPE "public"."ActivityType_old";
COMMIT;
