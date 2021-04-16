import React, {useState, useEffect} from 'react';
import './App.css';
import NavBar from './components/NavBar';
import {defaults} from 'react-chartjs-2';

function App() {
  defaults.global.defaultFontSize = 16;

  // const [apiResponse, setApiResponse] = useState("");

  // const callAPI = () => {
  //   postData("http://localhost:9000/query", test_payload)
  //       .then(res => setApiResponse(res));
  // }  

  // useEffect(()=>{
  //   callAPI()
  // }, []);

  return (
    <div className="App">
      <NavBar></NavBar>
    </div>
  );
}

export default App;
