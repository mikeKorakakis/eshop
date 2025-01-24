# Stage 1: Build
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application for production
ENV DOTENV_CONFIG_PATH=.env.production

# ARG NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
# ENV API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS runner

# Set NODE_ENV to production
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --production
# ENV API_URL=http://webserver:80


# Expose the port that Next.js will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]