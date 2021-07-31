// import libraries
import React from 'react'

// import components
import DashBoard from './DashBoard/DashBoard';
import Pastes from './Pastes/Pastes';

function Home({ pastes, setPastes, analytics, setAnalytics }) {
    return (
        <div>
            <DashBoard pastes={pastes} setPastes={setPastes} analytics={analytics} setAnalytics={setAnalytics} />
            <Pastes pastes={pastes} />
        </div>
    )
}

export default Home
