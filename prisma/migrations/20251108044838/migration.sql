-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('ADD_QUEUE', 'ENTER_BILIK', 'EXIT_BILIK', 'COMPLETE_VOTE', 'SYSTEM');

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" SERIAL NOT NULL,
    "type" "ActivityType" NOT NULL,
    "message" TEXT NOT NULL,
    "dptId" BIGINT,
    "bilikId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_dptId_fkey" FOREIGN KEY ("dptId") REFERENCES "Dpt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_bilikId_fkey" FOREIGN KEY ("bilikId") REFERENCES "Bilik"("id") ON DELETE SET NULL ON UPDATE CASCADE;
