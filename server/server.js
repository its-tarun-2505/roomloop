const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');

// Load env vars
dotenv.config();

// Ensure environment variables are properly set
require('./config/setupEnv');

// Connect to database
console.log('Starting MongoDB Atlas connection...');
connectDB().then(() => {
  console.log('MongoDB Atlas connection successful, server ready to accept requests.');
}).catch(err => {
  console.error('Failed to connect to MongoDB Atlas:', err);
});

const app = express();
const server = http.createServer(app);

// Set up Socket.io with CORS configuration
const io = socketio(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.CLIENT_URL 
      : 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Make io available globally via a module
const socketModule = require('./socket');
socketModule.init(io);

// Make io available to routes (for debugging)
app.set('socketio', io);

// Socket.io authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error: Token not provided'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (error) {
    return next(new Error('Authentication error: Invalid token'));
  }
});

// Socket.io connection handler
io.on('connection', socket => {
  console.log(`Socket connected: ${socket.id} - User: ${socket.user.username}`);
  
  // Join user to their own notification room (using their user ID)
  socket.join(socket.user.id);
  console.log(`User ${socket.user.username} joined personal notification room: ${socket.user.id}`);

  // Join room
  socket.on('joinRoom', ({ roomId }) => {
    console.log(`User ${socket.user.username} joined room: ${roomId}`);
    socket.join(roomId);
  });

  // Leave room
  socket.on('leaveRoom', ({ roomId }) => {
    console.log(`User ${socket.user.username} left room: ${roomId}`);
    socket.leave(roomId);
  });

  // Listen for new messages
  socket.on('sendMessage', async ({ roomId, message }) => {
    // The message should already be saved via the API call
    // Just broadcast it to all other users in the room
    socket.to(roomId).emit('newMessage', {
      message,
      user: {
        _id: socket.user.id,
        username: socket.user.username
      }
    });
  });

  // Listen for reactions
  socket.on('sendReaction', ({ roomId, reaction }) => {
    // The reaction should already be saved via the API call
    // Just broadcast it to all other users in the room
    socket.to(roomId).emit('newReaction', {
      reaction,
      user: {
        _id: socket.user.id,
        username: socket.user.username
      }
    });
  });

  // Listen for message reactions
  socket.on('sendMessageReaction', ({ roomId, messageId, reaction }) => {
    // The message reaction should already be saved via the API call
    // Just broadcast it to all other users in the room
    socket.to(roomId).emit('newMessageReaction', {
      messageId,
      reaction,
      user: {
        _id: socket.user.id,
        username: socket.user.username
      },
      // Pass through additional flags if they exist
      removed: reaction.removed || false,
      updated: reaction.updated || false
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : 'http://localhost:3000',
  credentials: true,
}));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Make io available to our routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/debug', require('./routes/index'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/invitations', require('./routes/invitationRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/reactions', require('./routes/reactionRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Any routes not caught by API will be redirected to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Set port for local development (not used in Vercel)
const port = process.env.PORT || 4000;

// Add a root route that Vercel can use to keep the function warm
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'RoomLoop API is running', 
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Add CORS headers for Vercel
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL || '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Use server.listen for local development, not needed for Vercel
if (process.env.NODE_ENV !== 'production') {
  server.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`API URL: http://localhost:${port}`);
    console.log(`Socket.io server is running`);
  });
} else {
  console.log('Running in production mode on Vercel');
}

// Export the Express API for Vercel
module.exports = app; 