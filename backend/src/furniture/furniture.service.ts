import { prisma } from "../prisma.service";

export const getAll = async () => {
  return prisma.furniture.findMany({ include: { reviews: true } });
};
export const getOne = async (id: number) => {
  return prisma.furniture.findUnique({
    where: { id },
    include: { reviews: true },
  });
};
export const createFurniture = async (data: any) => {
  return prisma.furniture.create({ data });
};
export const updateFurniture = async (id: number, data: any) => {
  return prisma.furniture.update({ where: { id }, data });
};
