import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen px-8 py-10">
      <h1 className="text-4xl font-bold">Каталог прикрас</h1>
      <p className="mt-3 text-gray-600">
        Оберіть унікальну прикрасу ручної роботи.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
