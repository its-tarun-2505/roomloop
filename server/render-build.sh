#!/bin/bash

# This script runs during the build phase on Render

echo "Starting RoomLoop build process..."

# Install dependencies
npm install

# Create a startup log file that explicitly mentions the port
cat > start-log.txt << EOL
Starting RoomLoop server...
Binding to PORT: ${PORT}
Using explicit port binding on 0.0.0.0:${PORT}
EOL

echo "Build completed successfully." 