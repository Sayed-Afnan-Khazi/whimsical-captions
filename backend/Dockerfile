# Use official Node.js runtime as base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose port
EXPOSE 5003

# Start the app
CMD ["npm", "run", "docker"]