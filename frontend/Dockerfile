# Use a stable Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency manifests first for better build caching
COPY package*.json ./

# Configure npm for reliable installs (handles ECONNRESET and slow networks)
RUN npm config set registry https://registry.npmjs.org/ \
 && npm config set fetch-retries 5 \
 && npm config set fetch-retry-factor 2 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the Next.js app (optional in dev mode)
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Default command (for dev)
CMD ["npm", "run", "dev"]
