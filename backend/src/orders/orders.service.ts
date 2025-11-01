import { prisma } from "../prisma.service";

export const createOrder = async ({
  userId,
  items,
}: {
  userId: number;
  items: { furnitureId: number; quantity: number }[];
}) => {
  // calculate total
  const furnitures = await prisma.furniture.findMany({
    where: { id: { in: items.map((i) => i.furnitureId) } },
  });

  const total = furnitures.reduce(
    (sum: number, f: { id: number; price: number }) => {
      const qty = items.find((i) => i.furnitureId === f.id)?.quantity ?? 0;
      return sum + f.price * qty;
    },
    0
  );

  // create the order
  return prisma.order.create({
    data: {
      userId,
      total,
      orderItems: {
        create: items.map((i) => ({
          furnitureId: i.furnitureId,
          quantity: i.quantity,
        })),
      },
    },
    include: {
      orderItems: {
        include: {
          furniture: true,
        },
      },
    },
  });
};

export const getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      orderItems: {
        include: {
          furniture: true,
        },
      },
    },
  });
};

export async function getOrderById(id: number) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: {
        include: { furniture: true },
      },
    },
  });
}
