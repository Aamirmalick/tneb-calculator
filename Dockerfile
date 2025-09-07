# Stage 1: Build React app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies like Tailwind)
RUN npm install

# Copy all source files
COPY . .

# Run Prettier to auto-fix formatting issues before build
RUN npx prettier --write "src/**/*.{js,jsx,ts,tsx,css}"

# Build the app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build output to Nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Fix permissions for OpenShift random UID
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx \
    && chgrp -R 0 /var/cache/nginx /var/run /var/log/nginx /etc/nginx /usr/share/nginx/html \
    && chmod -R g+rwX /var/cache/nginx /var/run /var/log/nginx /etc/nginx /usr/share/nginx/html

# Change Nginx to listen on 8080 instead of 80
RUN sed -i 's/listen       80;/listen       8080;/g' /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
