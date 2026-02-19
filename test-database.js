// Test database connection and admin user
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDatabase() {
  console.log('========================================');
  console.log('Database Connection Test');
  console.log('========================================\n');

  try {
    // Test connection
    console.log('1. Testing connection...');
    await prisma.$connect();
    console.log('✓ Database connected\n');

    // Check admin table
    console.log('2. Checking Admin table...');
    const adminCount = await prisma.admin.count();
    console.log(`✓ Admin count: ${adminCount}\n`);

    if (adminCount === 0) {
      console.log('⚠ No admin users found!');
      console.log('Creating default admin...');
      
      const newAdmin = await prisma.admin.create({
        data: {
          username: 'admin',
          password: 'admin123',
          role: 'admin'
        }
      });
      
      console.log('✓ Default admin created:', {
        id: newAdmin.id,
        username: newAdmin.username,
        role: newAdmin.role
      });
    } else {
      console.log('3. Listing admin users:');
      const admins = await prisma.admin.findMany({
        select: {
          id: true,
          username: true,
          role: true,
          createdAt: true
        }
      });
      
      admins.forEach(admin => {
        console.log(`  - ${admin.username} (${admin.role}) - ID: ${admin.id}`);
      });
    }

    console.log('\n4. Testing login credentials...');
    const testAdmin = await prisma.admin.findUnique({
      where: { username: 'admin' }
    });

    if (testAdmin) {
      console.log('✓ Admin user found');
      console.log('  Username:', testAdmin.username);
      console.log('  Password:', testAdmin.password === 'admin123' ? 'admin123 (correct)' : 'NOT admin123');
      console.log('  Role:', testAdmin.role);
    } else {
      console.log('✗ Admin user NOT found');
    }

    await prisma.$disconnect();
    
    console.log('\n========================================');
    console.log('✓ Database test completed successfully');
    console.log('========================================');
    process.exit(0);

  } catch (error) {
    console.error('\n✗ Database test failed:');
    console.error('Error:', error.message);
    console.error('\nCheck your .env file:');
    console.error('DATABASE_URL should be set correctly');
    
    await prisma.$disconnect();
    process.exit(1);
  }
}

testDatabase();
