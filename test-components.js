// Test script to verify all components and libs are accessible
const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('Component & Library Test');
console.log('========================================\n');

const filesToCheck = [
  'components/Card.tsx',
  'components/Navbar.tsx',
  'components/Footer.tsx',
  'components/BottomNav.tsx',
  'components/WhatsAppFloat.tsx',
  'lib/formatDate.ts',
  'lib/auth.ts',
  'lib/prisma.ts',
  'lib/tahunAjaran.ts',
  'lib/gelombangPPDB.ts',
  'app/api/auth/login/route.ts',
  'app/api/auth/me/route.ts',
  'app/(public)/login/page.tsx',
  'app/admin/layout.tsx',
];

let allGood = true;

filesToCheck.forEach(file => {
  const exists = fs.existsSync(file);
  const status = exists ? '✓' : '✗';
  console.log(`${status} ${file}`);
  if (!exists) allGood = false;
});

console.log('\n========================================');
if (allGood) {
  console.log('✓ All files present');
  process.exit(0);
} else {
  console.log('✗ Some files are missing');
  process.exit(1);
}
