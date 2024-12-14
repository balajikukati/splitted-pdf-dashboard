# Stage 1: Build the Angular app
FROM node:14-alpine AS build-stage

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the Angular app source code
COPY . .

# Build the Angular app in production mode
RUN npm run build -- --configuration production

# Stage 2: Serve the app using Nginx
FROM nginx:stable-alpine

# Copy build output to Nginx HTML directory
COPY --from=build-stage /app/dist/* /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
