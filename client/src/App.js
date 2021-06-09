import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Paste from './components/Paste/Paste';
import Navbar from './components/Navbar/Navbar';
import { AppBar, Button, Container, createMuiTheme, Paper, Tab, Tabs, ThemeProvider } from '@material-ui/core';

function App() {
  const [pastes, setPastes] = useState();
  useEffect(() => {
    axios.get('/all')
      .then(({ data }) => {
        console.log(data);
        setPastes(data)
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
  return (
    <ThemeProvider theme={theme} >
      <div id="App">
        <Navbar />
        {/* <AppBar position="static" color="secondary" className="navbar">{pastes?.length}<Tabs><Tab>all Pastes</Tab><Tab>Stats</Tab></Tabs></AppBar> */}
        {/* <img id="whale" src="/whaleScraper.png" /> */}
        <div id="analysis-div">
          <Paper id="analysis" elevation={3} >
            <h2 id="title">Statistics</h2>
            <p>Parses Count: {pastes ? pastes.length : "loader..."}</p>
          </Paper>
        </div>
        <div id="pastes-div">
          {(pastes && pastes?.map((paste, i) => <Paste key={i} paste={paste} />)) || "Not working yet"}
        </div>
      </div>
    </ThemeProvider >
  );
}

export default App;
