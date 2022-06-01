import axios from "axios";
import useSWR from "swr";
import {ResponsiveLine} from "@nivo/line"
import moment from "moment"

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
            {!error && data && (
                <ResponsiveLine 
                    data={data}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ 
                        type: 'time',
                        format: '%s',
                    }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: false,
                        reverse: false
                    }}
                    yFormat={">+.2g"}
                    colors={{ scheme: "category10" }}
                    enableArea={true}
                    enablePoints={false}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        format: function(value: Date){ 
                            return `${value.toLocaleString('default', { month: 'long' }).slice(0,3)} ${value.getFullYear()}`
                        },
                        tickValues: 2,
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Time',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        format: function(value: number) {
                            return Math.round(value / 1e6)
                        },
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'USD (Million)',
                        legendOffset: -50,
                        legendPosition: 'middle'
                    }}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}   
                />
            )}
        </div>
    )
}