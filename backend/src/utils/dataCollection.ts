import axios from "axios";
import * as bridgeJson from "../constants/bridges.json";
import { defiLlamaProtocolEndpoint } from '../constants/endpoints';
import { TVL_TIMEFRAME } from "../constants/constants";
import {logJson} from "./debugUtils";

/**
 * @notice fetches the data for a given bridge
 * @param bridge 
 */
async function fetchBridgeData(bridge: string) {
    const url = defiLlamaProtocolEndpoint + bridge;
    const response = await axios.get(url);
    return response.data;
}

/**
 * Returns array of elements with bridge data
 * @param bridges 
 * 
 * @returns 
 */
async function fetchAllBridgeData(bridges: string[]) : Promise<{}[]> {
    let bridgeData = [];
    const _data = await Promise.all(bridges.map(fetchBridgeData))
    // Format and clean data a bit 
    for (const bridgeInfo of _data) {
        if ('statusCode' in bridgeInfo && bridgeInfo.statusCode != 200) {
            // TODO: Sentry logging here
        } else {
            cleanBridgeInfo(bridgeInfo);
            bridgeData.push(bridgeInfo);
            
        }
    }
    return bridgeData;
}

/**
 * Parses & clean bridge info (e.g. truncating arrays to appropriate values)
 * @param bridgeInfo 
 */
function cleanBridgeInfo(bridgeInfo) {
    // Truncate TOP-level 'tvl', 'tokensinUSD', and 'tokens'
    // Keep the last TVL_TIMEFRAME elements, excluding the last element
    bridgeInfo.tvl = bridgeInfo.tvl.slice(Math.max(0, bridgeInfo.tvl.length - TVL_TIMEFRAME - 1), -1)
    bridgeInfo.tokensInUsd = bridgeInfo.tokensInUsd.slice(Math.max(0, bridgeInfo.tokensInUsd.length - TVL_TIMEFRAME - 1), -1)
    bridgeInfo.tokens = bridgeInfo.tokens.slice(Math.max(0, bridgeInfo.tokens.length - TVL_TIMEFRAME - 1), -1)
    // For each chain with 'chainTvls', do the same thing
    for (const chain in bridgeInfo.chainTvls) {
        const chainInfo = bridgeInfo.chainTvls[chain]
        chainInfo.tvl = chainInfo.tvl.slice(Math.max(0, chainInfo.tvl.length - TVL_TIMEFRAME - 1), -1)
        chainInfo.tokensInUsd = chainInfo.tokensInUsd.slice(Math.max(0, chainInfo.tokensInUsd.length - TVL_TIMEFRAME - 1), -1)
        chainInfo.tokens = chainInfo.tokens.slice(Math.max(0, chainInfo.tokens.length - TVL_TIMEFRAME - 1), -1)
    }
}

/**
 * @notice parses bridgeData to return historical TVL per bridge
 * @param bridgeData {}[]
 * @returns bridge TVL, {}[]
 */
function getTvlByBridge(bridgeData): {} {
    let bridgeTotalTvl = []
    for (const bridgeInfo of bridgeData) {
        bridgeTotalTvl.push({
            "name": bridgeInfo.name,
            "tvl": bridgeInfo.tvl
        })
    }
    return bridgeTotalTvl;
}

/**
 * Will aggregate TVL per chain across all bridges
 * @param bridgeData 
 * @returns a json object with keys as the chain and historical data for the TVL of the entire chain across bridges
 */
function getTvlByChain(bridgeData) {
    let tvlByChain = {}
    for (const bridgeInfo of bridgeData) {
        for (const chain in bridgeInfo.chainTvls) {
            if (!(chain in tvlByChain)) {
                tvlByChain[chain] = {}
            }
            const chainInfo = bridgeInfo.chainTvls[chain]
            for (const tvlPerDateInfo of chainInfo.tvl) {
                if (!(tvlPerDateInfo.date in tvlByChain[chain])) {
                    // We need to add the date and an initial TVL of 0
                    tvlByChain[chain][tvlPerDateInfo.date]= {}
                    tvlByChain[chain][tvlPerDateInfo.date]['aggregateTvl'] = 0
                }
                tvlByChain[chain][tvlPerDateInfo.date]['aggregateTvl'] += tvlPerDateInfo.totalLiquidityUSD
            }
        }
    }
    return tvlByChain
}


async function runner() {
    const bridgeData = await fetchAllBridgeData(bridgeJson.bridges);
    const bridgeTotal = getTvlByChain(bridgeData);
    logJson(bridgeTotal)
}

runner();

