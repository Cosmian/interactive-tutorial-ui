# Interactive Demo - Frontend

This repository provides instructions/code samples using Cosmian solutions. The relevant actions, for different languages, are documented in `/src/actions` folder.

## Setting up Environment Variables

Create a file named `.env` with the following variables:

```
VITE_AUTH0_DOMAIN="<your-tenant>.<region>.auth0.com"
VITE_AUTH0_CUSTOM_DOMAIN="AUTH0_DOMAIN_CUSTOM_DOMAIN"
VITE_AUTH0_CLIENT_ID="AUTH0_CLIENT_ID"
VITE_CLIENT_2_TOKEN="CLIENT_2_TOKEN_GOES_HERE"
VITE_KMS_URL="YOUR_KMS_URL_GOES_HERE"
VITE_CONFIDENTIAL_SERVICE_URL="YOUR_CONFIDENTIAL_SERVICE_URL_GOES_HERE"
```

## Running the KMS and the User Interface

Requires Node version 18 or higher.

```
docker-compose build
docker-compose up
```

After the process is complete, open your browser and navigate to [http://localhost:3000](http://localhost:3000/).

## Optional: running in development mode

Start a Cosmian KMS server on http://localhost:9998:

```
docker run -p 9998:9998 --name kms ghcr.io/cosmian/kms --jwt-issuer-uri=https://<your-tenant>.<region>.auth0.com/ --jwks-uri=https://<your-tenant>.<region>.auth0.com/.well-known/jwks.json
```

Then start the UI with:

```
npm install
npm run dev
```
