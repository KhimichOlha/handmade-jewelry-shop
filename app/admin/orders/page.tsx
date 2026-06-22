import { prisma } from "@/lib/prisma";
import { updateOrderStatus } from "@/app/actions/order";
export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
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
      <h1 className="text-3xl font-bold">Управління замовленнями</h1>

      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg border p-4">
            <p>
              <b>Замовлення:</b> {order.id}
            </p>

            <p>
              <b>Клієнт:</b> {order.user.name}
            </p>

            <p>
              <b>Email:</b> {order.user.email}
            </p>

            <p>
              <b>Телефон:</b> {order.phone}
            </p>

            <p>
              <b>Адреса:</b> {order.address}
            </p>

            <p>
              <b>Статус:</b> {order.status}
            </p>

            <p>
              <b>Сума:</b> {order.totalPrice} грн
            </p>

            <form action={updateOrderStatus} className="mt-4 flex gap-3">
              <input type="hidden" name="orderId" value={order.id} />

              <select
                name="status"
                defaultValue={order.status}
                className="border p-2"
              >
                <option value="Нове">Нове</option>
                <option value="В обробці">В обробці</option>
                <option value="Відправлено">Відправлено</option>
                <option value="Виконано">Виконано</option>
                <option value="Скасовано">Скасовано</option>
              </select>

              <button
                type="submit"
                className="rounded bg-black px-4 py-2 text-white"
              >
                Оновити статус
              </button>
            </form>

            <div className="mt-3">
              <b>Товари:</b>

              <ul className="list-disc pl-5">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.product.title}
                    {" - "}
                    {item.quantity} шт.
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
