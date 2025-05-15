// This is a workaround for using Socket.io on Vercel's serverless platform
// Socket.io will not have persistent connections in serverless environments
// Consider Pusher or a similar service for production

const socketio = require('socket.io');
let io;

module.exports = {
  init: (server) => {
    io = socketio(server, {
      cors: {
        origin: process.env.CLIENT_URL || '*',
        methods: ['GET', 'POST'],
        credentials: true
      },
      path: '/api/socketio',
      // Add serverless settings for Vercel
      transports: ['websocket', 'polling'],
      allowEIO3: true
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
}; 