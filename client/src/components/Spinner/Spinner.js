import React from 'react'
require('./Spinner.css')
function Spinner() {
    return (
        <div class="container">
            <div id="spinner">
                <div class="spinner-item"></div>
                <div class="spinner-item"></div>
                <div class="spinner-item"></div>
                <div class="spinner-item"></div>
                <div class="spinner-item"></div>
            </div>
        </div>
    )
}

export default Spinner
