import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { prisma } from './prisma.service'
import furnitureRouter from './furniture/furniture.controller'
import ordersRouter from './orders/orders.controller'
import reviewsRouter from './reviews/reviews.controller'
import usersRouter from './users/users.controller'

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/furniture', furnitureRouter)
app.use('/orders', ordersRouter)
app.use('/reviews', reviewsRouter)
app.use('/users', usersRouter)

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Backend running on ${port}`))