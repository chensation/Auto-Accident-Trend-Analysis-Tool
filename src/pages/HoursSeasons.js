import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { Line } from 'react-chartjs-2';

function HoursSeasons() {

  let winterData = [5,10,15,20,25,30,35,40,9,8,45,100,5,10,15,20,25,30,35,40,9,8,45,100];
  let springData = [12, 19, 3, 5, 2, 31, 2, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 31, 2, 19, 3, 5, 2, 3];
  let summerData = [112, 191, 13, 51, 12, 31, 12, 19, 3, 5, 2, 3,112, 191, 13, 51, 12, 31, 12, 19, 3, 5, 2, 3];
  let fallData = [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3];

  let durationData = [winterData, springData, summerData, fallData];
  let countData = [winterData, springData, summerData, fallData];

  let xlabel = ['12am', '1am', '2am', '3am', '4am', '5am', '6am','7am', '8am', '9am', '10am', '11am', '12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm'];

  let winterDuration = {
    label: 'Winter',
    data: winterData,
    fill: false,
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor: 'rgba(255, 0, 0, 0.2)',
  };
  let winterCount = {
    label: 'Winter',
    data: winterData,
    fill: false,
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor: 'rgba(255, 0, 0, 0.2)',
  }; 

  let springDuration ={
    label: 'Spring',
    data: springData,
    fill: false,
    backgroundColor: 'rgb(255, 127, 0)',
    borderColor: 'rgba(255, 127, 0, 0.2)',
  };
  let springCount ={
    label: 'Spring',
    data: springData,
    fill: false,
    backgroundColor: 'rgb(255, 127, 0)',
    borderColor: 'rgba(255, 127, 0, 0.2)',
  };

  let summerDuration = {
    label: 'Summer',
    data: summerData,
    fill: false,
    backgroundColor: 'rgb(255, 214, 0)',
    borderColor: 'rgba(212, 175, 0, 0.2)',
  };
  let summerCount = {
    label: 'Summer',
    data: summerData,
    fill: false,
    backgroundColor: 'rgb(255, 214, 0)',
    borderColor: 'rgba(212, 175, 0, 0.2)',
  };

  let fallDuration = {
    label: 'Fall',
    data: fallData,
    fill: false,
    backgroundColor: 'rgb(0, 255, 0)',
    borderColor: 'rgba(0, 255, 0, 0.2)',
  };
  let fallCount = {
    label: 'Fall',
    data: fallData,
    fill: false,
    backgroundColor: 'rgb(0, 255, 0)',
    borderColor: 'rgba(0, 255, 0, 0.2)',
  };
  
  let displayedSeasonsDuration =[winterDuration,springDuration,summerDuration,fallDuration];
  let displayedSeasonsCount =[winterCount,springCount,summerCount,fallCount];

  const durationOptions = {
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

  const countOptions = {
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

  const [durationGraphData, setDurationGraphData] = useState({
    labels:  xlabel,
    datasets: displayedSeasonsDuration,
  });

  const [countGraphData, setCountGraphData]=useState({
    labels: xlabel,
    datasets: displayedSeasonsCount,
  });

  const [checkboxes, setCheckboxes] = useState([
    { name: 'Winter',
      checked: true
    },
    { name: 'Spring',
      checked: true
    },
    { name: 'Summer',
      checked: true
    },
    { name: 'Fall',
      checked: true
    }
  ]);

 

  function updateGraphs(seasons){
    seasons.forEach((season, index) => {
      displayedSeasonsDuration[index]['data'] = season['checked'] ? durationData[index] : [];
      displayedSeasonsCount[index]['data'] = season['checked'] ? countData[index] : [];
    });
  }

  function handleSeasonChange(event) {
    let temp = checkboxes;
    temp[parseInt(event.target.name)]['checked'] = event.target.checked;
    setCheckboxes(temp);
    updateGraphs(temp);
    
    setDurationGraphData({
      labels: xlabel,
      datasets: displayedSeasonsDuration,
    });

    setCountGraphData({
      labels: xlabel,
      datasets: displayedSeasonsCount,
    });
    
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
            {checkboxes.map((checkbox, index)=>

              <FormControlLabel key={index} control={<Checkbox checked={checkbox.checked} onChange={handleSeasonChange} name={index.toString()} color="primary"/>} label={checkbox.name}/>
            )}
        </FormGroup>
        </Grid>
      </Grid>
    
    
      <Container>
        <Line data={durationGraphData} options={durationOptions}/>
      </Container>
      

      <Container>
        <Line data={countGraphData} options={countOptions}/>
      </Container>
    
    </Grid>
  );
}

export default HoursSeasons;