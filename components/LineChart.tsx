import {ResponsiveLine} from "@nivo/line"

export default function LineChart(props: {data: any}){
    let {data = null} = props;
    return (
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
            yFormat={">.2~g"}
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
            // useMesh={true}
            enableSlices={"x"}
            isInteractive={true}
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
    );
}