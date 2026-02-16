import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixOldImages() {
  console.log('Fixing old image paths...')
  
  // Update guru dengan foto yang masih pakai path /uploads/
  const guruUpdated = await prisma.guru.updateMany({
    where: {
      foto: {
        startsWith: '/uploads/'
      }
    },
    data: {
      foto: null
    }
  })
  
  console.log(`Updated ${guruUpdated.count} guru records`)
  
  // Update berita
  const beritaUpdated = await prisma.berita.updateMany({
    where: {
      gambar: {
        startsWith: '/uploads/'
      }
    },
    data: {
      gambar: null
    }
  })
  
  console.log(`Updated ${beritaUpdated.count} berita records`)
  
  // Update galeri
  const galeriUpdated = await prisma.galeri.updateMany({
    where: {
      gambar: {
        startsWith: '/uploads/'
      }
    },
    data: {
      gambar: null
    }
  })
  
  console.log(`Updated ${galeriUpdated.count} galeri records`)
  
  console.log('Done! Old image paths have been cleared.')
  console.log('You can now edit these records and upload new images (will be saved as base64)')
}

fixOldImages()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
