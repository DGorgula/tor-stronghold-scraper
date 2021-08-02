import React from 'react'
require('./Spinner.css')
function Spinner() {
    return (
        <div className="container">
            <div id="spinner">
                <div className="spinner-item"></div>
                <div className="spinner-item"></div>
                <div className="spinner-item"></div>
                <div className="spinner-item"></div>
                <div className="spinner-item"></div>
            </div>
        </div>
    )
}

export default Spinner
