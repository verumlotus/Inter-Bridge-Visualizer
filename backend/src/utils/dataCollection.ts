import axios from "axios";
import * as bridgeJson from "../constants/bridges.json";
import { defiLlamaProtocolEndpoint } from '../constants/endpoints';
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
    for (const obj of _data) {
        if ('statusCode' in obj && obj.statusCode != 200) {
            // TODO: Sentry logging here
        } else {
            bridgeData.push(obj);
        }
    }
    return bridgeData;
}

/**
 * @notice parses bridgeData to return historical TVL per bridge
 * @param bridgeData 
 * 
 */
function totalAllBridgeTvl(bridgeData): {} {
    let bridgeTotalTvl = {}
    for (const bridgeInfo of bridgeData) {
        bridgeTotalTvl[bridgeInfo.name] = {
            "name": bridgeInfo.name,
            "tvl": bridgeInfo.tvl
        }
        console.log(`Lenght of TVL is ${bridgeInfo.tvl.length}`)
    }
    return bridgeTotalTvl;
}

async function runner() {
    const bridgeData = await fetchAllBridgeData(bridgeJson.bridges);
    const bridgeTotal = totalAllBridgeTvl(bridgeData);
    logJson(bridgeTotal)
}

runner();

