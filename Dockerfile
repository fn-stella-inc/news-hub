# -- news-hub dockerfile
# -- multi-stage build for optimized production image

# -- stage 1: dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# -- install dependencies only when needed
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# -- stage 2: builder
FROM node:20-alpine AS builder
WORKDIR /app

# -- copy node modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# -- set environment variables for build
ENV NODE_ENV=production

# -- build the application
RUN npm run build

# -- stage 3: runner
FROM node:20-alpine AS runner
WORKDIR /app

# -- set environment to production
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

# -- create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 astro

# -- copy built assets from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# -- set proper permissions
RUN chown -R astro:nodejs /app

# -- switch to non-root user
USER astro

# -- expose the application port
EXPOSE 4321

# -- health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:4321/ || exit 1

# -- start the application
CMD ["node", "./dist/server/entry.mjs"]
