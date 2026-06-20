import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function createOrder(formData: FormData) {
  "use server";

  const address = String(formData.get("address"));
  const phone = String(formData.get("phone"));

  const user = await prisma.user.findFirst();

  if (!user) {
    throw new Error("Користувача не знайдено");
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

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  const totalPrice = cart.items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalPrice,
      address,
      phone,
      status: "Нове",
    },
  });

  for (const item of cart.items) {
    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
      },
    });
  }

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });

  redirect("/profile");
}

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-md px-8 py-10">
      <h1 className="text-3xl font-bold">Оформлення замовлення</h1>

      <form action={createOrder} className="mt-8 flex flex-col gap-4">
        <input
          name="phone"
          placeholder="Номер телефону"
          className="border p-3"
          required
        />

        <input
          name="address"
          placeholder="Адреса доставки"
          className="border p-3"
          required
        />

        <button className="rounded bg-black p-3 text-white">
          Підтвердити замовлення
        </button>
      </form>
    </main>
  );
}
