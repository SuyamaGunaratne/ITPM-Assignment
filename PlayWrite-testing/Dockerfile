# Use official Playwright image (already has browsers + deps)
FROM mcr.microsoft.com/playwright:v1.41.2-jammy

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies
RUN npm install || yarn install

# Copy all project files
COPY . .

# Install Playwright browsers (safety step)
RUN npx playwright install --with-deps

# Default command to run all tests
CMD ["npx", "playwright", "test"]
