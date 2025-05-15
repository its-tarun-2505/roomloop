#!/bin/bash

echo "===== STARTING SERVER ====="
echo "PORT: $PORT"
echo "NODE_ENV: $NODE_ENV"
echo "Will bind to 0.0.0.0:$PORT"

node test-server.js 