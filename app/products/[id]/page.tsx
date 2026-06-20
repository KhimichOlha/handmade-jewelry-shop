import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-8 py-10">
      <Link href="/products" className="text-sm text-gray-600">
        ← Назад до каталогу
      </Link>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-96 w-full rounded-xl bg-gray-100 object-cover"
        />

        <div>
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <p className="mt-4 text-gray-700">{product.description}</p>

          <p className="mt-4">
            <b>Матеріал:</b> {product.material}
          </p>

          <p className="mt-2">
            <b>Категорія:</b> {product.category.name}
          </p>

          <p className="mt-2">
            <b>Кількість:</b> {product.stock}
          </p>

          <p className="mt-6 text-3xl font-bold">{product.price} грн</p>

          <button className="mt-6 rounded-lg bg-black px-6 py-3 text-white">
            Додати в кошик
          </button>
        </div>
      </div>
    </main>
  );
}
