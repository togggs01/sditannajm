// Validate environment variables
export function validateEnv() {
  const required = ['DATABASE_URL'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  return true;
}

// Call validation
if (process.env.NODE_ENV === 'production') {
  try {
    validateEnv();
    console.log('✓ Environment variables validated');
  } catch (error) {
    console.error('✗ Environment validation failed:', error);
  }
}
