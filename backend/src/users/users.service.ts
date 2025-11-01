import { Request, Response } from "express";
import { prisma } from "../prisma.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await prisma.user.create({
      data: { email, name },
    });

    res.status(201).json(user);
  } catch (err: any) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Email already exists" });
    }
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
