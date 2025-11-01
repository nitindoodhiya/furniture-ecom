import { Router } from "express";
import { createOrder, getAllOrders, getOrderById } from "./orders.service";
const router = Router();

router.post("/", async (req, res) => {
  const payload = req.body;
  const order = await createOrder(payload);
  res.json(order);
});

router.get('/',async (req, res) => {
  const result = await getAllOrders();
  res.json(result)
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const order = await getOrderById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
