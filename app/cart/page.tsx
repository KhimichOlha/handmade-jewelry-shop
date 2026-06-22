import { prisma } from "@/lib/prisma";
import Link from "next/link";

type CartItemWithProduct = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    title: string;
    price: number;
    [key: string]: any;
  };
};

export default async function CartPage() {
  const user = await prisma.user.findFirst();

  if (!user) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold">Кошик</h1>
        <p className="mt-4">Користувач не знайдений.</p>
      </main>
    );
  }

  const cart = await prisma.cart.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  const total =
    cart?.items.reduce(
      (sum: number, item: CartItemWithProduct) =>
        sum + item.product.price * item.quantity,
      0,
    ) || 0;

  return (
    <main className="mx-auto max-w-5xl px-8 py-10">
      <h1 className="text-4xl font-bold">Кошик</h1>

      {!cart || cart.items.length === 0 ? (
        <p className="mt-6">Кошик порожній.</p>
      ) : (
        <>
          <div className="mt-8 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm"
              >
                <div>
                  <h3 className="text-xl font-bold">{item.product.title}</h3>
                  <p className="mt-1 text-gray-600">
                    Кількість: {item.quantity}
                  </p>
                  <p className="text-gray-600">
                    Ціна: {item.product.price} грн
                  </p>
                </div>

                <p className="text-2xl font-bold text-pink-600">
                  {item.product.price * item.quantity} грн
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-white p-6 shadow">
            <p className="text-2xl font-bold">
              Разом: <span className="text-pink-600">{total} грн</span>
            </p>

            <Link
              href="/checkout"
              className="mt-5 inline-block rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700"
            >
              Оформити замовлення
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
