# RoomLoop – The Drop-In Events & Micro-Meetup Platform

🔗 **Live Demo:** [https://roomloop.com](https://roomloop-vsru.vercel.app/)
RoomLoop is a casual, link-free micro-event platform. Users create temporary "Rooms" with topics, people get notified, and anyone can hop in when the room is live.

## Overview

RoomLoop is a presence-first coordination tool that enables users to:

- Create scheduled rooms with themes & time windows
- Invite friends via username or make public rooms
- Show room status (Scheduled, Live, Closed)
- Drop into live rooms to chat (text-based) or leave reactions
- Track past rooms and participation

## Tech Stack

- **Frontend**: React.js with Context API
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **Styling**: Tailwind CSS

## Features

1. **User Authentication**
   - Secure signup/login with email or username
   - JWT-based authentication

2. **Room Management**
   - Create rooms with title, description, type, time window
   - Automatic status updates (Scheduled → Live → Closed)
   - Room tagging (Hangout, Work, Brainstorm, etc.)

3. **Invitation System**
   - Add users by username or email for private rooms
   - Public room discovery
   - Notification management

4. **Room Interaction**
   - Text messaging
   - Emoji reactions
   - Participant tracking

5. **Room History & Stats**
   - Past room archiving
   - Participation tracking
   - Room summaries

6. **Public Room Discovery**
   - Browse live and upcoming public rooms
   - Filter by tags and status
   - Trending room highlighting

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/its-tarun-2505/roomloop.git
   cd roomloop
   ```

2. Install dependencies for both server and client
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Create .env file in the server directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5501
   JWT_SECRET=your_jwt_secret
   MONGODB_ATLAS_URI=your_mongodb_connection_string
   ```

### Starting the Application with Socket.io

1. Start the server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the client in a new terminal:
   ```bash
   cd client
   npm start
   ```

3. The application will be available at:
   - Client: http://localhost:3000
   - Server: http://localhost:5501

### Testing Socket.io

1. Open the Socket.io debug endpoint in your browser:
   ```bash
   http://localhost:5501/api/debug/socket
   ```

2. You should see information about active connections and rooms.

3. When you join a room in the application, you'll see real-time updates without page refreshes.

## Usage

1. Register or log in using the provided interface
2. Create a new room or join an existing one
3. Participate in real-time conversations with other users
4. Use reactions to express emotions in both the room and on specific messages

## Architecture

RoomLoop uses a modern stack with real-time communication:

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Real-time Communication**: Socket.io
- **Authentication**: JWT

The application has been refactored from a polling-based system to a more efficient Socket.io implementation for true real-time communication.

## Folder Structure

```
roomloop/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # Source files
│       ├── assets/         # Images, icons, etc.
│       ├── components/     # Reusable UI components
│       ├── context/        # Context API files
│       ├── pages/          # Page components
│       ├── services/       # API services
│       └── utils/          # Utility functions
├── server/                 # Node/Express backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   └── utils/              # Utility functions
└── README.md               # Project documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project was built as a demonstration for a MERN stack application
- Inspired by the need for lightweight coordination tools in an over-scheduled world 
