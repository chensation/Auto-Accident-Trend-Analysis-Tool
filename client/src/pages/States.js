import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import statesFile from '../components/states.json'
import { constSet, callAPI } from '../api-functions.js'

function States() {  
  const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  const qn = 1
  const [usePopulation, setUsePopulation] = useState(false)
  const [countData, setCountData] = useState([])
  const [countPopData, setCountPopData] = useState([])
  const [statesData, setStatesData] = useState(statesFile);
  const[year, setYear] = useState(2016);
  
  const handleTimeLineChange = (event, value) => {
    setYear(value);
  }

  const percentColors = [
    { pct: 0.0, color: { r: 0x00, g: 0xff, b: 0 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0xff, g: 0x00, b: 0 } } ];

  var getColorForPercentage = function(pct) {
      for (var i = 1; i < percentColors.length - 1; i++) {
          if (pct < percentColors[i].pct) {
              break;
          }
      }

      var lower = percentColors[i - 1];
      var upper = percentColors[i];
      var range = upper.pct - lower.pct;
      var rangePct = (pct - lower.pct) / range;
      var pctLower = 1 - rangePct;
      var pctUpper = rangePct;
      var color = {
          r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
          g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
          b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
      };
      return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
  };  

  const percentile = (arr, val) => {
    return (100 *
      arr.reduce(
        (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
        0
      )) /
    arr.length
  }

  useEffect(() => {
    var flag = true

    const fetchData = async function() {
      let countArray = []
      let countPopArray = []
      let stateCodes = []

      if (flag) {
        let tempDict = await callAPI(qn, JSON.stringify([
          [year]
        ]))

        countArray = tempDict["1"]["ACCIDENT_COUNT"]
        countPopArray = tempDict["1"]["ACCIDENT_PER_THOUSAND_POP"]
        stateCodes = tempDict["1"]["STATE_CODE"]

        var tempData = [...statesData]

        for (var i = 0; i < tempData.length; i++) {
          let code = tempData[i].id
          let index = stateCodes.indexOf(code)

          if (index != -1) {
            if (usePopulation) {
              var perc = percentile(countPopArray, countPopArray[index]) / 100.0
            } else {
              var perc = percentile(countArray, countArray[index]) / 100.0
            }

            tempData[i].color = getColorForPercentage(perc)
            tempData[i].count = countArray[index]
            tempData[i].countPop = countPopArray[index]

            // console.log(`${perc}---${tempData[i].color}--${tempData[i].id}`)
            // note: hawaii and alaska don't have any accidents in the data            
          }
        }

        setStatesData(tempData)

        // console.log(countArray)
        // console.log(countPopArray)
        // console.log(stateCodes)
      }

      if (flag) {
        setCountData(countArray)
        setCountPopData(countPopArray)
      }
    }

    fetchData()

    return function stopQuery() {
      flag = false
    }
  }, [year, usePopulation]);

  const handleSwitchChange = () => {
    setUsePopulation(!usePopulation)
  }

  return (
    <div>
      <h1>What Are the Differences in Auto Accidents Between States?</h1>
      <Switch onChange={handleSwitchChange}></Switch>
      <p>Divide by Population</p>
      <Container>
      <svg viewBox="0 0 960 600">
        {statesData.map((stateData, index) =>
          <path className="tooltip"
            style={{cursor: "pointer", fill:stateData.color}}
            key={index}
            stroke="#fff"
            strokeWidth="6px"
            d={stateData.shape}
          >
          <title>
            {usePopulation ? "Accident Count Per Thousand People: " + stateData.countPop : "Accident Count: " + stateData.count }
          </title>
          </path>
        )}
      </svg>
      </Container>
      <div>
      <PrettoSlider 
        valueLabelDisplay="on"
        value={year}
        min={2016}
        step={1}
        max={2020} 
        defaultValue ={2016}
        onChange={handleTimeLineChange}
      />
      </div>
    </div>
  );
}

export default States;