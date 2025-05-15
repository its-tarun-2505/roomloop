const express = require('express');
const app = express();

// This is the crucial part for Render to detect port binding
const PORT = process.env.PORT || 4000;

// Serve a simple response for root path
app.get('/', (req, res) => {
  res.send('RoomLoop Test Server is running');
});

// Start the server - using the format Render specifically looks for
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://0.0.0.0:${PORT}`);
}); 