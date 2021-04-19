import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import { constSet, callAPI } from '../api-functions.js'
import { Line } from 'react-chartjs-2';
// import { MuiThemeProvider } from '@material-ui/core';

function Climate() {
  const regionLabels = ['Latitudes 25°N - 30°N', 'Latitudes 30°N - 35°N', 'Latitudes 35°N - 40°N', 'Latitudes 40°N - 45°N', 'Latitudes 45°N - 50°N'];
  const graphLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const qn = 2
  const [regionsData, setRegionsData] = useState([])
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    var flag = true

    const fetchData = async function() {
      let countArray = []

      for (var i = 0; i < constSet[qn].length; i++) {
        if (flag) {
          let tempDict = await callAPI(qn, JSON.stringify(constSet[qn][i]))
          countArray[i] = tempDict["1"]["ACCIDENT_COUNT"]

          // console.log(countArray[i])
        }
      }

      if (flag) {
        setRegionsData(countArray)
        updateGraph(checkboxes, countArray)
  
        setData({
          labels: graphLabels,
          datasets: displayedRegions,
        });
        setLoading(false);
      }
    }

    fetchData()

    return function stopQuery() {
      flag = false
    }
  }, []);  

  let region1 = {
    label: regionLabels[0],
    data: regionsData[0],
    fill: false,
    backgroundColor: 'rgb(121, 230, 242)',
    borderColor: 'rgba(121, 230, 242, 1)',
  };
  let region2 ={
    label: regionLabels[1],
    data: regionsData[1],
    fill: false,
    backgroundColor: 'rgb(4, 196, 217)',
    borderColor: 'rgba(4, 196, 217, 1)',
  };
  let region3 = {
    label: regionLabels[2],
    data: regionsData[2],
    fill: false,
    backgroundColor: 'rgb(56, 171, 215)',
    borderColor: 'rgba(56, 171, 215, 1)',
  };
  let region4 = {
    label: regionLabels[3],
    data: regionsData[3],
    fill: false,
    backgroundColor: 'rgb(40, 114, 155)',
    borderColor: 'rgba(40, 114, 155, 1)',
  };
  let region5 = {
    label: regionLabels[4],
    data: regionsData[4],
    fill: false,
    backgroundColor: 'rgb(11, 38, 49)',
    borderColor: 'rgba(11, 38, 49, 1)',
  };

  let displayedRegions = [region1,region2,region3,region4,region5];
  
  const [data, setData] = useState({
    labels: graphLabels,
    datasets: displayedRegions,
  });

  const options = {

    title: {
      display: true,
      text: 'Accident Severity By Climate Regions'
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
            labelString: 'Accident Severity(1-4)'
          },
          min: 2,
          max: 3,

          
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
      {isLoading ? <CircularProgress /> : null}
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