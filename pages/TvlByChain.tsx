import axios from "axios";
import useSWR from "swr";
import LineChart from "../components/LineChart";

async function fetcher(url: string) {
    const response = await axios.get(url);
    // Change "bridge" key to "id" to satisfy nivo
    for (const bridgeInfo of response.data) {
        bridgeInfo['id'] = bridgeInfo['chain']
        delete bridgeInfo['chain']
    }
    console.log(response.data)
    return response.data;
}

export default function TvlByBridge() {
    // Retrieve the data
    const URL = "/api/tvlByChain";
    const { data, error } = useSWR(URL, fetcher)

    return (
        <div style={{height: "55vh", width: "90vw"}}>
            <h2>
                Compare the bridged TVL of Chains
            </h2>
            <p>
                Explanation of what questions this can answer go here!
            </p>
            {!error && data &&(
                <LineChart data={data}/>
            )}
        </div>
    )
}