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
            "x": Number(tvlInfo.date), 
            "y": tvlInfo.totalLiquidityUSD.toFixed(2)
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
                "x": Number(date), 
                "y": chainTvlInfo[date].aggregateTvl.toFixed(2)
            })
        }
        let nivoLine = {"id": chain, "data": nivoData}
        nivoLines.push(nivoLine)
    }
    return nivoLines
}

/**
 * Formats getTvlSingleChainSplitByBridge
 * @param chainTvlByBridge 
 */
function fmtGetTvlSingleChainSplitByBridge(chainTvlByBridge) {
    let result = []
    for (const chain in chainTvlByBridge) {
        const chainTvlByBridgeSingleInfo = chainTvlByBridge[chain]
        let nivoLines: NivoLine[] = []
        for (const bridge in chainTvlByBridgeSingleInfo) {
            let nivoData: NivoLine["data"] = []
            for (const dateAndTvlInfo of chainTvlByBridgeSingleInfo[bridge]) {
                nivoData.push({
                    "x": Number(dateAndTvlInfo.date), 
                    "y": dateAndTvlInfo.totalLiquidityUSD.toFixed(2)
                })
            }
            let nivoLine = {"id": bridge, "data": nivoData}
            nivoLines.push(nivoLine)
        }
        result.push({
            "chain": chain,
            "bridgeTvlData": nivoLines
        })
    }
    return result
}

/**
 * Formats getTvlSingleChainSplitByAsset
 * @param chainTvlByAsset 
 */
function fmtGetTvlSingleChainSplitByAsset(chainTvlByAsset) {
    let result = []
    for (const chain in chainTvlByAsset) {
        const chainTvlByAssetSingleInfo = chainTvlByAsset[chain]
        let nivoLines: NivoLine[] = []
        for (const asset in chainTvlByAssetSingleInfo) {
            let nivoData: NivoLine["data"] = []
            for (const date in chainTvlByAssetSingleInfo[asset]) {
                nivoData.push({
                    "x": Number(date), 
                    "y": chainTvlByAssetSingleInfo[asset][date].toFixed(2)
                })
            }
            let nivoLine = {"id": asset, "data": nivoData}
            nivoLines.push(nivoLine)
        }
        result.push({
            "chain": chain,
            "assetTvlData": nivoLines
        })
    }
    return result
}

/**
 * Formats getTvlSingleAssetByBridge
 * @param assetTvlByBridge 
 */
 function fmtGetTvlSingleAssetByBridge(assetTvlByBridge) {
    let result = []
    for (const asset in assetTvlByBridge) {
        const assetTvlByBridgeSingleInfo = assetTvlByBridge[asset]
        let nivoLines: NivoLine[] = []
        for (const bridge in assetTvlByBridgeSingleInfo) {
            let nivoData: NivoLine["data"] = []
            for (const date in assetTvlByBridgeSingleInfo[bridge]) {
                nivoData.push({
                    "x": Number(date), 
                    "y": assetTvlByBridgeSingleInfo[bridge][date].toFixed(2)
                })
            }
            let nivoLine = {"id": bridge, "data": nivoData}
            nivoLines.push(nivoLine)
        }
        result.push({
            "asset": asset,
            "bridgeTvlData": nivoLines
        })
    }
    return result
}

/**
 * Formats getTvlSingleAssetByChain
 * @param assetTvlByChain 
 */
 function fmtGetTvlSingleAssetByChain(assetTvlByChain) {
    let result = []
    for (const asset in assetTvlByChain) {
        const assetTvlByChainSingleInfo = assetTvlByChain[asset]
        let nivoLines: NivoLine[] = []
        for (const chain in assetTvlByChainSingleInfo) {
            let nivoData: NivoLine["data"] = []
            for (const date in assetTvlByChainSingleInfo[chain]) {
                nivoData.push({
                    "x": Number(date), 
                    "y": assetTvlByChainSingleInfo[chain][date].toFixed(2)
                })
            }
            let nivoLine = {"id": chain, "data": nivoData}
            nivoLines.push(nivoLine)
        }
        result.push({
            "asset": asset,
            "chainTvlData": nivoLines
        })
    }
    return result
}


async function runner() {
    const bridgeData = await fetchAllBridgeData(bridgeJson.bridges);
    let bridgeTotal = getTvlSingleAssetByChain(bridgeData);
    bridgeTotal = fmtGetTvlSingleAssetByChain(bridgeTotal)
    logJson(bridgeTotal)
}

runner();