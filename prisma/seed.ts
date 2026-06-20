import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const category = await prisma.category.create({
    data: {
      name: "Браслети",
      description: "Прикраси ручної роботи для щоденного образу",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        title: "Браслет з натурального каменю",
        description: "Ніжний браслет ручної роботи з натуральних намистин.",
        price: 350,
        material: "Натуральний камінь",
        imageUrl: "/bracelet.jpg",
        stock: 5,
        categoryId: category.id,
      },
      {
        title: "Сережки з бісеру",
        description: "Легкі сережки ручної роботи у сучасному стилі.",
        price: 280,
        material: "Бісер",
        imageUrl: "/earrings.jpg",
        stock: 7,
        categoryId: category.id,
      },
    ],
  });
}

main()
  .then(() => console.log("Дані додано"))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
