/*
  Warnings:

  - You are about to drop the column `uuid` on the `HookTest` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "HookTest_uuid_key";

-- AlterTable
ALTER TABLE "HookTest" DROP COLUMN "uuid";
