"use server";

import { prisma } from "@/lib/prisma";

export async function addToCart(productId: string) {
  const user = await prisma.user.findFirst();

  if (!user) {
    throw new Error("Користувача не знайдено");
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
}
