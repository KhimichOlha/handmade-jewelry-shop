import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function updateProduct(productId: string, formData: FormData) {
  "use server";

  const title = String(formData.get("title"));
  const description = String(formData.get("description"));
  const price = Number(formData.get("price"));
  const material = String(formData.get("material"));
  const imageUrl = String(formData.get("imageUrl"));
  const stock = Number(formData.get("stock"));

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      title,
      description,
      price,
      material,
      imageUrl,
      stock,
    },
  });

  redirect("/admin/products");
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-xl px-8 py-10">
      <h1 className="text-4xl font-bold">Редагування товару</h1>

      <form
        action={async (formData) => {
          "use server";
          await updateProduct(product.id, formData);
        }}
        className="mt-8 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow"
      >
        <input
          name="title"
          defaultValue={product.title}
          className="rounded-lg border p-3"
          required
        />

        <textarea
          name="description"
          defaultValue={product.description}
          className="rounded-lg border p-3"
          required
        />

        <input
          name="price"
          type="number"
          defaultValue={product.price}
          className="rounded-lg border p-3"
          required
        />

        <input
          name="material"
          defaultValue={product.material}
          className="rounded-lg border p-3"
          required
        />

        <input
          name="imageUrl"
          defaultValue={product.imageUrl}
          className="rounded-lg border p-3"
          required
        />

        <input
          name="stock"
          type="number"
          defaultValue={product.stock}
          className="rounded-lg border p-3"
          required
        />

        <button className="rounded-xl bg-pink-600 p-3 font-semibold text-white">
          Зберегти зміни
        </button>
      </form>
    </main>
  );
}
