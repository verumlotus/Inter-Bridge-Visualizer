import axios from "axios";
import { defiLlamaProtocolEndpoint } from '../constants/endpoints';
import { TVL_TIMEFRAME } from "../constants/constants";

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
export async function fetchAllBridgeData(bridges: string[]) : Promise<{}[]> {
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
export function getTvlByBridge(bridgeData): any[] {
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
export function getTvlByChain(bridgeData) {
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

/**
 * For every chain, will breakdown how much TVL comes from which bridges
 * @param bridgeData 
 */
export function getTvlSingleChainByBridge(bridgeData) {
    let chainTvlByBridge = {}
    for (const bridgeInfo of bridgeData) {
        for (const chain in bridgeInfo.chainTvls) {
            if (!(chain in chainTvlByBridge)) {
                chainTvlByBridge[chain] = {}
            }
            chainTvlByBridge[chain][bridgeInfo.name] = bridgeInfo.chainTvls[chain].tvl
        }
    }
    return chainTvlByBridge;
}

/**
 * For every chain, will breakdown how much TVL comes from which asset
 * @param bridgeData 
 */
export function getTvlSingleChainByAsset(bridgeData) {
    let chainTvlByAsset = {}
    for (const bridgeInfo of bridgeData) {
        for (const chain in bridgeInfo.chainTvls) {
            if (!(chain in chainTvlByAsset)) {
                chainTvlByAsset[chain] = {}
            }
            const chainInfo = bridgeInfo.chainTvls[chain]
            for (const tvlByTokenPerDate of chainInfo.tokensInUsd) {
                // Loop through all the tokens 
                for (const token in tvlByTokenPerDate.tokens) {
                    // Check if the tokens exist in our mapping
                    if (!(token in chainTvlByAsset[chain])) {
                        chainTvlByAsset[chain][token] = {}
                    }
                    // Check if we've seen the date before
                    if (!(tvlByTokenPerDate.date in chainTvlByAsset[chain][token])) {
                        chainTvlByAsset[chain][token][tvlByTokenPerDate.date] = 0
                    }
                    chainTvlByAsset[chain][token][tvlByTokenPerDate.date] += tvlByTokenPerDate.tokens[token]
                }
            }
        }
    }
    return chainTvlByAsset
}

/**
 * For every asset, will breakdown the TVL by bridge
 * @param bridgeData 
 * @returns 
 */
export function getTvlSingleAssetByBridge(bridgeData) {
    let assetTvlByBridge = {}
    for (const bridgeInfo of bridgeData) {
        for (const chain in bridgeInfo.chainTvls) {
            const chainInfo = bridgeInfo.chainTvls[chain]
            for (const tvlByTokenPerDate of chainInfo.tokensInUsd) {
                // Loop through all the tokens 
                for (const token in tvlByTokenPerDate.tokens) {
                    // Check if the tokens exist in our mapping
                    if (!(token in assetTvlByBridge)) {
                        assetTvlByBridge[token] = {}
                    }
                    // Check if we've seen this bridge before for this specific asset
                    if (!(bridgeInfo.name in assetTvlByBridge[token])) {
                        assetTvlByBridge[token][bridgeInfo.name] = {}
                    }
                    // Check if we've seen the date before
                    if (!(tvlByTokenPerDate.date in assetTvlByBridge[token][bridgeInfo.name])) {
                        assetTvlByBridge[token][bridgeInfo.name][tvlByTokenPerDate.date] = 0
                    }
                    assetTvlByBridge[token][bridgeInfo.name][tvlByTokenPerDate.date] += tvlByTokenPerDate.tokens[token]
                }
            }
        }
    }
    return assetTvlByBridge
}

/**
 * For every asset, will breakdown the TVL by chain
 * @param bridgeData 
 * @returns 
 */
 export function getTvlSingleAssetByChain(bridgeData) {
    let assetTvlByChain = {}
    for (const bridgeInfo of bridgeData) {
        for (const chain in bridgeInfo.chainTvls) {
            const chainInfo = bridgeInfo.chainTvls[chain]
            for (const tvlByTokenPerDate of chainInfo.tokensInUsd) {
                // Loop through all the tokens 
                for (const token in tvlByTokenPerDate.tokens) {
                    // Check if the tokens exist in our mapping
                    if (!(token in assetTvlByChain)) {
                        assetTvlByChain[token] = {}
                    }
                    // Check if we've seen this chain before for this specific asset
                    if (!(chain in assetTvlByChain[token])) {
                        assetTvlByChain[token][chain] = {}
                    }
                    // Check if we've seen the date before
                    if (!(tvlByTokenPerDate.date in assetTvlByChain[token][chain])) {
                        assetTvlByChain[token][chain][tvlByTokenPerDate.date] = 0
                    }
                    assetTvlByChain[token][chain][tvlByTokenPerDate.date] += tvlByTokenPerDate.tokens[token]
                }
            }
        }
    }
    return assetTvlByChain
}

