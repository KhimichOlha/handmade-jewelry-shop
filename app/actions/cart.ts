"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function addToCart(productId: string) {
  let user = await prisma.user.findFirst();

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: "Тестовий користувач",
        email: "test@test.com",
        password: "123456",
        role: "USER",
      },
    });
  }

  let cart = await prisma.cart.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId: user.id,
      },
    });
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
    },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: existingItem.quantity + 1,
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  }

  redirect("/cart");
}
