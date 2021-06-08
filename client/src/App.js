import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Paste from './components/Paste/Paste';
import { Button } from '@material-ui/core';

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
  return (
    <div id="App">
      <nav><ul><li><Button className="nav-button">all Pastes</Button></li><li><Button className="nav-button">Stats</Button></li></ul></nav>
      {(pastes && pastes?.map((paste, i) => <Paste key={i} paste={paste} />)) || "Not working yet"}
    </div>
  );
}

export default App;
