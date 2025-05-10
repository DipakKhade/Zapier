/*
  Warnings:

  - You are about to drop the column `meatadata` on the `HookTest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HookTest" DROP COLUMN "meatadata",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "metadata" JSONB DEFAULT '{}';
