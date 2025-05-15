#!/bin/bash
echo "Starting RoomLoop API server..."
echo "Environment: $NODE_ENV"
echo "Port: $PORT"

# Make this script executable
chmod +x render-start.sh

# Start the server and explicitly log port binding
node server.js 