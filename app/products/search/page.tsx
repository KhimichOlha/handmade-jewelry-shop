import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

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

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;

  const products: ProductType[] = await prisma.product.findMany({
    where: q
      ? {
          title: {
            contains: q,
            mode: "insensitive",
          },
        }
      : {},
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="px-8 py-10">
      <h1 className="text-3xl font-bold">Пошук товарів</h1>

      <form action="/products/search" className="mt-6 flex gap-3">
        <input
          name="q"
          defaultValue={q || ""}
          placeholder="Введіть назву прикраси"
          className="w-full border p-3"
        />

        <button className="rounded bg-black px-6 py-3 text-white">Пошук</button>
      </form>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product: ProductType) => (
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
