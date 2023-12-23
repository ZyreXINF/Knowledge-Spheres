# Use an official PHP runtime as a parent image
FROM php:7.4-apache

# Set the working directory to /var/www/html
WORKDIR /var/www/html

# Copy the current directory contents into the container at /var/www/html
COPY . /var/www/html

# Install any needed packages specified in requirements.txt
RUN apt-get update && apt-get install -y \
    libicu-dev \
    && docker-php-ext-install -j$(nproc) pdo_mysql \
    && docker-php-ext-install -j$(nproc) intl

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Enable mod_rewrite
RUN a2enmod rewrite

# Update the default apache site with the config we created
ADD apache-config.conf /etc/apache2/sites-available/000-default.conf

# Run apache when the container launches
CMD ["apache2-foreground"]
