import { prisma } from "~/db.server";

export async function getMarkers() {
  return prisma.mapMarker.findMany();
}
