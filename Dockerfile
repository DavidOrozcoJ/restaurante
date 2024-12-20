# Usar una imagen base con PHP y Apache
FROM php:8.1-apache

# Instalar dependencias necesarias para Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql gd

# Instalar Composer
COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer

# Configurar la carpeta raíz de Apache para que apunte a "public"
WORKDIR /var/www/html
COPY . /var/www/html
RUN echo "DocumentRoot /var/www/html/public" >> /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

# Configurar Apache para servir el directorio "public"
RUN echo "DocumentRoot /var/www/html/public" >> /etc/apache2/sites-available/000-default.conf

# Habilitar el módulo de reescritura de Apache
RUN a2enmod rewrite

# Exponer el puerto 80
EXPOSE 80

RUN php artisan migrate --force

# Comando por defecto al iniciar el contenedor
CMD ["apache2-foreground"]
