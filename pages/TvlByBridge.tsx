import axios from "axios";
import useSWR from "swr";
import LineChart from "../components/LineChart";

async function fetcher(url: string) {
    const response = await axios.get(url);
    // Change "bridge" key to "id" to satisfy nivo
    for (const bridgeInfo of response.data) {
        bridgeInfo['id'] = bridgeInfo['bridge']
        delete bridgeInfo['bridge']
        bridgeInfo.data.map((xYinfo) => {
            xYinfo['x'] = xYinfo['x'].toString()
        })
    }
    console.log(response.data)
    return response.data;
}

export default function TvlByBridge() {
    // Retrieve the data
    const URL = "/api/tvlByBridge";
    const { data, error } = useSWR(URL, fetcher)
    console.log(`Data is ${data}`)

    return (
        <div style={{height: "55vh", width: "90vw"}}>
            <h2>
                Compare the TVL of bridges
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