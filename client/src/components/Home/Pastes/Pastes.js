import React from 'react'
import StickyHeadTable from '../DashBoard/StickyHeadTable/StickyHeadTable'



function Pastes({ pastes }) {
    return (
        <div>
            {pastes?.length
                ? <div id="pastes-div">
                    {(pastes && <StickyHeadTable data={pastes} titles={["Author", "Title", "Content", "Views", "Date"]} />) || "Not working yet"}
                </div>
                : null}
        </div>
    )
}

export default Pastes
