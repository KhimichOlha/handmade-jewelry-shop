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

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Кошик</h1>

      {!cart || cart.items.length === 0 ? (
        <p className="mt-4">Кошик порожній.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="rounded-lg border p-4">
              <h3 className="text-xl font-semibold">{item.product.title}</h3>

              <p>Кількість: {item.quantity}</p>

              <p>Ціна: {item.product.price} грн</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
