"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(formData: FormData) {
  const orderId = String(formData.get("orderId"));
  const status = String(formData.get("status"));

  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });

  revalidatePath("/admin/orders");
  revalidatePath("/profile");
}
