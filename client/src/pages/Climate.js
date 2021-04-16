import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { defaultTable, constSet, callAPI } from '../api-functions.js'
import { Line } from 'react-chartjs-2';
import { MuiThemeProvider } from '@material-ui/core';

function Climate() {
  const regionLabels = ['Latitudes 25°N - 30°N', 'Latitudes 30°N - 35°N', 'Latitudes 35°N - 40°N', 'Latitudes 40°N - 45°N', 'Latitudes 45°N - 50°N'];
  const graphLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const queryNumber = 2
  const [regionsData, setRegionsData] = useState([])

  useEffect(() => {
    const fetchData = async function() {
      let tempArray = []

      for (var i = 0; i < constSet[queryNumber].length; i++) {
        let payload = {
          "number": queryNumber,
          "vars": constSet[queryNumber][i]
        }

        let tempDict = await callAPI(payload)
        tempArray[i] = tempDict["1"]["ACCIDENT_COUNT"]
        console.log(tempArray[i])
      }

      setRegionsData(tempArray)
      updateGraph(checkboxes, tempArray)

      setData({
        labels: graphLabels,
        datasets: displayedRegions,
      });
    }

    fetchData()
  }, []);  

  let region1 = {
    label: regionLabels[0],
    data: regionsData[0],
    fill: false,
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor: 'rgba(255, 0, 0, 0.2)',
  };
  let region2 ={
    label: regionLabels[1],
    data: regionsData[1],
    fill: false,
    backgroundColor: 'rgb(255, 127, 0)',
    borderColor: 'rgba(255, 127, 0, 0.2)',
  };
  let region3 = {
    label: regionLabels[2],
    data: regionsData[2],
    fill: false,
    backgroundColor: 'rgb(255, 214, 0)',
    borderColor: 'rgba(212, 175, 0, 0.2)',
  };
  let region4 = {
    label: regionLabels[3],
    data: regionsData[3],
    fill: false,
    backgroundColor: 'rgb(0, 255, 0)',
    borderColor: 'rgba(0, 255, 0, 0.2)',
  };
  let region5 = {
    label: regionLabels[4],
    data: regionsData[4],
    fill: false,
    backgroundColor: 'rgb(0, 0, 255)',
    borderColor: 'rgba(0, 0, 255, 0.2)',
  };

  let displayedRegions = [region1,region2,region3,region4,region5];
  
  const [data, setData] = useState({
    labels: graphLabels,
    datasets: displayedRegions,
  });

  const options = {

    title: {
      display: true,
      text: 'Accident Count By Climate Regions'
    },

    legend: {
        onClick: () => {}
    },
    
    scales: {
      xAxes: [
        {
          scaleLabel:{
            display:true,
            labelString: 'Month Of Year'
          },
        },
      ],
      yAxes: [
        {
          scaleLabel:{
            display:true,
            labelString: 'Accident Count'
          },

          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  const [checkboxes, setCheckboxes] = useState([
    { name: regionLabels[0],
      checked: true
    },
    { name: regionLabels[1],
      checked: true
    },
    { name: regionLabels[2],
      checked: true
    },
    { name: regionLabels[3],
      checked: true
    },
    { name: regionLabels[4],
      checked: true
    },
  ]);

  function updateGraph(regions, dataArray) {
    regions.forEach((region, index) => {
      displayedRegions[index]['data'] = region['checked'] ? dataArray[index] : [];
    });
  }

  function handleRegionChange(event) {
    let temp = checkboxes;
    temp[parseInt(event.target.name)]['checked'] = event.target.checked;
    setCheckboxes(temp);
    updateGraph(temp, regionsData);
    
    setData({
      labels: graphLabels,
      datasets: displayedRegions,
    });
  }
  
  return (
    //check if useeffect has passed
    // regionsData.length ?
    // or regionsData[0].length depending on implementation

    <div>

      <h1>What Are the Effects of Climate on Auto Accidents?</h1>
    
      <Grid container direction='row' justify='center' alignItems="center">
        <Grid item>
          <FormGroup>
            {checkboxes.map((checkbox, index)=>
              <FormControlLabel key={index} control={<Checkbox checked={checkbox.checked} onChange={handleRegionChange} name={index.toString()} color="primary"/>} label={checkbox.name}/>
            )}
          </FormGroup> 
        </Grid>

        <Grid item xs={6}>
            <Line data={data} options={options}/>
        </Grid>
        
      </Grid>
    </div>
    // : <div></div>
  );
}

export default Climate;