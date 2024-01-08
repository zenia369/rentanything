import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const markers = [
    {
      country: "Ukraine",
      description: "test 1",
      minimalPriceUAH: 1000,
      region: "Lviv Oblast",
      name: "Test 1",
    },
    {
      country: "Ukraine",
      description: "test 2",
      minimalPriceUAH: 1000,
      region: "Lviv Oblast",
      name: "Test 2",
      city: "test city 2",
      latLngTuple: [49.350182287807215, 23.38330079801381],
    },
    {
      country: "Ukraine",
      description: "test 1",
      minimalPriceUAH: 1000,
      region: "Odessa Oblast",
      name: "Test 3",
    },
    {
      country: "Ukraine",
      description: "test 2",
      minimalPriceUAH: 1000,
      region: "Odessa Oblast",
      name: "Test 4",
      city: "test city 4",
      latLngTuple: [47.16963533760965, 30.30468751676381],
    },
    {
      country: "Ukraine",
      description: "test 1",
      minimalPriceUAH: 1000,
      region: "Vinnytsia Oblast",
      name: "Test 5",
    },
    {
      country: "Ukraine",
      description: "test 2",
      minimalPriceUAH: 1000,
      region: "Vinnytsia Oblast",
      name: "Test 6",
      city: "test city 6",
      latLngTuple: [48.657876846569025, 28.96435548551381],
    },
  ];

  await prisma.mapMarker.deleteMany();
  await prisma.mapMarker.createMany({
    data: markers,
  });
}

seed()
  .then(() => {
    console.log(`Database has been seeded. 🌱`);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
