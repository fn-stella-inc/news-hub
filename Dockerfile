# -- news hub dockerfile using bun
FROM oven/bun:1 AS base
WORKDIR /app

# -- install dependencies
FROM base AS deps
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# -- build stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# -- set environment variables
ENV NODE_ENV=production

# -- build the application
RUN bun run build

# -- production stage
FROM oven/bun:1-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

# -- create non-root user
RUN addgroup --system --gid 1001 bunjs && \
    adduser --system --uid 1001 bunjs

# -- copy built assets
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# -- set ownership
RUN chown -R bunjs:bunjs /app

USER bunjs

EXPOSE 4321

# -- start the server
CMD ["bun", "run", "./dist/server/entry.mjs"]
