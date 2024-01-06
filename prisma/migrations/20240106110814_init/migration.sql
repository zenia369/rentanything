-- CreateTable
CREATE TABLE "MapMarker" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "region" TEXT,
    "minimalPriceUAH" INTEGER NOT NULL,

    CONSTRAINT "MapMarker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altDescription" TEXT,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "mapMarkerId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_mapMarkerId_fkey" FOREIGN KEY ("mapMarkerId") REFERENCES "MapMarker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
