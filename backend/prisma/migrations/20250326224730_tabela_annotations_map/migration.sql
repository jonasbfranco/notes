/*
  Warnings:

  - You are about to drop the `Annotations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Annotations";

-- CreateTable
CREATE TABLE "annotations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "priority" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "annotations_pkey" PRIMARY KEY ("id")
);
