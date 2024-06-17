import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient()
console.log('entrei')

export { prisma }

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
