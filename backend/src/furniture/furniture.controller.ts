import { Router } from "express";
import {
  getAll,
  getOne,
  createFurniture,
  updateFurniture,
} from "./furniture.service";

const router = Router();
router.get("/", async (req, res) => {
  const q = await getAll();
  res.json(q);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const f = await getOne(id);
  if (!f) return res.status(404).json({ error: "Not found" });
  res.json(f);
});

router.post("/", async (req, res) => {
  const payload = req.body;
  const f = await createFurniture(payload);
  res.json(f);
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const updated = await updateFurniture(id, req.body);
  res.json(updated);
});

export default router;
