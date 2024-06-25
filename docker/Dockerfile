# Stage 1: Build the frontend and backend
FROM node:20.14-alpine AS build

# Set working directory
WORKDIR /app

# Copy Lerna and root package files
COPY lerna.json package.json package-lock.json ./

# Copy all packages
COPY packages ./packages

# Install dependencies for the entire monorepo
RUN npm install

# Build frontend and backend
RUN npx lerna run build

# Stage 2: Serve frontend with Nginx and run backend with Node
FROM node:20.14-alpine

WORKDIR /app

# Copy built frontend and backend from build stage
COPY --from=build /app/packages/frontend/dist ./frontend/dist
COPY --from=build /app/packages/backend/dist ./backend/dist

# Copy custom Nginx configuration file
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# Expose ports for frontend and backend
EXPOSE 80
EXPOSE 3000

# Start both Nginx and the backend
CMD ["sh", "-c", "nginx -g 'daemon off;' & node backend/dist/main"]