import { Paper } from '@material-ui/core'
import React, { useState } from 'react'
import './Stats.css';

import EntitiesChart from './EntitiesChart/EntitiesChart'
import LabelsChart from './LabelsChart/LabelsChart';
import DetailedLabelChart from './DetailedLabelChart/DetailedLabelChart';

function Stats({ allData }) {
    const [hoveredChartState, setHoveredChartState] = useState(null);
    const highestScores = allData?.generalData?.highestLabelScores;
    const lowestScores = allData?.generalData?.lowestLabelScores;
    const averageScores = allData?.generalData?.labelAverage;
    return (
        <div className="stats-wrapper">
            <Paper className="stats">
                <EntitiesChart rawData={allData?.generalData?.allEntities} displayChart={setHoveredChartState} />
                {highestScores && lowestScores && averageScores && <LabelsChart rawData={[...highestScores, ...averageScores, ...lowestScores]} displayChart={setHoveredChartState} />}
                <DetailedLabelChart rawData={allData?.pastesData} displayChart={setHoveredChartState} />
            </Paper>
            {hoveredChartState && <Paper className="chosen-stats" elevation={5}>{hoveredChartState} </Paper>}
        </div>
    )
}

export default Stats
