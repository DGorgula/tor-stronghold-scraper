import React from 'react'

import EntitiesChart from '../EntitiesChart/EntitiesChart'

function Stats({ rawDatam }) {
    return (
        <div>
            <EntitiesChart rawDatam={rawDatam} />
        </div>
    )
}

export default Stats
