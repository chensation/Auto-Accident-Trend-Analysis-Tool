import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { constSet, callAPI } from '../api-functions.js'
import {Bar} from 'react-chartjs-2';

function Covid() {

  const graphLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const qn = 4
  const [toggle,setToggle] = useState("Average Accident Duration Difference (Min)");
  const [durationData, setDurationData] = useState([])
  const [countData, setCountData] = useState([])

  let graphValues = [
    {
      label: toggle,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: durationData
    }
  ];  

  const [state, setState] = useState({
    labels: graphLabels,
    datasets: graphValues
  });    

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    var flag = true

    const fetchData = async function() {
      let durDataDiff = []
      let countDataDiff = []

      for (var i = 0; i < constSet[qn].length; i++) {
        if (flag) {
          let tempDict = await callAPI(qn, JSON.stringify(constSet[qn][i]))
          console.log(tempDict)
          durDataDiff = tempDict["3"]["AVG_DURATION"].map((n, i) => n - tempDict["4"]["AVG_DURATION"][i])
          countDataDiff = tempDict["1"]["ACCIDENT_COUNT"].map((n, i) => n - tempDict["2"]["ACCIDENT_COUNT"][i])
        }
      }

      if (flag) {
        setDurationData(durDataDiff)
        setCountData(countDataDiff)

        // if current is duration, do duration
        // else, do count

        if (toggle === "Average Accident Duration Difference (Min)") {
          graphValues[0].data = durDataDiff
        } else if (toggle === "Average Accident Count Difference") {
          graphValues[0].data = countDataDiff
        }

        setState({
          labels: graphLabels,
          datasets: graphValues
        });
        
        setLoading(false);
      }
    }

    fetchData()

    return function stopQuery() {
      flag = false
    }    
  }, []);  

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

  const switchData = (event) => {
    if (event.target.value === "Average Accident Count Difference"){
      graphValues[0].data = countData;
      
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
    // durationData.length ?
    
    <div>
      <h1>How Has COVID-19 Affected Auto Accidents?</h1>
      {isLoading ? <CircularProgress /> : null}
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

    // : <div></div>
  );
}

export default Covid;