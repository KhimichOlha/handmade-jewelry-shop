import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-8 py-10">
      <div className="rounded-2xl bg-pink-100 p-8">
        <h1 className="text-5xl font-bold text-gray-900">Каталог прикрас</h1>

        <p className="mt-3 text-lg text-gray-700">
          Оберіть унікальну прикрасу ручної роботи.
        </p>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </main>
  );
}
