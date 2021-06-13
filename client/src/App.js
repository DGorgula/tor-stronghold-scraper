import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Paste from './components/Paste/Paste';
import Navbar from './components/Navbar/Navbar';

import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

import { AppBar, Button, Container, createMuiTheme, Paper, Tab, ThemeProvider } from '@material-ui/core';
import Spinner from './components/Spinner/Spinner';

function App() {
  const [pastes, setPastes] = useState();
  const [analytics, setAnalytics] = useState();
  useEffect(() => {
    axios.get('http://localhost:3005/all')
      .then(({ data }) => {
        console.log(data);
        setPastes(data.pastes)
        setAnalytics(data.dataAnalysis)
      })
      .catch(console.log)
  }, [])

  const theme = createMuiTheme({
    palette: {
      primary: {
        background: '#eae2b7',
        main: '#fcbf49'
      },
      secondary: {
        main: '#003049'
      },
      text: {
        primary: '#003049',
        secondary: '#d62828'
      }
    }
  });

  function prettyDate(date) {
    return new Date(date).toLocaleString().replace(',', '').slice(0, -6)
  }

  return (
    <ThemeProvider theme={theme} >
      <div id="App">
        <Navbar />
        {/* <AppBar position="static" color="secondary" className="navbar">{pastes?.length}<Tabs><Tab>all Pastes</Tab><Tab>Stats</Tab></Tabs></AppBar> */}
        {/* <img id="whale" src="/whaleScraper.png" /> */}
        <div id="analysis-div">
          {pastes?.length ?
            <Paper id="analysis" elevation={3} >
              <h2 id="title">Statistics</h2>
              <p>Total Parses: {pastes?.length}</p>
              <p>Total Parses Analyzied: {analytics?.generalData.analysisCount}</p>
              <p>labels:{analytics?.labels}</p>
              <p id="analysis-starting-date">gathering data from: {analytics ? prettyDate(analytics?.generalData?.analysisStartingDate) : null}</p>
              {/* <Paper>
                <Chart
                  data={analytics?.pastesData[0].labels}
                >
                  <PieSeries
                    valueField="val"
                    argumentField="region"
                    innerRadius={0.6}
                  />
                  <Title
                    text="The Population of Continents and Regions"
                  />
                  <Animation />
                </Chart>
              </Paper> */}
            </Paper>
            :
            <div className="loader" >
              <Spinner />

            </div>
          }
        </div>
        {pastes?.length ?
          <div id="pastes-div">
            {(pastes && pastes?.map((paste, i) => <Paste key={i} paste={paste} />)) || "Not working yet"}
          </div> : null}
      </div>
    </ThemeProvider >
  );
}

export default App;
