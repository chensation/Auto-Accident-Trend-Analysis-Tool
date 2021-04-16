import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { test_payload, callAPI } from '../api-functions.js'
import { Line } from 'react-chartjs-2';

function HoursSeasons() {

  const seasonLabels = ['Winter', 'Spring', 'Summer', 'Fall'];
  const graphLabels = ['12am', '1am', '2am', '3am', '4am', '5am', '6am','7am', '8am', '9am', '10am', '11am', '12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm'];

  let winterData = [5,10,15,20,25,30,35,40,9,8,45,100,5,10,15,20,25,30,35,40,9,8,45,100];
  let springData = [12, 19, 3, 5, 2, 31, 2, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 31, 2, 19, 3, 5, 2, 3];
  let summerData = [112, 191, 13, 51, 12, 31, 12, 19, 3, 5, 2, 3,112, 191, 13, 51, 12, 31, 12, 19, 3, 5, 2, 3];
  let fallData = [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3];

  useEffect(async () => {
    var postData = await callAPI(test_payload)
    console.log(postData)
  }, []);  

  let durationData = [winterData, springData, summerData, fallData];
  let distData = [winterData, springData, summerData, fallData];

  let winterDuration = {
    label: seasonLabels[0],
    data: winterData,
    fill: false,
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor: 'rgba(255, 0, 0, 0.2)',
  };
  let winterDist = {
    label: seasonLabels[0],
    data: winterData,
    fill: false,
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor: 'rgba(255, 0, 0, 0.2)',
  }; 

  let springDuration ={
    label: seasonLabels[1],
    data: springData,
    fill: false,
    backgroundColor: 'rgb(255, 127, 0)',
    borderColor: 'rgba(255, 127, 0, 0.2)',
  };
  let springDist ={
    label: seasonLabels[1],
    data: springData,
    fill: false,
    backgroundColor: 'rgb(255, 127, 0)',
    borderColor: 'rgba(255, 127, 0, 0.2)',
  };

  let summerDuration = {
    label: seasonLabels[2],
    data: summerData,
    fill: false,
    backgroundColor: 'rgb(255, 214, 0)',
    borderColor: 'rgba(212, 175, 0, 0.2)',
  };
  let summerDist = {
    label: seasonLabels[2],
    data: summerData,
    fill: false,
    backgroundColor: 'rgb(255, 214, 0)',
    borderColor: 'rgba(212, 175, 0, 0.2)',
  };

  let fallDuration = {
    label: seasonLabels[3],
    data: fallData,
    fill: false,
    backgroundColor: 'rgb(0, 255, 0)',
    borderColor: 'rgba(0, 255, 0, 0.2)',
  };
  let fallDist = {
    label: seasonLabels[3],
    data: fallData,
    fill: false,
    backgroundColor: 'rgb(0, 255, 0)',
    borderColor: 'rgba(0, 255, 0, 0.2)',
  };
  
  let displayedSeasonsDuration =[winterDuration,springDuration,summerDuration,fallDuration];
  let displayedSeasonsDist =[winterDist,springDist,summerDist,fallDist];

  const durationOptions = {
    title: {
      display: true,
      text: 'Average Accident Duration By Seasons'
    },
    legend: {
      onClick: () => {}
    },
    scales: {
      xAxes: [
        {
          scaleLabel:{
            display:true,
            labelString: 'Hour Of Day'
          },
        },
      ],
      yAxes: [
        {
          scaleLabel:{
            display:true,
            labelString: 'Accident Duration (Min)'
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  const distOptions = {
    title: {
      display: true,
      text: 'Average Affected Distance By Seasons'
    },
    legend: {
      onClick: () => {}
    },
    scales: {
      xAxes: [
        {
          scaleLabel:{
            display:true,
            labelString: 'Hour Of Day'
          },
        },
      ],
      yAxes: [
        {
          scaleLabel:{
            display:true,
            labelString: 'Affected Distance (Mi)'
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  const [durationGraphData, setDurationGraphData] = useState({
    labels:  graphLabels,
    datasets: displayedSeasonsDuration,
  });

  const [distGraphData, setDistGraphData]=useState({
    labels: graphLabels,
    datasets: displayedSeasonsDist,
  });

  const [checkboxes, setCheckboxes] = useState([
    { name: seasonLabels[0],
      checked: true
    },
    { name: seasonLabels[1],
      checked: true
    },
    { name: seasonLabels[2],
      checked: true
    },
    { name: seasonLabels[3],
      checked: true
    }
  ]);

 

  function updateGraphs(seasons){
    seasons.forEach((season, index) => {
      displayedSeasonsDuration[index]['data'] = season['checked'] ? durationData[index] : [];
      displayedSeasonsDist[index]['data'] = season['checked'] ? distData[index] : [];
    });
  }

  function handleSeasonChange(event) {
    let temp = checkboxes;
    temp[parseInt(event.target.name)]['checked'] = event.target.checked;
    setCheckboxes(temp);
    updateGraphs(temp);
    
    setDurationGraphData({
      labels: graphLabels,
      datasets: displayedSeasonsDuration,
    });

    setDistGraphData({
      labels: graphLabels,
      datasets: displayedSeasonsDist,
    });
    
  }
  
  
  return (
    //check if useeffect has passed
    durationData.length ?
    // or durationData[0].length depending on implementation

    <Grid container direction='column' justify='center' alignItems="center">

      <Grid item xs={12}>
        <h1>How Does Time of Day Affect Auto Accident Delay In Different Seasons?</h1>
      </Grid>

      <Grid item xs={12}>
          <FormGroup row={true}>
            {checkboxes.map((checkbox, index)=>
              <FormControlLabel key={index} control={<Checkbox checked={checkbox.checked} onChange={handleSeasonChange} name={index.toString()} color="primary"/>} label={checkbox.name}/>
            )}
        </FormGroup>
      </Grid>

      <Grid container direction='row' justify='center'>
        <Grid item xs={6}>
          <Line data={durationGraphData} options={durationOptions}/>
        </Grid>
        <Grid item xs={6}>
          <Line data={distGraphData} options={distOptions}/>
        </Grid>
      </Grid>

    </Grid>
            
    : <div></div>
  );
}

export default HoursSeasons;