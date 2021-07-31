import React, { useState } from 'react'
import Paste from '../../Paste/Paste';
import StickyHeadTable from '../../StickyHeadTable/StickyHeadTable'



function Pastes({ pastes }) {
    return (
        <div>
            {pastes?.length
                ? <div id="pastes-div">
                    {/* {pastes?.map((paste, i) => <Paste key={i} paste={paste} />)} */}
                    {(pastes && <StickyHeadTable data={pastes} titles={["Author", "Title", "Content", "Views", "Date"]} />) || "Not working yet"}
                </div>
                : null}
        </div>
    )
}

export default Pastes
