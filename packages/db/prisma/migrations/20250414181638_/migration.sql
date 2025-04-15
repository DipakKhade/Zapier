/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Action_actionId_key";

-- DropIndex
DROP INDEX "Action_zapId_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
