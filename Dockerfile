# Stage 1: Build the frontend application
FROM node:18

# Copy project files in /app folder
RUN mkdir -p /app
WORKDIR /app
ARG VITE_AUTH0_DOMAIN
ENV VITE_AUTH0_DOMAIN=$VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CUSTOM_DOMAIN
ENV VITE_AUTH0_CUSTOM_DOMAIN=$VITE_AUTH0_CUSTOM_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ENV VITE_AUTH0_CLIENT_ID=$VITE_AUTH0_CLIENT_ID
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ARG VITE_CLIENT_2_TOKEN
ENV VITE_CLIENT_2_TOKEN=$VITE_CLIENT_2_TOKEN
COPY . /app

# Install dependencies and build the application
RUN npm install
RUN npm run build

# Command to start your application
CMD ["npm", "run", "preview", "--", "--host"]
