import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const markers = [
    {
      country: "Ukraine",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus illo vitae repellendus explicabo assumenda? Pariatur, rem? Ut facere optio, id quo ea, soluta perferendis iusto distinctio at explicabo debitis rerum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus illo vitae repellendus explicabo assumenda? Pariatur, rem? Ut facere optio, id quo ea, soluta perferendis iusto distinctio at explicabo debitis rerum.",
      minimalPriceUAH: 1000,
      region: "Lviv Oblast",
      name: "Orci varius natoque penatibus et magnis",
      preview: "/photo 1.jpg",
    },
    {
      country: "Ukraine",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus illo vitae repellendus explicabo assumenda? Pariatur, rem? Ut facere optio, id quo ea, soluta perferendis iusto distinctio at explicabo debitis rerum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus illo vitae repellendus explicabo assumenda? Pariatur, rem? Ut facere optio, id quo ea, soluta perferendis iusto distinctio at explicabo debitis rerum.",
      minimalPriceUAH: 1000,
      region: "Lviv Oblast",
      name: "Nunc sed orci sit amet ligula placerat",
      city: "test city name 2",
      latLngTuple: [49.350182287807215, 23.38330079801381],
      preview: "/photo 2.jpg",
    },
    {
      country: "Ukraine",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus illo vitae repellendus explicabo assumenda? Pariatur, rem? Ut facere optio, id quo ea, soluta perferendis iusto distinctio at explicabo debitis rerum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus illo vitae repellendus explicabo assumenda? Pariatur, rem? Ut facere optio, id quo ea, soluta perferendis iusto distinctio at explicabo debitis rerum.",
      minimalPriceUAH: 1000,
      region: "Odessa Oblast",
      name: "Sed vehicula in nunc eget varius",
      preview: "/photo 3.jpg",
    },
    {
      country: "Ukraine",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus illo vitae repellendus explicabo assumenda? Pariatur, rem? Ut facere optio, id quo ea, soluta perferendis iusto distinctio at explicabo debitis rerum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus illo vitae repellendus explicabo assumenda? Pariatur, rem? Ut facere optio, id quo ea, soluta perferendis iusto distinctio at explicabo debitis rerum.",
      minimalPriceUAH: 1000,
      region: "Odessa Oblast",
      name: "Curabitur sodales, dolor ut consequat pellentesque",
      city: "test city name 4",
      latLngTuple: [47.16963533760965, 30.30468751676381],
      preview: "/photo 4.jpg",
    },
    {
      country: "Ukraine",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus illo vitae repellendus explicabo assumenda? Pariatur, rem? Ut facere optio, id quo ea, soluta perferendis iusto distinctio at explicabo debitis rerum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus illo vitae repellendus explicabo assumenda? Pariatur, rem? Ut facere optio, id quo ea, soluta perferendis iusto distinctio at explicabo debitis rerum.",
      minimalPriceUAH: 1000,
      region: "Vinnytsia Oblast",
      name: "Suspendisse purus neque, rutrum at semper eget",
      preview: "/photo 5.jpg",
    },
    {
      country: "Ukraine",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus illo vitae repellendus explicabo assumenda? Pariatur, rem? Ut facere optio, id quo ea, soluta perferendis iusto distinctio at explicabo debitis rerum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus illo vitae repellendus explicabo assumenda? Pariatur, rem? Ut facere optio, id quo ea, soluta perferendis iusto distinctio at explicabo debitis rerum.",
      minimalPriceUAH: 1000,
      region: "Vinnytsia Oblast",
      name: "Vivamus enim magna, tincidunt sed laoreet efficitur",
      city: "test city name 6",
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
