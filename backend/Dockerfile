FROM node:18-alpine

# Install dependencies for Prisma (OpenSSL + glibc compat)
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app


# 1️⃣ Copy schema first so that postinstall (prisma generate) finds it
COPY prisma ./prisma

# 2️⃣ Copy package files and install deps
COPY package*.json ./

RUN npm install

COPY . .

# Generate Prisma client *after* schema is copied
RUN npx prisma generate

# Expose and start
EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
