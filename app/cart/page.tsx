import { prisma } from "@/lib/prisma";

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

  <a
    href="/checkout"
    className="mt-6 inline-block rounded bg-black px-6 py-3 text-white"
  >
    Оформити замовлення
  </a>;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Кошик</h1>

      {!cart || cart.items.length === 0 ? (
        <p className="mt-4">Кошик порожній.</p>
      ) : (
        <div className="mt-6">
          <a href="/checkout" className="rounded bg-black px-6 py-3 text-white">
            Оформити замовлення
          </a>
        </div>
      )}
    </main>
  );
}
