# RoomLoop Deployment Guide

This document provides detailed instructions for deploying the RoomLoop application using Vercel and Netlify.

## Architecture Overview

RoomLoop is a MERN stack application with:
- Frontend: React.js (client directory)
- Backend: Node.js + Express + Socket.io (server directory)
- Database: MongoDB Atlas

## Deployment Options

There are two main deployment options:
1. **Vercel for both frontend and backend**
2. **Netlify for frontend, Vercel for backend**

## Prerequisites

- GitHub account
- Vercel account (https://vercel.com)
- Netlify account (https://netlify.com) if using Netlify
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)

## Option 1: Vercel for Both Frontend and Backend

### Step 1: Deploy the Backend

1. Push your code to a GitHub repository
2. Log in to Vercel and click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Other
   - Root Directory: `server`
   - Build Command: `npm install`
   - Output Directory: Leave empty
5. Add environment variables:
   ```
   NODE_ENV=production
   JWT_SECRET=your_jwt_secret_here
   MONGODB_ATLAS_URI=your_mongodb_atlas_uri_here
   ```
6. Click "Deploy"
7. Note the deployment URL (e.g., `https://roomloop-api.vercel.app`)

### Step 2: Deploy the Frontend

1. From your Vercel dashboard, click "New Project" again
2. Import the same GitHub repository
3. Configure the project:
   - Framework Preset: Create React App
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Add environment variables:
   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app
   ```
5. Click "Deploy"
6. Your frontend will be available at a URL like `https://roomloop.vercel.app`

## Option 2: Frontend on Netlify, Backend on Vercel

### Step 1: Deploy the Backend on Vercel

Follow the same steps as in Option 1 for the backend.

### Step 2: Deploy the Frontend on Netlify

1. Push your code to a GitHub repository
2. Log in to Netlify and click "New site from Git"
3. Connect to your GitHub repository
4. Configure the build settings:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/build`
5. Add environment variables:
   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app
   ```
6. Click "Deploy site"
7. Your frontend will be available at a Netlify URL (customizable in settings)

## Post-Deployment Configuration

### Update CORS Configuration

1. Add the frontend URL to your backend environment variables:
   ```
   CLIENT_URL=https://your-frontend-url
   ```
2. Redeploy the backend if necessary

### Test Socket.io Connection

1. Open your deployed frontend in a browser
2. Register or log in to your application
3. Create a new room and test the real-time features
4. Check the browser console for any connection errors

## Troubleshooting

### Socket.io Connection Issues

- Ensure CORS is correctly configured in `server.js`
- Verify that the `REACT_APP_API_URL` environment variable is correctly set
- Check that your JWT token is properly being sent with the Socket.io connection

### MongoDB Connection Issues

- Ensure your MongoDB Atlas cluster allows connections from your Vercel IP addresses
- Check that your connection string in `MONGODB_ATLAS_URI` is correct
- Verify that your MongoDB user has the proper permissions

### 404 Errors on Page Refresh

- For Netlify, ensure the `netlify.toml` file has the proper redirect rules
- For Vercel, check that your frontend is properly configured for client-side routing

## Continuous Deployment

Both Vercel and Netlify support continuous deployment from your GitHub repository. Any changes pushed to your main branch will automatically trigger a new deployment.

## Production Monitoring

Consider adding monitoring tools:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user analytics 

## Detailed Step-by-Step Deployment Guide

### Option 1: Deploying with Vercel (Both Frontend and Backend)

#### Backend Deployment on Vercel

1. **Prepare your backend for Vercel deployment**:
   - You've already created the `vercel.json` configuration file in the server directory.
   - Make sure your server listens on the port provided by Vercel: `const PORT = process.env.PORT || 5500;`

2. **Create environment variables**:
   - Go to Vercel dashboard → your project → Settings → Environment Variables
   - Add all required environment variables:
     - `JWT_SECRET`: Your JWT secret key
     - `MONGODB_ATLAS_URI`: Your MongoDB connection string
     - `NODE_ENV`: Set to "production"
     - Any other environment variables your app requires

3. **Deploy the backend**:
   ```bash
   cd server
   npm install -g vercel
   vercel login
   vercel
   ```
   - Follow the prompts to link to your Vercel account
   - When asked about settings, confirm the following:
     - Project path: `./`
     - Output directory: n/a (press Enter)
     - Development command: `npm run dev`
     - Build command: `npm install`
   - The deployment will provide you with a URL (e.g., `https://roomloop-api.vercel.app`)
   - This is your backend API URL (save it for frontend configuration)

#### Frontend Deployment on Vercel

1. **Set environment variables for the frontend**:
   - Create a `.env.production` file in the client directory (don't commit it to git)
   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app
   ```

2. **Deploy the frontend**:
   ```bash
   cd client
   vercel login # if not already logged in
   vercel
   ```
   - Follow the prompts as with the backend
   - Configure environment variables in the Vercel dashboard after deployment
   - Your frontend will be available at a URL like `https://roomloop.vercel.app`

### Option 2: Frontend on Netlify, Backend on Vercel

#### Backend Deployment on Vercel
- Follow the same steps as above for backend deployment

#### Frontend Deployment on Netlify

1. **Prepare your frontend for Netlify**:
   - You've already created the `netlify.toml` configuration
   - Create a `.env.production` file (don't commit it):
   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app
   ```

2. **Deploy to Netlify**:
   ```bash
   cd client
   npm install -g netlify-cli
   netlify login
   netlify init
   ```
   - Follow the prompts to create a new site or link to an existing one
   - When asked for build command, enter: `npm run build`
   - When asked for publish directory, enter: `build`
   - Deploy with: `netlify deploy --prod`

3. **Configure environment variables in Netlify**:
   - Go to Netlify dashboard → your site → Site settings → Build & deploy → Environment
   - Add the same environment variables as in the `.env.production` file

## Configuring Socket.io for Deployment

Socket.io requires specific configuration for CORS when deployed. Update your socket.io configuration in `server.js`: 