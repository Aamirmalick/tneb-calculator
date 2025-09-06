# Use official Node.js image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock / pnpm-lock.yaml)
COPY package*.json ./

# Install React 18 explicitly
RUN npm install react@18.2.0 react-dom@18.2.0

# Install all other dependencies
RUN npm install

# Copy project files
COPY . .

# Debug: list files in /app/src to verify App.js vs app.js
RUN echo "====== SRC DIRECTORY LIST ======" && ls -l /app/src && echo "================================"

# Build the React app
RUN npm run build

# Serve app with a lightweight server (nginx)
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
