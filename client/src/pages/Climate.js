import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { test_payload, callAPI } from '../api-functions.js'
import { Line } from 'react-chartjs-2';

function Climate() {

  const regionLabels = ['Latitudes 25°N - 30°N', 'Latitudes 30°N - 35°N', 'Latitudes 35°N - 40°N', 'Latitudes 40°N - 45°N', 'Latitudes 45°N - 50°N'];
  const graphLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let region1Data = [5,10,15,20,25,30,35,40,9,8,45,100];
  let region2Data = [12, 19, 3, 5, 2, 31, 2, 19, 3, 5, 2, 3];
  let region3Data = [112, 191, 13, 51, 12, 31, 12, 19, 3, 5, 2, 3];
  let region4Data = [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3];
  let region5Data = [1, 90, 39, 58, 28, 38, 128, 189, 38, 58, 28, 38];

  useEffect(() => {
    callAPI(test_payload)
  }, []);

  let regionsData = [region1Data, region2Data, region3Data, region4Data, region5Data];

  let region1 = {
    label: regionLabels[0],
    data: region1Data,
    fill: false,
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor: 'rgba(255, 0, 0, 0.2)',
  };
  let region2 ={
    label: regionLabels[1],
    data: region2Data,
    fill: false,
    backgroundColor: 'rgb(255, 127, 0)',
    borderColor: 'rgba(255, 127, 0, 0.2)',
  };
  let region3 = {
    label: regionLabels[2],
    data: region3Data,
    fill: false,
    backgroundColor: 'rgb(255, 214, 0)',
    borderColor: 'rgba(212, 175, 0, 0.2)',
  };
  let region4 = {
    label: regionLabels[3],
    data: region4Data,
    fill: false,
    backgroundColor: 'rgb(0, 255, 0)',
    borderColor: 'rgba(0, 255, 0, 0.2)',
  };
  let region5 = {
    label: regionLabels[4],
    data: region5Data,
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

  function updateGraph(regions){
    regions.forEach((region, index) => {
      displayedRegions[index]['data'] = region['checked'] ? regionsData[index] : [];
    });
  }

  function handleRegionChange(event) {
    let temp = checkboxes;
    temp[parseInt(event.target.name)]['checked'] = event.target.checked;
    setCheckboxes(temp);
    updateGraph(temp);
    
    setData({
      labels: graphLabels,
      datasets: displayedRegions,
    });
    
  }
  
  return (
    //check if useeffect has passed
    regionsData.length ?
    // or regionsData[0].length depending on implementation

    <div>

      <h1>What Are The Effects Of Climate On Auto Accidents?</h1>
    
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
    : <div></div>
  );
}

export default Climate;