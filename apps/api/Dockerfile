# Build stage
FROM node:22.12.0-alpine AS builder
# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
# Install python and build tools for any native dependencies
RUN apk add --no-cache python3 make g++ gcc

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY tsconfig*.json ./
COPY nx.json ./
COPY jest.preset.js ./
COPY *.config.* ./

# Install all dependencies (including devDependencies)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/api ./apps/api
# COPY libs ./libs

# Build the app
RUN pnpx nx run api:build --verbose

# Production stage
FROM node:22.12.0-alpine AS production
# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files for production install
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile \
    && pnpm add tslib

# Copy built application
COPY --from=builder /app/dist/apps/api ./

# Use node user for security
USER node

# Set production environment
ENV NODE_ENV production

# Start the application
CMD ["dumb-init", "node", "main.js"]

# Expose the port your app runs on
EXPOSE 3000