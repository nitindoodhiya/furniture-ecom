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

app.use(
    cors({
      origin: ["http://localhost:3000"], // frontend URL
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );

app.options("*", cors());
app.use('/furniture', furnitureRouter)
app.use('/orders', ordersRouter)
app.use('/reviews', reviewsRouter)
app.use('/users', usersRouter)

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Backend running on ${port}`))