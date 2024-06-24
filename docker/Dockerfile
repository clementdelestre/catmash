# Stage 1: Build the frontend and backend
FROM node:20.14-alpine AS build

# Set working directory
WORKDIR /app

# Copy Lerna and root package files
COPY lerna.json package.json package-lock.json ./

# Install dependencies for the entire monorepo
RUN npm install

# Copy all packages
COPY packages ./packages

# Build frontend and backend
RUN npx lerna run build

# Stage 2: Final stage
FROM node:20.14-alpine

WORKDIR /app

# Copy built frontend and backend from build stage
COPY --from=build /app/packages/frontend/dist ./frontend
COPY --from=build /app/packages/backend/dist ./backend/dist

# Install production dependencies for backend
COPY packages/backend/package*.json ./backend/
RUN npm install --only=production --prefix ./backend

EXPOSE 3000

CMD ["node", "backend/dist/main"]