import axios from "axios";
import { useEffect, useState } from "react";
import assetsJson from "../backendUtils/constants/assets.json";
import LineChart from "../components/LineChart";
import SearchBar from "../components/SearchBar";

const assets = assetsJson["assets"]

export default function TvlSingleAssetByChain() {
    let [asset, setAsset] = useState("USDC")
    let [data, setData] = useState([]);

    const URL_PREFIX = "/api/assetTvlByChain";
    useEffect(() => {
        async function fetcher(urlPrefix: string) {
            let url = `${urlPrefix}/${asset}`
            const response = await axios.get(url);
            // Sort to filter only by top 12 assets
            const result = response.data['chainTvlData'].sort((a, b) => {
                return Number(a['data'].at(-1)['y']) > Number(b['data'].at(-1)['y'])
            }).slice(0, 15)
            setData(result);
        }
        if (asset) {
            fetcher(URL_PREFIX);
        }
    }, [asset])

    function onSearchSubmit(value: string) {
        if (value) {
            setAsset(value);
        }
    }

    return (
        <div style={{height: "65vh", width: "90vw"}}>
            <h2>
                Single Asset TVL By Chain. Current data is for {asset}
            </h2>
            <p>
                “For a certain asset, what chains is that asset being bridge from/to?”
            </p>
            <SearchBar
                options={assets}
                onSubmitFn={onSearchSubmit}
            />
            {data &&(
                <LineChart data={data}/>
            )}
        </div>
    )
}