# Setting Up MongoDB Atlas for RoomLoop

This guide will walk you through the process of configuring MongoDB Atlas as the database for your RoomLoop application.

## What is MongoDB Atlas?

MongoDB Atlas is a fully-managed cloud database service provided by MongoDB. It offers:
- Automated backups
- Auto-scaling
- High availability
- Security features
- Monitoring tools
- Global distribution capabilities

## Prerequisites

1. A MongoDB Atlas account (free tier available)
2. Node.js installed on your machine
3. The RoomLoop project cloned to your local machine

## Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Complete the registration process

## Step 2: Create a New Cluster

1. Log in to your MongoDB Atlas account
2. Click "Build a Cluster" (free tier is fine for development)
3. Choose your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Select a region closest to your users
5. Keep the default cluster tier (M0 Sandbox, which is free)
6. Give your cluster a name (e.g., "roomloopcluster")
7. Click "Create Cluster" (this may take a few minutes to provision)

## Step 3: Create a Database User

1. In the left sidebar, click "Database Access" under Security
2. Click "Add New Database User"
3. Choose "Password" authentication method
4. Create a username and password (save these for later)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

## Step 4: Configure Network Access

1. In the left sidebar, click "Network Access" under Security
2. Click "Add IP Address"
3. For development, you can select "Allow Access from Anywhere" (0.0.0.0/0)
   - Note: For production, you should restrict this to specific IP addresses
4. Click "Confirm"

## Step 5: Configure RoomLoop to Use MongoDB Atlas

### Automatic Setup (Recommended)

We've provided a setup script to simplify the MongoDB Atlas configuration process:

1. In your terminal, navigate to the server directory:
   ```
   cd server
   ```

2. Run the setup script:
   ```
   node setup-atlas.js
   ```

3. Follow the prompts to enter your MongoDB Atlas information:
   - Cluster name (e.g., "roomloopcluster")
   - Username
   - Password
   - Database name (default: "roomloop")
   - JWT Secret (or press Enter for a random one)
   - Server port (default: 5501)

The script will create or update your `.env` file with the appropriate settings.

### Manual Setup

If you prefer to configure manually:

1. Create or edit the `.env` file in the server directory
2. Add the following variables:
   ```
   MONGODB_ATLAS_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority
   JWT_SECRET=<your-jwt-secret>
   PORT=5501
   NODE_ENV=development
   ```
   - Replace `<username>`, `<password>`, `<cluster-name>`, and `<database-name>` with your MongoDB Atlas details

## Step 6: Test the Connection

1. Start the RoomLoop server:
   ```
   cd server
   npm run dev
   ```

2. If successful, you should see:
   ```
   Server running on port 5501
   MongoDB Atlas Connected: <cluster-name>.mongodb.net
   ```

## Troubleshooting

### Connection Issues

- **Error**: "MongoNetworkError: failed to connect to server"
  - **Solution**: Check your network access settings and ensure your IP is allowed

- **Error**: "MongoError: Authentication failed"
  - **Solution**: Verify your username and password are correct

- **Error**: "Connection string not properly formatted"
  - **Solution**: Ensure your connection string follows the format: `mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority`

## Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Connection Guide](https://mongoosejs.com/docs/connections.html)
- [MongoDB Node.js Driver](https://docs.mongodb.com/drivers/node/)

## Next Steps

Once MongoDB Atlas is set up, you can:

1. Start developing with RoomLoop
2. Create test data in your database
3. Configure monitoring and alerts in MongoDB Atlas
4. Explore advanced features like database triggers and data visualization 