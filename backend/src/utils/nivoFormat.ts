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
    let nivoLines: NivoLine[] = []
    nivoLines = bridgeTotalTvl.map((bridgeInfo) => ({
        "id": bridgeInfo.name, 
        "data": bridgeInfo.tvl.map((tvlInfo) => ({
            "x": tvlInfo.date, 
            "y": tvlInfo.totalLiquidityUSD
        }))
    }));
    return nivoLines;
}

function fmtGetTvlByChain(tvlByChain): NivoLine[] {
    let nivoLines: NivoLine[] = []
    for (const chain in tvlByChain) {
        const chainTvlInfo = tvlByChain[chain]
        let nivoData: NivoLine["data"] = []
        for (const date in chainTvlInfo) {
            nivoData.push({
                "x": date, 
                "y": chainTvlInfo[date].aggregateTvl
            })
        }
        let nivoLine = {"id": chain, "data": nivoData}
        nivoLines.push(nivoLine)
    }
    return nivoLines
}

async function runner() {
    const bridgeData = await fetchAllBridgeData(bridgeJson.bridges);
    let bridgeTotal = getTvlByChain(bridgeData);
    bridgeTotal = fmtGetTvlByChain(bridgeTotal)
    logJson(bridgeTotal)
}

runner();