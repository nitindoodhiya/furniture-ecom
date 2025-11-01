import { Router } from 'express'
import { createReview, getOne } from './reviews.service'
const router = Router()

router.post('/', async (req, res) => {
    const payload = req.body // { furnitureId, rating, comment }
    const r = await createReview(payload)
    res.json(r)
})

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const f = await getOne(id);
    if (!f) return res.status(404).json({ error: "Not found" });
    res.json(f);
  });
  

export default router