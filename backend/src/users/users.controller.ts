import express from "express";
import { createUser } from "./users.service";

const router = express.Router();

router.post("/", async (req, res) => {
  const r = await createUser(req, res);
  res.json(r);
});

export default router;
