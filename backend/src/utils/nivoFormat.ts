import { fetchAllBridgeData, getTvlByBridge, getTvlByChain, getTvlSingleChainSplitByBridge, 
    getTvlSingleChainSplitByAsset, getTvlSingleAssetByBridge, getTvlSingleAssetByChain } from "./dataCollection";
import { NivoLine } from "../types/typeUtils";
import {logJson} from "./debugUtils";
import * as bridgeJson from "../constants/bridges.json";

// This file contains logic to format bridge data according to the nivo.js charting library

/**
 * Formats getTvlByBridge
 * @param bridgeTotalTvl 
 */
function fmtGetTvlByBridge(bridgeTotalTvl: {"name": string, "tvl": {"date": number, "totalLiquidityUSD": number}[]}[]): NivoLine[] {
    let nivoData: NivoLine[] = []
    nivoData = bridgeTotalTvl.map((bridgeInfo) => ({
        "id": bridgeInfo.name, 
        "data": bridgeInfo.tvl.map((tvlInfo) => ({
            "x": tvlInfo.date, 
            "y": tvlInfo.totalLiquidityUSD
        }))
    }));
    return nivoData;
}

async function runner() {
    const bridgeData = await fetchAllBridgeData(bridgeJson.bridges);
    const bridgeTotal = getTvlSingleAssetByChain(bridgeData);
    logJson(bridgeTotal)
}

runner();