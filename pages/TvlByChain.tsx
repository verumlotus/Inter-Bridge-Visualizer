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
    const result = response.data.sort((a, b) => {
        return Number(b['data'].at(-1)['y']) - Number(a['data'].at(-1)['y'])
    }).slice(0,15)
    return result;
}

export default function TvlByChain() {
    // Retrieve the data
    const URL = "/api/tvlByChain";
    const { data, error } = useSWR(URL, fetcher)

    return (
        <div style={{height: "65vh", width: "90vw"}}>
            <h2>
                Compare the bridged TVL of Chains
            </h2>
            <p>
                “For a certain chain, across all bridges what is the TVL on that chain?” We count assets bridge <i>from</i> and <i>to</i> this chain.
            </p>
            {!error && data &&(
                <LineChart data={data}/>
            )}
        </div>
    )
}