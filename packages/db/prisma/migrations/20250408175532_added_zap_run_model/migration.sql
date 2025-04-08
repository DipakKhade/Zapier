/*
  Warnings:

  - Added the required column `userId` to the `Zap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Zap" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ZapRuns" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,

    CONSTRAINT "ZapRuns_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Zap" ADD CONSTRAINT "Zap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapRuns" ADD CONSTRAINT "ZapRuns_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
