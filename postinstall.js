// Postinstall script untuk generate Prisma Client
const { execSync } = require('child_process');

console.log('🔧 Running postinstall: Generating Prisma Client...');

try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma Client generated successfully');
} catch (error) {
  console.error('❌ Failed to generate Prisma Client:', error.message);
  process.exit(1);
}
