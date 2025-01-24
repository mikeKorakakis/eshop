# Stage 1: Build Stage
FROM composer:2 AS builder

# Set the working directory
WORKDIR /app

# Copy only composer files first for dependency caching
COPY composer.json composer.lock ./

# Copy the rest of the application files (including artisan)
COPY . .
# Install dependencies
RUN composer install --no-dev --optimize-autoloader


# Run Laravel optimizations
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Stage 2: Production Stage
FROM php:8.2-fpm-alpine

# Install required PHP extensions
RUN docker-php-ext-install pdo pdo_mysql bcmath

# Set the working directory
WORKDIR /var/www/html

# Copy the built application from the builder stage
COPY --from=builder /app /var/www/html

RUN cp /var/www/html/.env.production /var/www/html/.env

# Set permissions for storage and cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache
	
# Expose port 9000 for PHP-FPM
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
