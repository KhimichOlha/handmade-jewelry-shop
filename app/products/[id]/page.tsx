import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { addReview } from "@/app/actions/review";
import { addToCart } from "@/app/actions/cart";

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
      reviews: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
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

          <form
            action={async () => {
              "use server";
              await addToCart(product.id);
            }}
          >
            <button className="mt-6 rounded-lg bg-black px-6 py-3 text-white">
              Додати в кошик
            </button>
          </form>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Відгуки</h2>

        <form action={addReview} className="mt-4 flex flex-col gap-3">
          <input type="hidden" name="productId" value={product.id} />

          <select name="rating" className="border p-2">
            <option value="5">5 ⭐</option>
            <option value="4">4 ⭐</option>
            <option value="3">3 ⭐</option>
            <option value="2">2 ⭐</option>
            <option value="1">1 ⭐</option>
          </select>

          <textarea
            name="comment"
            placeholder="Ваш відгук"
            className="border p-3"
            required
          />

          <button className="rounded bg-black px-4 py-2 text-white">
            Додати відгук
          </button>
        </form>

        <div className="mt-6 space-y-4">
          {product.reviews.length === 0 ? (
            <p className="text-gray-600">Відгуків поки немає.</p>
          ) : (
            product.reviews.map((review) => (
              <div key={review.id} className="rounded border p-3">
                <p>
                  <b>{review.user.name}</b>
                </p>
                <p>Оцінка: {review.rating} ⭐</p>
                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
