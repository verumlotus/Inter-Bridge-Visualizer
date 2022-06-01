import axios from "axios";
import { useEffect, useState } from "react";
import * as chainsJson from "../backendUtils/constants/chains.json";
import LineChart from "../components/LineChart";
import SearchBar from "../components/SearchBar";

const chains = chainsJson["chains"]

export default function TvlSingleChainByBridge() {
    let [chain, setChain] = useState("Ethereum")
    let [data, setData] = useState([]);

    const URL_PREFIX = "/api/chainTvlByBridge";
    useEffect(() => {
        async function fetcher(urlPrefix: string) {
            let url = `${urlPrefix}/${chain}`
            const response = await axios.get(url);
            setData(response.data['bridgeTvlData']);
        }
        if (chain) {
            fetcher(URL_PREFIX);
        }
    }, [chain])

    function onSearchSubmit(value: string) {
        if (value) {
            setChain(value);
        }
    }

    // Retrieve the data
    // const { data, error } = useSWR(URL, fetcher)

    return (
        <div style={{height: "65vh", width: "90vw"}}>
            <h2>
                Single Chain TVL By Bridge. Current data is for {chain}
            </h2>
            <p>
                Explanation of what questions this can answer go here!
            </p>
            {/* <h3>
                Current data is for {chain}
            </h3> */}
            <SearchBar
                options={chains}
                onSubmitFn={onSearchSubmit}
            />
            {data &&(
                <LineChart data={data}/>
            )}
        </div>
    )
}