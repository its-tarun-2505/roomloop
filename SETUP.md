# RoomLoop Setup Guide

This document provides instructions for setting up and running the RoomLoop application, a platform for scheduling and managing virtual micro-meetups.

## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB (v4.x or higher)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/roomloop.git
cd roomloop
```

### 2. Backend Setup

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit the `.env` file and set your environment variables:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secret key for JWT token generation
- Other variables as needed

### 3. Frontend Setup

```bash
# Navigate to the client directory
cd ../client

# Install dependencies
npm install
```

## Running the Application

### 1. Start the MongoDB service

Make sure your MongoDB service is running. If using a local instance:

```bash
# On Linux/Mac
sudo service mongod start

# On Windows
# MongoDB should be running as a service
```

### 2. Start the Backend Server

```bash
# Navigate to the server directory
cd server

# Start the development server
npm run dev
```

The backend server will start on http://localhost:5000 (or the port you specified in the .env file).

### 3. Start the Frontend Application

```bash
# In a new terminal, navigate to the client directory
cd client

# Start the development server
npm start
```

The frontend application will start on http://localhost:3000.

## Implemented Features

The RoomLoop application now includes the following features:

1. **User Authentication**
   - Registration and login
   - Profile management

2. **Room Management**
   - Create, view, and manage rooms
   - Public and private room types
   - Room status tracking (scheduled, live, closed)

3. **Room Interaction**
   - Real-time messaging in live rooms
   - Emoji reactions
   - Participant tracking

4. **Invitation System**
   - Send invitations to users
   - Accept/decline invitations
   - View sent/received invitations

5. **Notification System**
   - Receive notifications for invitations and room events
   - Mark notifications as read
   - Delete notifications

## Additional Notes

- The backend automatically updates room statuses based on their time windows
- Private rooms require an invitation to join
- Public rooms can be discovered and joined by any authenticated user
- Room creators can invite other users to their private rooms

## Troubleshooting

If you encounter any issues:

1. Ensure MongoDB is running and accessible
2. Check your environment variables in the .env file
3. Make sure all dependencies are installed
4. Check the server logs for specific error messages

For more detailed information, refer to the main README.md file. 