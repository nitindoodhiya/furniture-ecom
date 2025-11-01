import { prisma } from "../prisma.service";

export const createReview = async (payload: any) => {
  const { furnitureId, rating, comment } = payload;
  const r = await prisma.review.create({
    data: { furnitureId, rating, comment },
  });
  return r;
};
