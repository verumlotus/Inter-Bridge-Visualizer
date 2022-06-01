import axios from "axios";
import { useEffect, useState } from "react";
import chainsJson from "../backendUtils/constants/chains.json";
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

    return (
        <div style={{height: "65vh", width: "90vw"}}>
            <h2>
                Single Chain TVL By Bridge. Current data is for {chain}
            </h2>
            <p>
                “For a certain chain, what is the TVL per bridge for that chain?” 
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