import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { Line } from 'react-chartjs-2';

function Climate() {

  let region1Data = [5,10,15,20,25,30,35,40,9,8,45,100];
  let region2Data = [12, 19, 3, 5, 2, 31, 2, 19, 3, 5, 2, 3];
  let region3Data = [112, 191, 13, 51, 12, 31, 12, 19, 3, 5, 2, 3];
  let region4Data = [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3];
  let region5Data = [1, 90, 39, 58, 28, 38, 128, 189, 38, 58, 28, 38];

  let regionsData = [region1Data, region2Data, region3Data, region4Data, region5Data];

  let region1 = {
    label: 'Region 1',
    data: region1Data,
    fill: false,
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor: 'rgba(255, 0, 0, 0.2)',
  };
  let region2 ={
    label: 'Region 2',
    data: region2Data,
    fill: false,
    backgroundColor: 'rgb(255, 127, 0)',
    borderColor: 'rgba(255, 127, 0, 0.2)',
  };
  let region3 = {
    label: 'Region 3',
    data: region3Data,
    fill: false,
    backgroundColor: 'rgb(255, 214, 0)',
    borderColor: 'rgba(212, 175, 0, 0.2)',
  };
  let region4 = {
    label: 'Region 4',
    data: region4Data,
    fill: false,
    backgroundColor: 'rgb(0, 255, 0)',
    borderColor: 'rgba(0, 255, 0, 0.2)',
  };
  let region5 = {
    label: 'Region 5',
    data: region5Data,
    fill: false,
    backgroundColor: 'rgb(0, 0, 255)',
    borderColor: 'rgba(0, 0, 255, 0.2)',
  };

  let displayedRegions = [region1,region2,region3,region4,region5];
  
  const [data, setData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: displayedRegions,
  });

  const options = {
    title: {
      display: true,
      text: 'Climate Accidents By Region'
    },

    scaleLabel:{
      display:true,
      labelString: 'Accident Count'
    },
    
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  const [checkboxes, setCheckboxes] = useState([
    { name: 'Region 1',
      checked: true
    },
    { name: 'Region 2',
      checked: true
    },
    { name: 'Region 3',
      checked: true
    },
    { name: 'Region 4',
      checked: true
    },
    { name: 'Region 5',
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
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: displayedRegions,
    });
    
  }
  
  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems="center"
    >
      <Grid item>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems="center"
        >
        <FormGroup>
          {checkboxes.map((checkbox, index)=>

            <FormControlLabel key={index} control={<Checkbox checked={checkbox.checked} onChange={handleRegionChange} name={index.toString()} color="primary"/>} label={checkbox.name}/>
          )}
        </FormGroup>
        </Grid>
      </Grid>
      <Container fixed >
        <Line data={data} options={options}/>
      </Container>
    </Grid>
  );
}

export default Climate;