/*
  Warnings:

  - You are about to drop the column `isMain` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "isMain";

-- AlterTable
ALTER TABLE "MapMarker" ADD COLUMN     "preview" TEXT DEFAULT '/default.png';
