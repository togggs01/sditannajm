import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const username = process.argv[2] || 'admin'
  const password = process.argv[3] || 'admin123'

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { username }
  })

  if (existingAdmin) {
    console.log(`❌ Admin dengan username "${username}" sudah ada!`)
    process.exit(1)
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create admin
  const admin = await prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
      role: 'admin'
    }
  })

  console.log('✅ Admin berhasil dibuat!')
  console.log('Username:', admin.username)
  console.log('Password:', password)
  console.log('Role:', admin.role)
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
