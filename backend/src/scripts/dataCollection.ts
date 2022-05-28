import axios from "axios";
import * as bridges from "../constants/bridges.json";
import { defiLlamaProtocolEndpoint } from './../constants/endpoints';

/**
 * @notice fetches the data for a given bridge
 * @param bridge 
 */
async function fetchBridgeData(bridge: string) {
    const url = defiLlamaProtocolEndpoint + bridge;
    const response = await axios.get(url);
    console.log(response);
    return response.data;
}

fetchBridgeData("stargate");