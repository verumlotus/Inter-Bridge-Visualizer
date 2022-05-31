import { PrismaClient } from '@prisma/client'
import { fetchAllBridgeData, getTvlByBridge, getTvlByChain, getTvlSingleChainByBridge, 
    getTvlSingleChainByAsset, getTvlSingleAssetByBridge, getTvlSingleAssetByChain } from "./dataCollection";
import { fmtGetTvlByBridge, fmtGetTvlByChain, fmtGetTvlSingleChainByBridge,
    fmtGetTvlSingleChainByAsset, fmtGetTvlSingleAssetByBridge, fmtGetTvlSingleAssetByChain} from './nivoFormat';
import {logJson} from "./debugUtils";
import * as bridgeJson from "../constants/bridges.json";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
})

async function runCronJob() {
    // Fetch data for all bridges
    const bridgeData = await fetchAllBridgeData(bridgeJson.bridges);
    // Now, for every graph we wish to create let's parse, format, and store data in our DB
    // 1. Tvl By Bridge
    let tvlByBridgeData = getTvlByBridge(bridgeData);
    tvlByBridgeData = fmtGetTvlByBridge(tvlByBridgeData)
    // Create a DB transaction to delete and then create 
    await prisma.$transaction([
        prisma.tvlByBridge.deleteMany(),
        prisma.tvlByBridge.createMany({
            data: tvlByBridgeData
        })
    ])

    // 2. Tvl By Chain
    let tvlByChainData = getTvlByChain(bridgeData);
    tvlByChainData = fmtGetTvlByChain(tvlByChainData)
    // Create a DB transaction to delete and then create 
    await prisma.$transaction([
        prisma.tvlByChain.deleteMany(),
        prisma.tvlByChain.createMany({
            data: tvlByChainData as any
        })
    ])

    // 3. Chain TVL by bridge
    let chainTvlByBridgeData = getTvlSingleChainByBridge(bridgeData);
    chainTvlByBridgeData = fmtGetTvlSingleChainByBridge(chainTvlByBridgeData)
    // Create a DB transaction to delete and then create 
    await prisma.$transaction([
        prisma.tvlSingleChainByBridge.deleteMany(),
        prisma.tvlSingleChainByBridge.createMany({
            data: chainTvlByBridgeData as any
        })
    ])

    // 4. Chain TVL by Asset
    let chainTvlByAssetData = getTvlSingleChainByAsset(bridgeData);
    chainTvlByAssetData = fmtGetTvlSingleChainByAsset(chainTvlByAssetData)
    // Create a DB transaction to delete and then create 
    await prisma.$transaction([
        prisma.tvlSingleChainByAsset.deleteMany(),
        prisma.tvlSingleChainByAsset.createMany({
            data: chainTvlByAssetData as any
        })
    ])

    // 5. Asset TVL by Bridge
    let assetTvlByBridge = getTvlSingleAssetByBridge(bridgeData);
    assetTvlByBridge = fmtGetTvlSingleAssetByBridge(assetTvlByBridge)
    // Create a DB transaction to delete and then create 
    await prisma.$transaction([
        prisma.tvlSingleAssetByBridge.deleteMany(),
        prisma.tvlSingleAssetByBridge.createMany({
            data: assetTvlByBridge as any
        })
    ])

    // 5. Asset TVL by Chain
    let assetTvlByChain = getTvlSingleAssetByChain(bridgeData);
    assetTvlByChain = fmtGetTvlSingleAssetByChain(assetTvlByChain)
    // Create a DB transaction to delete and then create 
    await prisma.$transaction([
        prisma.tvlSingleAssetByChain.deleteMany(),
        prisma.tvlSingleAssetByChain.createMany({
            data: assetTvlByChain as any
        })
    ])
}

runCronJob().then(() => {
    prisma.$disconnect();
});
