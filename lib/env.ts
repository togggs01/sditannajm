// Validate environment variables
export function validateEnv() {
  const required = ['mysql://u900997367_annajm:Vu7tBK^|A92^@srv1154.hstgr.io:3306/u9O0997367_annajm'];
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
