import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Creating 3 admin accounts...\n')

  // Admin 1: Super Admin (Full Access)
  const admin1Password = await bcrypt.hash('superadmin123', 10)
  const admin1 = await prisma.admin.upsert({
    where: { username: 'superadmin' },
    update: {
      password: admin1Password,
      role: 'super_admin'
    },
    create: {
      username: 'superadmin',
      password: admin1Password,
      role: 'super_admin'
    }
  })
  console.log('✅ Admin 1 (Super Admin) created:')
  console.log('   Username: superadmin')
  console.log('   Password: superadmin123')
  console.log('   Role: super_admin')
  console.log('   Access: Dashboard, Guru & Staff, Berita, Galeri, PPDB, Gelombang PPDB\n')

  // Admin 2: Berita & Galeri Admin
  const admin2Password = await bcrypt.hash('berita123', 10)
  const admin2 = await prisma.admin.upsert({
    where: { username: 'adminberita' },
    update: {
      password: admin2Password,
      role: 'berita_galeri_admin'
    },
    create: {
      username: 'adminberita',
      password: admin2Password,
      role: 'berita_galeri_admin'
    }
  })
  console.log('✅ Admin 2 (Berita & Galeri Admin) created:')
  console.log('   Username: adminberita')
  console.log('   Password: berita123')
  console.log('   Role: berita_galeri_admin')
  console.log('   Access: Dashboard, Berita, Galeri\n')

  // Admin 3: PPDB Admin
  const admin3Password = await bcrypt.hash('ppdb123', 10)
  const admin3 = await prisma.admin.upsert({
    where: { username: 'adminppdb' },
    update: {
      password: admin3Password,
      role: 'ppdb_admin'
    },
    create: {
      username: 'adminppdb',
      password: admin3Password,
      role: 'ppdb_admin'
    }
  })
  console.log('✅ Admin 3 (PPDB Admin) created:')
  console.log('   Username: adminppdb')
  console.log('   Password: ppdb123')
  console.log('   Role: ppdb_admin')
  console.log('   Access: Dashboard, PPDB, Gelombang PPDB\n')

  console.log('🎉 All 3 admin accounts created successfully!')
  console.log('\n📝 Summary:')
  console.log('1. superadmin / superadmin123 - Full access to all pages')
  console.log('2. adminberita / berita123 - Access to Berita & Galeri only')
  console.log('3. adminppdb / ppdb123 - Access to PPDB & Gelombang PPDB only')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
