-- CreateEnum
CREATE TYPE "DptStatus" AS ENUM ('BELUM_MEMILIH', 'DALAM_ANTRIAN', 'DALAM_BILIK', 'SUDAH_MEMILIH');

-- CreateTable
CREATE TABLE "Dpt" (
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "DptStatus" NOT NULL DEFAULT 'BELUM_MEMILIH',
    "kelasId" INTEGER NOT NULL,

    CONSTRAINT "Dpt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kelas" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Kelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paslon" (
    "id" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "ketos" TEXT NOT NULL,
    "waketos" TEXT NOT NULL,

    CONSTRAINT "Paslon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bilik" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "currentDptId" BIGINT,

    CONSTRAINT "Bilik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perolehan" (
    "id" INTEGER NOT NULL,
    "dptId" BIGINT NOT NULL,
    "bilikId" INTEGER NOT NULL,
    "paslonId" INTEGER NOT NULL,

    CONSTRAINT "Perolehan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bilik_currentDptId_key" ON "Bilik"("currentDptId");

-- CreateIndex
CREATE UNIQUE INDEX "Perolehan_dptId_key" ON "Perolehan"("dptId");

-- AddForeignKey
ALTER TABLE "Dpt" ADD CONSTRAINT "Dpt_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bilik" ADD CONSTRAINT "Bilik_currentDptId_fkey" FOREIGN KEY ("currentDptId") REFERENCES "Dpt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perolehan" ADD CONSTRAINT "Perolehan_dptId_fkey" FOREIGN KEY ("dptId") REFERENCES "Dpt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perolehan" ADD CONSTRAINT "Perolehan_bilikId_fkey" FOREIGN KEY ("bilikId") REFERENCES "Bilik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perolehan" ADD CONSTRAINT "Perolehan_paslonId_fkey" FOREIGN KEY ("paslonId") REFERENCES "Paslon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
