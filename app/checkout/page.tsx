import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

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

async function createOrder(formData: FormData) {
  "use server";

  const phone = String(formData.get("phone"));
  const city = String(formData.get("city"));
  const address = String(formData.get("address"));
  const comment = String(formData.get("comment"));

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

  const totalPrice = cart.items.reduce(
    (sum: number, item: CartItemWithProduct) => {
      return sum + item.product.price * item.quantity;
    },
    0,
  );

  const fullAddress = `${city}, ${address}. Коментар: ${comment}`;

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalPrice,
      address: fullAddress,
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
    <main className="mx-auto max-w-xl px-8 py-10">
      <h1 className="text-4xl font-bold">Оформлення замовлення</h1>

      <form
        action={createOrder}
        className="mt-8 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow"
      >
        <input
          name="phone"
          placeholder="Номер телефону"
          className="rounded-lg border p-3"
          required
        />

        <input
          name="city"
          placeholder="Місто"
          className="rounded-lg border p-3"
          required
        />

        <input
          name="address"
          placeholder="Адреса доставки"
          className="rounded-lg border p-3"
          required
        />

        <textarea
          name="comment"
          placeholder="Коментар до замовлення"
          className="rounded-lg border p-3"
        />

        <button className="rounded-xl bg-pink-600 p-3 font-semibold text-white hover:bg-pink-700">
          Підтвердити замовлення
        </button>
      </form>
    </main>
  );
}
