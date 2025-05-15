#!/bin/bash
echo "Starting RoomLoop API server..."
echo "Environment: $NODE_ENV"
echo "Port: $PORT"
echo "Explicitly binding to port $PORT"

# Make this script executable
chmod +x render-start.sh

# Start the server with explicit port logging
echo "const port = process.env.PORT || 10000;"
node server.js 