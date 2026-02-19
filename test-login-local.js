// Test login API locally
const http = require('http');

const data = JSON.stringify({
  username: 'admin',
  password: 'admin123'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('Testing login API...');
console.log('URL: http://localhost:3000/api/auth/login');
console.log('Credentials: admin / admin123\n');

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    console.log('\nResponse:');
    try {
      const json = JSON.parse(body);
      console.log(JSON.stringify(json, null, 2));
      
      if (res.statusCode === 200 && json.success) {
        console.log('\n✓ Login test PASSED');
        process.exit(0);
      } else {
        console.log('\n✗ Login test FAILED');
        process.exit(1);
      }
    } catch (e) {
      console.log(body);
      console.log('\n✗ Invalid JSON response');
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('✗ Request failed:', error.message);
  console.log('\nMake sure dev server is running: npm run dev');
  process.exit(1);
});

req.write(data);
req.end();
