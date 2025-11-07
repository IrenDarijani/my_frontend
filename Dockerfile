FROM node:20

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Serve the build folder on port 8080
CMD ["serve", "-s", "build", "-l", "8080"]
