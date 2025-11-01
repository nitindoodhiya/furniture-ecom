# Prerequisite
- Docker

# Steps to start
`docker compose up`

# FrontEnd
- `available at localhost:3000/`

# Backend
- `available at localhost:4000/`

# API Testing
- Install Postman
- Import `Infurno.postman_collection.json`

Sample API requests and responses are already in the collection

---

## 🚀 **Running the Backend**

```bash
# Clone & start (assuming Docker Compose)
docker-compose up --build

# Or locally
npm install
npm run dev
```

Server runs on: `http://localhost:4000`

---

## 📡 **API Endpoints**

### `GET /furniture`
Get all furniture (with reviews)

```json
[
  {
    "id": 1,
    "name": "Oak Dining Table1",
    "price": 4991.99,
    "imageUrl": "https://placebear.com/g/200/200",
    "reviews": [ ... ]
  }
]
```

> **Warning:** No pagination. Will choke on >100 items.

---

### `GET /furniture/:id`
Get single furniture item

```bash
GET /furniture/1
```

Returns full object + reviews.

---

### `POST /furniture`
Add new furniture

```json
{
  "name": "Modern Sofa",
  "description": "Comfy af",
  "price": 899.99,
  "imageUrl": "https://example.com/sofa.jpg",
  "dimensions": "200x90x85 cm"
}
```

Returns created item with `id`.

> **No validation** — send `price: "banana"` and watch it explode.

---

### `POST /orders`
Place an order

```json
{
  "userId": 1,
  "items": [
    { "furnitureId": 1, "quantity": 2 }
  ]
}
```

Returns order with `total` auto-calculated.

> **Total = Σ(price × quantity)** — no tax, no discount, no shipping.

---

### `GET /orders`
Get all orders (with full furniture details)

> **Warning:** Returns *everything*. No filtering by user. Security nightmare.

---

### `GET /orders/:id`
Get single order

---

### `POST /reviews`
Add a review

```json
{
  "userId": 1,
  "furnitureId": 1,
  "rating": 5,
  "comment": "10/10 would sit again"
}
```

> **No auth** → Anyone can review as anyone.

---

### `GET /reviews/:furnitureId`
Get all reviews for a furniture item

---

### `POST /users`
Create a user

```json
{
  "email": "john@example.com",
  "name": "John Doe"
}
```

Returns `{ id, email, name }`

> **No password, no login, no email verification.** Useless for real users.

---

## 🧪 **Testing with Postman**

Import this collection:  
`Infurno API Collection`

All requests pre-configured for `http://localhost:4000`

---

## 🚧 **Missing (Critical) Features**

| Feature | Why It Matters |
|-------|--------------|
| **Authentication** | Right now, `userId: 1` is hardcoded. Anyone can be anyone. |
| **Input Validation** | Use `Joi` or `Zod`. Stop accepting strings as prices. |
| **Pagination** | `GET /furniture?limit=20&offset=0` |
| **Search & Filter** | By price, name, category |
| **Image Upload** | Stop using `placebear.com` |
| **Rate Limiting** | Prevent review/order spam |
| **Error Handling** | 404s return HTML, not JSON |
| **Database Indexes** | On `furnitureId`, `userId` |

---

This is a **proof-of-concept**. It will:

- Leak user data
- Allow fake orders
- Crash on bad input

---

## ✅ **Next Steps (Do This Now)**

1. Add JWT auth
2. Validate all inputs
3. Add pagination
4. Replace placeholder images
5. Add logging (Winston)
6. Add Swagger/OpenAPI docs

---

## 📝 **Final Verdict**

> **"It works on your machine" ≠ Production Ready**

You’ve got a working skeleton. Now give it muscles, skin, and a brain.

---

**Made with 🔥 and brutal honesty**  
*Infurno Backend – v0.1 (Demo Only)*