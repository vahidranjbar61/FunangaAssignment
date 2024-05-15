# Use the official Node.js image
FROM node:18

# Install Angular CLI globally
RUN npm install -g @angular/cli@latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY frontend/package.json .

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the Angular development server port
EXPOSE 4200

# Run the Angular development server
CMD ["npm", "start"]
