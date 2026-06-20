"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addReview(formData: FormData) {
  const productId = String(formData.get("productId"));
  const rating = Number(formData.get("rating"));
  const comment = String(formData.get("comment"));

  const user = await prisma.user.findFirst();

  if (!user) {
    throw new Error("Користувача не знайдено");
  }

  await prisma.review.create({
    data: {
      rating,
      comment,
      userId: user.id,
      productId,
    },
  });

  revalidatePath(`/products/${productId}`);
}
