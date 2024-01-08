/*
  Warnings:

  - Made the column `region` on table `MapMarker` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MapMarker" ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "region" SET NOT NULL;
