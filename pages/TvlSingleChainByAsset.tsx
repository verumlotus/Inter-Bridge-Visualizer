import axios from "axios";
import { useEffect, useState } from "react";
import chainsJson from "../backendUtils/constants/chains.json";
import LineChart from "../components/LineChart";
import SearchBar from "../components/SearchBar";

const chains = chainsJson["chains"]

export default function TvlSingleChainByAsset() {
    let [chain, setChain] = useState("Ethereum")
    let [data, setData] = useState([]);

    const URL_PREFIX = "/api/chainTvlByAsset";
    useEffect(() => {
        async function fetcher(urlPrefix: string) {
            let url = `${urlPrefix}/${chain}`
            const response = await axios.get(url);
            // Sort to filter only by top 12 assets
            const result = response.data['assetTvlData'].sort((a, b) => {
                return Number(a['data'].at(-1)['y']) > Number(b['data'].at(-1)['y'])
            }).slice(0, 15)
            setData(result);
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

    return (
        <div style={{height: "65vh", width: "90vw"}}>
            <h2>
                Single Chain TVL By Asset. Current data is for {chain}
            </h2>
            <p>
                “For a certain chain, what is the breakdown of TVL by asset (across all bridges)?”
            </p>
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