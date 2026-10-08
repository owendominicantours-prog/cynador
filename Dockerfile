FROM node:24-bookworm-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1 SELF_HOSTED=true NODE_OPTIONS=--max-old-space-size=2048
RUN npm run build
FROM node:24-bookworm-slim AS runner
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates curl && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 NEXT_TELEMETRY_DISABLED=1 SELF_HOSTED=true
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
RUN mkdir -p /app/storage /app/data/private && chown -R node:node /app/storage /app/data
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=15s --start-period=90s --retries=3 CMD curl -fsS http://127.0.0.1:3000/ >/dev/null || exit 1
CMD ["node","server.js"]
