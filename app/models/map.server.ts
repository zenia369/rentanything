import { MapMarker } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getMarkersByQuery(query: string) {
  return prisma.mapMarker.findMany({
    where: {
      region: {
        contains: query,
      },
    },
  });
}

export async function getMarkerInfoById(markerId: MapMarker["id"]) {
  return prisma.mapMarker.findUnique({
    where: {
      id: markerId,
    },
    include: {
      images: true,
    },
  });
}

export async function createMarker(
  marker: Omit<MapMarker, "id" | "createdAt" | "updatedAt" | "preview">
) {
  return prisma.mapMarker.create({
    data: marker,
  });
}
