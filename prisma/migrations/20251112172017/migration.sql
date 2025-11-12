-- CreateTable
CREATE TABLE "Status_Pemilihan" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "isOpened" BOOLEAN NOT NULL DEFAULT false,
    "authorization_key" TEXT NOT NULL,

    CONSTRAINT "Status_Pemilihan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Status_Pemilihan_id_key" ON "Status_Pemilihan"("id");
