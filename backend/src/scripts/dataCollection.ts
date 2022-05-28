import axios from "axios";
import * as bridgeJson from "../constants/bridges.json";
import { defiLlamaProtocolEndpoint } from './../constants/endpoints';

/**
 * @notice fetches the data for a given bridge
 * @param bridge 
 */
async function fetchBridgeData(bridge: string) {
    const url = defiLlamaProtocolEndpoint + bridge;
    const response = await axios.get(url);
    return response.data;
}

async function fetchAllBridgeData(bridges: string[]) {
    let bridgeData = {};
    const _data = await Promise.all(bridges.map(fetchBridgeData))
    // Format and clean data a bit 
    for (const obj of _data) {
        if ('statusCode' in obj && obj.statusCode != 200) {
            // TODO: Sentry logging here
        } else {
            bridgeData[obj.name] = obj;
        }
    }
    return bridgeData;
}

fetchAllBridgeData(bridgeJson.bridges);