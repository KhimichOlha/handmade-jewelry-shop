import { prisma } from "@/lib/prisma";

async function createProduct(formData: FormData) {
  "use server";

  const title = String(formData.get("title"));
  const description = String(formData.get("description"));
  const price = Number(formData.get("price"));
  const material = String(formData.get("material"));
  const imageUrl = String(formData.get("imageUrl"));
  const stock = Number(formData.get("stock"));

  let category = await prisma.category.findFirst({
    where: { name: "Браслети" },
  });

  if (!category) {
    category = await prisma.category.create({
      data: {
        name: "Браслети",
        description: "Прикраси ручної роботи",
      },
    });
  }

  await prisma.product.create({
    data: {
      title,
      description,
      price,
      material,
      imageUrl,
      stock,
      categoryId: category.id,
    },
  });
}

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-2xl px-8 py-10">
      <h1 className="text-3xl font-bold">Додати прикрасу</h1>

      <form action={createProduct} className="mt-8 flex flex-col gap-4">
        <input name="title" placeholder="Назва" className="border p-3" />
        <textarea
          name="description"
          placeholder="Опис"
          className="border p-3"
        />
        <input
          name="price"
          placeholder="Ціна"
          type="number"
          className="border p-3"
        />
        <input name="material" placeholder="Матеріал" className="border p-3" />
        <input name="imageUrl" placeholder="URL фото" className="border p-3" />
        <input
          name="stock"
          placeholder="Кількість"
          type="number"
          className="border p-3"
        />

        <button className="rounded bg-black p-3 text-white">
          Додати товар
        </button>
      </form>
    </main>
  );
}
