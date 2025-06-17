import { PrismaClient } from '@prisma/client'
import { inDevEnvironment } from './utils'

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: inDevEnvironment ? ['query', 'error', 'warn'] : ['error'],
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma
if (inDevEnvironment) globalThis.prismaGlobal = prisma
