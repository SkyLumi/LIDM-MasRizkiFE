FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Expose the port the app will run on
EXPOSE 5173

# Command to run the Vite preview server
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "5173"]

