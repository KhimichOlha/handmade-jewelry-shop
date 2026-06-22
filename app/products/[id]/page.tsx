import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { addToCart } from "@/app/actions/cart";
import { addReview } from "@/app/actions/review";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type ReviewType = {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  userId: string;
  productId: string;
  user: {
    id: string;
    name: string;
    email: string;
    [key: string]: any;
  };
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
    <main className="mx-auto max-w-6xl px-8 py-10">
      <Link
        href="/products"
        className="text-sm text-gray-600 hover:text-pink-600"
      >
        ← Назад до каталогу
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-[450px] w-full rounded-2xl bg-white object-cover shadow"
        />

        <div className="rounded-2xl bg-white p-8 shadow">
          <h1 className="text-4xl font-bold">{product.title}</h1>

          <p className="mt-4 text-gray-700">{product.description}</p>

          <div className="mt-6 space-y-2 text-gray-700">
            <p>
              <b>Матеріал:</b> {product.material}
            </p>

            <p>
              <b>Категорія:</b> {product.category.name}
            </p>

            <p>
              <b>Кількість на складі:</b> {product.stock}
            </p>
          </div>

          <p className="mt-6 text-4xl font-bold text-pink-600">
            {product.price} грн
          </p>

          <form
            action={async () => {
              "use server";
              await addToCart(product.id);
            }}
          >
            <button className="mt-6 w-full rounded-xl bg-pink-600 px-6 py-4 text-lg font-semibold text-white hover:bg-pink-700">
              Додати в кошик
            </button>
          </form>
        </div>
      </div>

      <section className="mt-12 rounded-2xl bg-white p-8 shadow">
        <h2 className="text-2xl font-bold">Відгуки</h2>

        <form action={addReview} className="mt-5 flex flex-col gap-3">
          <input type="hidden" name="productId" value={product.id} />

          <select name="rating" className="rounded-lg border p-3">
            <option value="5">5 ⭐</option>
            <option value="4">4 ⭐</option>
            <option value="3">3 ⭐</option>
            <option value="2">2 ⭐</option>
            <option value="1">1 ⭐</option>
          </select>

          <textarea
            name="comment"
            placeholder="Ваш відгук"
            className="rounded-lg border p-3"
            required
          />

          <button className="rounded-xl bg-black px-4 py-3 text-white">
            Додати відгук
          </button>
        </form>

        <div className="mt-6 space-y-4">
          {product.reviews.length === 0 ? (
            <p className="text-gray-600">Відгуків поки немає.</p>
          ) : (
            product.reviews.map((review: ReviewType) => (
              <div key={review.id} className="rounded-xl border p-4">
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
