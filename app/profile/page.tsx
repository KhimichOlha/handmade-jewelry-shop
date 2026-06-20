import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const user = await prisma.user.findFirst();

  if (!user) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold">Профіль</h1>
        <p className="mt-4">Користувач не знайдений.</p>
      </main>
    );
  }

  const orders = await prisma.order.findMany({
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Профіль користувача</h1>

      <p className="mt-4">
        <b>Ім’я:</b> {user.name}
      </p>

      <p>
        <b>Email:</b> {user.email}
      </p>

      <h2 className="mt-8 text-2xl font-bold">Мої замовлення</h2>

      {orders.length === 0 ? (
        <p className="mt-4">Замовлень поки немає.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border p-4">
              <p>
                <b>Номер замовлення:</b> {order.id}
              </p>
              <p>
                <b>Сума:</b> {order.totalPrice} грн
              </p>
              <p>
                <b>Статус:</b> {order.status}
              </p>
              <p>
                <b>Телефон:</b> {order.phone}
              </p>
              <p>
                <b>Адреса:</b> {order.address}
              </p>

              <div className="mt-3">
                <b>Товари:</b>
                <ul className="mt-2 list-disc pl-6">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.product.title} — {item.quantity} шт. × {item.price}{" "}
                      грн
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
