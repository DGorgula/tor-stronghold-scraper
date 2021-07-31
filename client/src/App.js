// import libraries
import { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import axios from 'axios';
// import components
import Navbar from './components/Navbar/Navbar';
import EntitiesChart from './components/EntitiesChart/EntitiesChart'
import Home from './components/Home/Home'
import Stats from './components/Stats/Stats'
// import css
import './App.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';

function App(props) {
  // const history = useHistory();

  const [pastes, setPastes] = useState();
  const [analytics, setAnalytics] = useState();
  useEffect(() => {
    axios.get('http://localhost:3005/all')
      .then(({ data }) => {
        console.log(data);
        const pastes = data.pastes.map(p => {
          p.rawDate = p.date;
          p.date = new Date(`${p.date}`).toLocaleString();
          console.log(p);
          return p;
        })
        setPastes(pastes)
        setAnalytics(data.dataAnalysis)
      })
      .catch(console.log)
  }, [])
  console.log(props);
  // if (path) return props.history.push(path);
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
        <Switch>
          <Route exact path="/">
            <Home pastes={pastes} setPastes={setPastes} analytics={analytics || null} setAnalytics={setAnalytics} />
          </Route>
          <Route exact path="/stats" >
            <Stats rawData={analytics?.generalData?.allEntities} />
          </Route>
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>

      </div>

    </ThemeProvider >
  );
}

export default App;
