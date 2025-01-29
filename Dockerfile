# Use Node.js for Angular build
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy project files
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build Angular app
RUN npm run build --prod

# Use Nginx to serve the app
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

