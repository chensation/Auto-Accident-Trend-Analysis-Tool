import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Bar} from 'react-chartjs-2';

function Covid() {

  const graphLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let durationData = [65, 59, -100, 81, 56,10,20,30,40,50,-50,-60];
  let distData = [56,10,65, 59,  20,30,-100, 81,40,50,-50,45];

  useEffect(()=>{

    const fetchData = async ()=> {

      /*place function here
      winterDurationData = durationFunction(winter) etc
      winterDistData = distFunction(winter) etc
      or
      durationData = durationFunction() etc

      */
    }

    fetchData()

  }, []);

  const [toggle,setToggle] = useState("Average Accident Duration Difference (Min)");
  
  let graphValues = [
    {
      label: toggle,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: durationData
    }
  ];

  const options = {
    title:{
      display:true,
      text:'Pre-Covid Years Subtracted By Covid Year',
      fontSize:20
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
            labelString: toggle
          },

          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  
  const [state, setState] = useState({
    labels: graphLabels,
    datasets: graphValues
  });

  const switchData = (event) => {
    if(event.target.value === "Average Accident Count Difference"){
      graphValues[0].data = distData;
      
    }
    else{
      graphValues[0].data = durationData;
    }

    setToggle(event.target.value);

    setState({
      labels: graphLabels,
      datasets: graphValues
    });

  }

  

  return (
    //check if useeffect has passed
    durationData.length ?
    
    <div>
      <h1>How Has COVID-19 Affected Auto Accidents?</h1>
      <Grid container direction='row' justify='center' alignItems="center">
        <Grid item>
          <RadioGroup value={toggle} onChange={switchData}>
            <FormControlLabel value="Average Accident Duration Difference (Min)" control={<Radio />} label="Accident Duration" />
            <FormControlLabel value="Average Accident Count Difference" control={<Radio />} label="Accident Count" />
          </RadioGroup>
        </Grid>
        <Grid item xs={8}>
          <Bar data={state} options={options} />
        </Grid>
      </Grid>
    </div>

    : <div></div>
  );
}

export default Covid;