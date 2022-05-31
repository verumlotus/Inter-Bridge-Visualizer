import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function dbGetTvlByBridge() {
    return await prisma.tvlByBridge.findMany();
}

export async function dbGetTvlByChain() {
    return await prisma.tvlByChain.findMany();
}

export async function dbGetChainTvlByBridge(chain: string) {
    return await prisma.tvlSingleChainByBridge.findFirst({
        where: {
            chain: chain
        }
    })
}

export async function dbGetChainTvlByAsset(chain: string) {
    return await prisma.tvlSingleChainByAsset.findFirst({
        where: {
            chain: chain
        }
    })
}

export async function dbGetAssetTvlByBridge(asset: string) {
    return await prisma.tvlSingleAssetByBridge.findFirst({
        where: {
            asset: asset
        }
    })
}

export async function dbGetAssetTvlByChain(asset: string) {
    return await prisma.tvlSingleAssetByChain.findFirst({
        where: {
            asset: asset
        }
    })
}