import React, {useState, useEffect} from 'react';
import './App.css';
import NavBar from './components/NavBar';
import {defaults} from 'react-chartjs-2';

const test_payload = {
		"number": 5,
		"vars": null
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors',
    cache: 'default', // chan ge to force-cache
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data)
  });

  return response.json();
}

function App() {
  defaults.global.defaultFontSize = 16;

  const [apiResponse, setApiResponse] = useState("");

  const callAPI = () => {
    postData("http://localhost:9000/query", test_payload)
        .then(res => setApiResponse(res));
  }  

  useEffect(()=>{
    callAPI()
  }, []);

  return (
    <div className="App">
      <p className="App-intro">{apiResponse}</p>
      <NavBar></NavBar>
    </div>
  );
}

export default App;