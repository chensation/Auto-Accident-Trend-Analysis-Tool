import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { Line } from 'react-chartjs-2';

function HoursSeasons() {
  let winter = {
    label: 'Winter',
    data: [5,10,15,20,25,30,35,40,9,8,45,100,5,10,15,20,25,30,35,40,9,8,45,100],
    fill: false,
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor: 'rgba(255, 0, 0, 0.2)',
  };
  let spring ={
    label: 'Spring',
    data: [12, 19, 3, 5, 2, 31, 2, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 31, 2, 19, 3, 5, 2, 3],
    fill: false,
    backgroundColor: 'rgb(255, 127, 0)',
    borderColor: 'rgba(255, 127, 0, 0.2)',
  };
  let summer = {
    label: 'Summer',
    data: [112, 191, 13, 51, 12, 31, 12, 19, 3, 5, 2, 3,112, 191, 13, 51, 12, 31, 12, 19, 3, 5, 2, 3],
    fill: false,
    backgroundColor: 'rgb(255, 214, 0)',
    borderColor: 'rgba(212, 175, 0, 0.2)',
  };
  let fall = {
    label: 'Fall',
    data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
    fill: false,
    backgroundColor: 'rgb(0, 255, 0)',
    borderColor: 'rgba(0, 255, 0, 0.2)',
  };
  
  
  let seasons =[winter,spring,summer,fall];

  const data={
    labels:  ['12am', '1am', '2am', '3am', '4am', '5am', '6am','7am', '8am', '9am', '10am', '11am', '12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm'],
    datasets: seasons,
  };

  const options = {
    title: {
      display: true,
      text: 'Accident Duration'
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

  const data2={
    labels:  ['12am', '1am', '2am', '3am', '4am', '5am', '6am','7am', '8am', '9am', '10am', '11am', '12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm'],
    datasets: seasons,
  };

  const options2 = {
    title: {
      display: true,
      text: 'Accident Distance'
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
  
  
  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems="stretch"
    >
    <Grid item>
    <Grid
      container
      direction='column'
    >
    <FormGroup>
    <FormControlLabel control={<Checkbox  name="checked1" color="primary"/>} label='Winter'/>
    <FormControlLabel control={<Checkbox  name="checked2" color="primary"/>} label='Spring'/>
    <FormControlLabel control={<Checkbox  name="checked3" color="primary"/>} label='Summer'/>
    <FormControlLabel control={<Checkbox  name="checked4" color="primary"/>} label='Fall'/>
    </FormGroup>
    </Grid>
    </Grid>
    
    
    <Container>
    <Line data={data} options={options}/>
    </Container>
    

    <Container>
    <Line data={data2} options={options2}/>
    </Container>
    
    </Grid>
  );
}

export default HoursSeasons;