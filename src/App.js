import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import {defaults} from 'react-chartjs-2';

function App() {

  defaults.global.defaultFontSize = 16;

  return (
    <div className="App">
      <NavBar></NavBar>
    </div>
  );
}

export default App;
