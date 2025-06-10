FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN npm ci --ignore-scripts

COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig*.json ./
COPY src ./src
COPY public ./public

RUN npm run build

RUN rm -rf node_modules
RUN npm ci --omit=dev --ignore-scripts
RUN npx prisma generate

FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public


CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/server.js"]