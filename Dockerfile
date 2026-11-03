# ============================================
# Stage 1: Install dependencies
# ============================================
FROM node:18-alpine AS deps
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production

# ============================================
# Stage 2: Production image
# ============================================
FROM node:18-alpine AS runner
WORKDIR /app

# Security: run as non-root user
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 appuser

# Copy production dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy backend source code
COPY backend/ ./

# Create uploads directory
RUN mkdir -p uploads && chown appuser:nodejs uploads

USER appuser

EXPOSE 5000

ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

CMD ["node", "index.js"]
