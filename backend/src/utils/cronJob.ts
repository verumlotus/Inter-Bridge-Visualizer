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

async function runJob() {
    const bridgeData = await fetchAllBridgeData(bridgeJson.bridges);
    let bridgeTotal = getTvlByBridge(bridgeData);
    bridgeTotal = fmtGetTvlByBridge(bridgeTotal)
    // Create a DB transaction to delete and then create 
    await prisma.$transaction([
        prisma.tvlByBridge.deleteMany(),
        prisma.tvlByBridge.createMany({
            data: bridgeTotal
        })
    ])
}

runJob().then(() => {
    prisma.$disconnect();
});
