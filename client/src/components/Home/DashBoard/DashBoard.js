import React from 'react'

import Spinner from '../../Spinner/Spinner';
import {
    Chart,
    PieSeries,
    Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation, Stack } from '@devexpress/dx-react-chart';
import LinearWithValueLabel from '../../LinearProgressWithLabel/LinearProgressWithLabel'
import { Paper } from '@material-ui/core';

function DashBoard({ pastes, analytics }) {
    function prettyDate(date) {
        return new Date(date).toLocaleString().replace(',', '').slice(0, -6)
    }
    return (
        <div>
            <div id="analysis-div">
                {pastes?.length ?
                    <Paper id="analysis" elevation={3} >
                        <h2 id="title">Statistics</h2>
                        <LinearWithValueLabel value={(analytics?.generalData?.analysisCount / pastes?.length) * 100} />
                        <p> labels:{analytics?.labels}</p>
                        <p id="analysis-starting-date">gathering data from: {analytics ? prettyDate(analytics?.generalData?.analysisStartingDate) : null}</p>
                        {analytics?.pastesData[0]?.labels &&
                            <Chart
                                id="label-average-pie"
                                data={analytics?.generalData?.labelAverage}
                            >
                                <PieSeries
                                    name="labels"
                                    valueField="score"
                                    argumentField="label"
                                    innerRadius={0.5}
                                    outerRadius={1}
                                />
                                <Animation />
                                <Title text="Labels" position="bottom" />
                                <Stack
                                    stacks={[
                                        { series: ['Saudi Arabia', 'USA', 'Iran'] },
                                    ]}
                                />
                            </Chart>
                        }
                    </Paper>
                    :
                    <div className="loader" >
                        <Spinner />
                    </div>
                }
            </div>
        </div>
    )
}

export default DashBoard
