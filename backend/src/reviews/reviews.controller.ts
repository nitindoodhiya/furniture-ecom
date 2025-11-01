import { Router } from 'express'
import { createReview } from './reviews.service'
const router = Router()


router.post('/', async (req, res) => {
const payload = req.body // { furnitureId, rating, comment }
const r = await createReview(payload)
res.json(r)
})


export default router