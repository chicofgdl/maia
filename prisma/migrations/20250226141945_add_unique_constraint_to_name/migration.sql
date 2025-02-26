/*
  Warnings:

  - The primary key for the `Dataset` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Dataset` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name]` on the table `Dataset` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Dataset" DROP CONSTRAINT "Dataset_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "fileUrl" DROP NOT NULL,
ADD CONSTRAINT "Dataset_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Dataset_name_key" ON "Dataset"("name");
