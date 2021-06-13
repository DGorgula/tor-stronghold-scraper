import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Paste from './components/Paste/Paste';
import Navbar from './components/Navbar/Navbar';
import LinearWithValueLabel from './components/LinearProgressWithLabel/LinearProgressWithLabel'
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
              {console.log(analytics?.generalData.analysisCount)}
              {/*  */}
              <LinearWithValueLabel value={(analytics?.generalData.analysisCount / pastes?.length) * 100} />
              <p>labels:{analytics?.labels}</p>
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
                  <Title text="label" position="bottom" />
                </Chart>
              }
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
