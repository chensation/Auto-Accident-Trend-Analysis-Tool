import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import {defaults} from 'react-chartjs-2';

function App() {
	// constructor(props) {
	//     super(props);
	//     this.state = { apiResponse: "" };
	// }

	// callAPI() {
	//     fetch("http://localhost:9000/testAPI")
	//         .then(res => res.text())
	//         .then(res => this.setState({ apiResponse: res }));
	// }

	// componentWillMount() {
	//     this.callAPI();
	// }	

  defaults.global.defaultFontSize = 16;

  	return (
    <div className="App">
      <NavBar></NavBar>
    </div>
  );
}

export default App;
