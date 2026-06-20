import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });

  return (
    <main className="min-h-screen px-8 py-10">
      {/* Головний банер */}
      <section className="mb-12 rounded-2xl bg-pink-100 p-10">
        <h1 className="text-5xl font-bold">Прикраси ручної роботи</h1>

        <p className="mt-4 text-lg text-gray-700">
          Унікальні авторські прикраси, створені вручну з любов’ю та увагою до
          деталей.
        </p>

        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
        >
          Перейти до каталогу
        </Link>
      </section>

      {/* Переваги */}
      <section className="mb-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6 text-center">
          <h3 className="text-xl font-bold">100% Handmade</h3>
          <p className="mt-2 text-gray-600">
            Кожна прикраса виготовляється вручну.
          </p>
        </div>

        <div className="rounded-xl border p-6 text-center">
          <h3 className="text-xl font-bold">Якісні матеріали</h3>
          <p className="mt-2 text-gray-600">
            Використовуються натуральні камені та якісна фурнітура.
          </p>
        </div>

        <div className="rounded-xl border p-6 text-center">
          <h3 className="text-xl font-bold">Швидка доставка</h3>
          <p className="mt-2 text-gray-600">Доставка по всій Україні.</p>
        </div>
      </section>

      {/* Новинки */}
      <section>
        <h2 className="mb-6 text-3xl font-bold">Нові надходження</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </section>
    </main>
  );
}
