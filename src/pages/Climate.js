import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { Line } from 'react-chartjs-2';

function Climate() {
  let region1 = {
    label: 'Region 1',
    data: [5,10,15,20,25,30,35,40,9,8,45,100],
    fill: false,
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor: 'rgba(255, 0, 0, 0.2)',
  };
  let region2 ={
    label: 'Region 2',
    data: [12, 19, 3, 5, 2, 31, 2, 19, 3, 5, 2, 3],
    fill: false,
    backgroundColor: 'rgb(255, 127, 0)',
    borderColor: 'rgba(255, 127, 0, 0.2)',
  };
  let region3 = {
    label: 'Region 3',
    data: [112, 191, 13, 51, 12, 31, 12, 19, 3, 5, 2, 3],
    fill: false,
    backgroundColor: 'rgb(255, 214, 0)',
    borderColor: 'rgba(212, 175, 0, 0.2)',
  };
  let region4 = {
    label: 'Region 4',
    data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
    fill: false,
    backgroundColor: 'rgb(0, 255, 0)',
    borderColor: 'rgba(0, 255, 0, 0.2)',
  };
  let region5 = {
    label: 'Region 5',
    data: [1, 90, 39, 58, 28, 38, 128, 189, 38, 58, 28, 38],
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

  const [state, setState] = useState({
    checked1: true,
    checked2: true,
    checked3: true,
    checked4: true,
    checked5: true,
  });

  function checkDisplayedRegions(){
    if(state.checked1 === true){
      displayedRegions[0] = region1;
    }
    else{
      displayedRegions[0]={};
    }
    if(state.checked2 === true){
      displayedRegions[1] = region2;
    }
    else{
      displayedRegions[1]={};
    }
    if(state.checked3 === true){
      displayedRegions[2] = region3;
    }
    else{
      displayedRegions[2] = {};
    }
    if(state.checked4 === true){
      displayedRegions[3] = region4;
    }
    else{
      displayedRegions[3] = {};
    }
    if(state.checked5 === true){
      displayedRegions[4] = region5;
    }
    else{
      displayedRegions[4] = {};
    }
  }

  function displayRegions(event) {
    setState({ ...state, [event.target.name]: event.target.checked });
    checkDisplayedRegions();
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
    <FormControlLabel control={<Checkbox checked={state.checked1} onChange={displayRegions} name="checked1" color="primary"/>} label='Region 1'/>
    <FormControlLabel control={<Checkbox checked={state.checked2} onChange={displayRegions} name="checked2" color="primary"/>} label='Region 2'/>
    <FormControlLabel control={<Checkbox checked={state.checked3} onChange={displayRegions} name="checked3" color="primary"/>} label='Region 3'/>
    <FormControlLabel control={<Checkbox checked={state.checked4} onChange={displayRegions} name="checked4" color="primary"/>} label='Region 4'/>
    <FormControlLabel control={<Checkbox checked={state.checked5} onChange={displayRegions} name="checked5" color="primary"/>} label='Region 5'/>
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