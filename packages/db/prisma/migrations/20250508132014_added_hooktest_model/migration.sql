-- CreateTable
CREATE TABLE "HookTest" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "HookTest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HookTest_uuid_key" ON "HookTest"("uuid");

-- AddForeignKey
ALTER TABLE "HookTest" ADD CONSTRAINT "HookTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
