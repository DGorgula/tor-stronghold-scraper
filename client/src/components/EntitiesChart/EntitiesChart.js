import Paper from '@material-ui/core/Paper';
import { useState, useEffect } from 'react';
import './EntitiesChart.css'
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
function EntitiesChart({ rawData }) {
    const [dataA, setDataA] = useState([])
    const entityCount = {};
    console.log(rawData);


    useEffect(() => {
        console.log("in the use effect");
        rawData?.forEach((entity, i) => {
            if (entityCount[entity.type]) {
                return entityCount[entity.type]++
            }
            entityCount[entity.type] = 1
            if (i === rawData.length - 1) {

                for (let j = 0; j < rawData.length; j++) {
                    dataA[j] = { text: entityCount, count: entityCount[j] }
                    console.log(j, entityCount[j]);
                }
                console.log(dataA);
                // setDataA([...dataA])
            }
        })
    }, [])


    console.log(dataA);

    const data = [
        { text: 'ORG', count: 2 },
        { text: 'ORG', count: 2 },
        { text: 'ORG', count: 2 },
        { text: 'ORG', count: 2 },
        { text: 'ORG', count: 2 },

    ];

    return (
        <Paper id="classification-chart">
            <Chart
                data={data}
            >
                <ArgumentAxis />
                <ValueAxis max={7} />

                <BarSeries
                    valueField="population"
                    argumentField="year"
                />
                <Title text="World population" />
                <Animation />
            </Chart>
        </Paper>
    );
}

export default EntitiesChart
