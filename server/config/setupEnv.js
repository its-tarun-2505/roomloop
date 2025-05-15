/**
 * Environment Variable Setup
 * 
 * This file ensures all required environment variables are properly set
 * before the server starts.
 */

/**
 * Verifies required environment variables are set
 */

// Set NODE_ENV to development if not set
if (!process.env.NODE_ENV) {
  console.log('NODE_ENV not set, defaulting to development');
  process.env.NODE_ENV = 'development';
}

// Determine the environment
const isProd = process.env.NODE_ENV === 'production';

// Required environment variables - PORT is only required in development
const requiredEnvVars = [
  'JWT_SECRET',
  'MONGODB_ATLAS_URI'
];

// Only require PORT in development
if (!isProd) {
  requiredEnvVars.push('PORT');
}

// Check for required environment variables
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: Environment variable ${envVar} is not set`);
    process.exit(1);
  }
}

console.log(`Environment setup complete: ${process.env.NODE_ENV} mode`);

// Check if JWT_SECRET is defined, set a default if not
if (!process.env.JWT_SECRET) {
  console.warn('JWT_SECRET not found in environment variables, setting a default value');
  process.env.JWT_SECRET = 'my_secret_key';
}

// Check if MONGODB_ATLAS_URI is defined
if (!process.env.MONGODB_ATLAS_URI) {
  console.warn('MONGODB_ATLAS_URI not found in environment variables, setting a default value');
  process.env.MONGODB_ATLAS_URI = 'mongodb+srv://admin:admin2002@roomloopcluster.qmfgmaz.mongodb.net/roomloop?retryWrites=true&w=majority';
}

// Set PORT only in development mode
if (!isProd && !process.env.PORT) {
  console.warn('PORT not found in environment variables, setting a default value for development');
  process.env.PORT = '4000';
}

console.log('Environment variables configured:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
if (!isProd) {
  console.log('- PORT:', process.env.PORT);
}
console.log('- JWT_SECRET:', process.env.JWT_SECRET ? '[SET]' : '[MISSING]');
console.log('- MONGODB_ATLAS_URI:', process.env.MONGODB_ATLAS_URI ? '[SET]' : '[MISSING]'); 