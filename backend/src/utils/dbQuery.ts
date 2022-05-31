import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function dbGetTvlByBridge() {
    return await prisma.tvlByBridge.findMany();
}

export async function dbGetTvlByChain() {
    return await prisma.tvlByChain.findMany();
}