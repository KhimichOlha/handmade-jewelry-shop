import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import { v4 as uuid } from "uuid";
import path from "path";

type ProductType = {
  id: string;
  title: string;
  description: string;
  price: number;
  material: string;
  imageUrl: string;
  stock: number;
  createdAt: Date;
  categoryId: number;
};

async function saveImage(formData: FormData) {
  "use server";

  const image = formData.get("image") as File;

  if (!image || image.size === 0) {
    throw new Error("Фото товару не вибрано");
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileExtension = image.name.split(".").pop();
  const fileName = `${uuid()}.${fileExtension}`;

  const uploadPath = path.join(process.cwd(), "public", "uploads", fileName);

  await writeFile(uploadPath, buffer);

  return `/uploads/${fileName}`;
}

async function createProduct(formData: FormData) {
  "use server";

  const title = String(formData.get("title"));
  const description = String(formData.get("description"));
  const price = Number(formData.get("price"));
  const material = String(formData.get("material"));
  const stock = Number(formData.get("stock"));

  const imageUrl = await saveImage(formData);

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

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");
}

async function deleteProduct(formData: FormData) {
  "use server";

  const productId = String(formData.get("productId"));

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");
}

export default async function AdminProductsPage() {
  const products: ProductType[] = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-6xl px-8 py-10">
      <h1 className="text-4xl font-bold">Керування товарами</h1>

      <form
        action={createProduct}
        className="mt-8 grid gap-4 rounded-2xl border bg-white p-6 shadow"
      >
        <input
          name="title"
          placeholder="Назва товару"
          className="rounded-lg border p-3"
          required
        />

        <textarea
          name="description"
          placeholder="Опис товару"
          className="rounded-lg border p-3"
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Ціна"
          className="rounded-lg border p-3"
          required
        />

        <input
          name="material"
          placeholder="Матеріал"
          className="rounded-lg border p-3"
          required
        />

        <input
          name="image"
          type="file"
          accept="image/*"
          className="rounded-lg border p-3"
          required
        />

        <input
          name="stock"
          type="number"
          placeholder="Кількість"
          className="rounded-lg border p-3"
          required
        />

        <button className="rounded-xl bg-pink-600 p-3 font-semibold text-white hover:bg-pink-700">
          Додати товар
        </button>
      </form>

      <h2 className="mt-10 text-3xl font-bold">Список товарів</h2>

      <div className="mt-5 space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="h-20 w-20 rounded-xl object-cover"
              />

              <div>
                <p className="text-xl font-bold">{product.title}</p>
                <p>{product.price} грн</p>
                <p className="text-sm text-gray-600">
                  Кількість: {product.stock}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="rounded-lg bg-black px-4 py-2 text-white"
              >
                Редагувати
              </Link>

              <form action={deleteProduct}>
                <input type="hidden" name="productId" value={product.id} />
                <button className="rounded-lg bg-red-600 px-4 py-2 text-white">
                  Видалити
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
