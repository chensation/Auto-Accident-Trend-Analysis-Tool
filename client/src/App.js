import React, {useState, useEffect} from 'react';
import './App.css';
import NavBar from './components/NavBar';
import {defaults} from 'react-chartjs-2';

function App() {

  defaults.global.defaultFontSize = 16;

  const [apiResponse, setApiResponse] = useState("");

  const callAPI = () => {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => setApiResponse(res));
  }

  
  useEffect(()=>{
    callAPI()
  });
  return (
    <div className="App">
      <p className="App-intro">{apiResponse}</p>
      <NavBar></NavBar>
    </div>
  );
}

export default App;
