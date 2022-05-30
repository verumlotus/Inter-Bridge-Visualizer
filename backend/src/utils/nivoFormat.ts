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

/**
 * Formats getTvlByChain
 * @param tvlByChain 
 */
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

/**
 * Formats a SINGLE chain in getTvlByChain
 * @param chainTvlByBridgeSingleInfo 
 */
function fmtSingleGetTvlSingleChainSplitByBridge(chainTvlByBridgeSingleInfo): NivoLine[] {
    let nivoLines: NivoLine[] = []
    for (const bridge in chainTvlByBridgeSingleInfo) {
        let nivoData: NivoLine["data"] = []
        for (const date in chainTvlByBridgeSingleInfo[bridge]) {
            nivoData.push({
                "x": date, 
                "y": chainTvlByBridgeSingleInfo[bridge].totalLiquidityUSD
            })
        }
        let nivoLine = {"id": bridge, "data": nivoData}
        nivoLines.push(nivoLine)
    }
    return nivoLines
}

/**
 * Formats a SINGLE chain in getTvlSingleChainSplitByAsset
 * @param chainTvlByAssetSingleInfo 
 */
function fmtSingleGetTvlSingleChainSplitByAsset(chainTvlByAssetSingleInfo): NivoLine[] {
    let nivoLines: NivoLine[] = []
    for (const asset in chainTvlByAssetSingleInfo) {
        let nivoData: NivoLine["data"] = []
        for (const date in chainTvlByAssetSingleInfo[asset]) {
            nivoData.push({
                "x": Number(date), 
                "y": chainTvlByAssetSingleInfo[asset][date]
            })
        }
        let nivoLine = {"id": asset, "data": nivoData}
        nivoLines.push(nivoLine)
    }
    return nivoLines
}

/**
 * Formats a SINGLE asset in getTvlSingleAssetByBridge
 * @param assetTvlByBridgeSingleInfo 
 */
 function fmtSingleGetTvlSingleAssetByBridge(assetTvlByBridgeSingleInfo): NivoLine[] {
    let nivoLines: NivoLine[] = []
    for (const bridge in assetTvlByBridgeSingleInfo) {
        let nivoData: NivoLine["data"] = []
        for (const date in assetTvlByBridgeSingleInfo[bridge]) {
            nivoData.push({
                "x": Number(date), 
                "y": assetTvlByBridgeSingleInfo[bridge][date]
            })
        }
        let nivoLine = {"id": bridge, "data": nivoData}
        nivoLines.push(nivoLine)
    }
    return nivoLines
}

/**
 * Formats a SINGLE asset in getTvlSingleAssetByChain
 * @param assetTvlByChainSingleInfo 
 */
 function fmtSingleGetTvlSingleAssetByChain(assetTvlByChainSingleInfo): NivoLine[] {
    let nivoLines: NivoLine[] = []
    for (const chain in assetTvlByChainSingleInfo) {
        let nivoData: NivoLine["data"] = []
        for (const date in assetTvlByChainSingleInfo[chain]) {
            nivoData.push({
                "x": Number(date), 
                "y": assetTvlByChainSingleInfo[chain][date]
            })
        }
        let nivoLine = {"id": chain, "data": nivoData}
        nivoLines.push(nivoLine)
    }
    return nivoLines
}


async function runner() {
    const bridgeData = await fetchAllBridgeData(bridgeJson.bridges);
    let bridgeTotal = getTvlSingleAssetByChain(bridgeData);
    // bridgeTotal = fmtGetTvlByChain(bridgeTotal)
    logJson(bridgeTotal)
}

runner();