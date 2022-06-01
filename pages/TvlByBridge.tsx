import axios from "axios";
import useSWR from "swr";
import LineChart from "../components/LineChart";

async function fetcher(url: string) {
    const response = await axios.get(url);
    // Change "bridge" key to "id" to satisfy nivo
    for (const bridgeInfo of response.data) {
        bridgeInfo['id'] = bridgeInfo['bridge']
        delete bridgeInfo['bridge']
    }
    return response.data;
}

export default function TvlByBridge() {
    // Retrieve the data
    const URL = "/api/tvlByBridge";
    const { data, error } = useSWR(URL, fetcher)

    return (
        <div style={{height: "65vh", width: "90vw"}}>
            <h2>
                Compare the TVL of bridges
            </h2>
            <p>
                “How do bridges compare to each other in terms of TVL (across all chains and all assets)?
            </p>
            {!error && data &&(
                <LineChart data={data}/>
            )}
        </div>
    )
}