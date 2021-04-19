import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'
import Slider from '@material-ui/core/Slider';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  const qn2 = 6
  const [usePopulation, setUsePopulation] = useState(false)
  const [statesData, setStatesData] = useState(statesFile);
  const[year, setYear] = useState(2016);
  const[tupleCount, setTupleCount] = useState();
  const[showTupleCount, setShowTupleCount] = useState(false);
  const [isLoading, setLoading] = useState(true);
  
  const handleTimeLineChange = (event, value) => {
    setYear(value);
    setLoading(true);
  }

  const percentColors = [
    { pct: 0.0, color: { r: 242, g: 231, b: 80 } },
    { pct: 0.018, color: { r: 242, g: 184, b: 7 } },
    { pct: 0.05, color: { r: 242, g: 135, b: 5 } },
    { pct: 0.14, color: { r: 197, g: 33, b: 4 } },
    { pct: 0.36, color: { r: 113, g: 3, b: 1 } },
    { pct: 1.0, color: { r: 100, g: 3, b: 1 } } ];

  let getColorForPercentage = (pct) => {
      for (var i = 1; i < percentColors.length - 1; i++) {
          if (pct < percentColors[i].pct) {
              break;
          }
      }

      let lower = percentColors[i - 1];
      let upper = percentColors[i];
      let range = upper.pct - lower.pct;
      let rangePct = (pct - lower.pct) / range;
      let pctLower = 1 - rangePct;
      let pctUpper = rangePct;
      let color = {
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
    let flag = true

    const fetchData = async function() {
      let countArray = []
      let countPopArray = []
      let stateCodes = []

      if (flag) {
        let tempDict = await callAPI(qn, JSON.stringify([
          [year]
        ]))

        let tupleDict = await callAPI(qn2, JSON.stringify([]))
        let tupleC = tupleDict["1"]["TUPLE"][0]
        setTupleCount(tupleC)

        countArray = tempDict["1"]["ACCIDENT_COUNT"]
        countPopArray = tempDict["1"]["ACCIDENT_PER_THOUSAND_POP"]
        stateCodes = tempDict["1"]["STATE_CODE"]

        let tempData = [...statesData]

        for (let i = 0; i < tempData.length; i++) {
          let code = tempData[i].id
          let index = stateCodes.indexOf(code)
          let perc;
          if (index != -1) {
            if (usePopulation) {
               //perc = percentile(countPopArray, countPopArray[index]) / 100.0
               let max = countPopArray.reduce((a, b) => Math.max(a, b));
               perc = countPopArray[index] / max;
            } else {
              //perc = percentile(countArray, countArray[index]) / 100.0
              let max = countArray.reduce((a, b) => Math.max(a, b));
              perc = countArray[index] / max;
              console.log(perc);
            }

            tempData[i].color = getColorForPercentage(perc)
            tempData[i].count = countArray[index]
            tempData[i].countPop = countPopArray[index]

            // console.log(`${perc}---${tempData[i].color}--${tempData[i].id}`)
            // note: hawaii and alaska don't have any accidents in the data            
          }
        }

        setStatesData(tempData)
        setLoading(false);
        // console.log(countArray)
        // console.log(countPopArray)
        // console.log(stateCodes)
      }
    }

    fetchData()

    return () => {
      flag = false
    }
  }, [year, usePopulation]);

  const handleSwitchChange = () => {
    setUsePopulation(!usePopulation)
    setLoading(true);
  }

  return (
    <div>
      <Button onClick={() => {setShowTupleCount(!showTupleCount)}} variant="contained" color ="primary">
        Show Number of Tuples
      </Button>
      <div>
        {showTupleCount ? tupleCount : ""}
      </div>     
      <h1>What Are the Differences in Auto Accidents Between States?</h1>
      {isLoading ? <CircularProgress /> : null}
      <div>     
        <Switch onChange={handleSwitchChange}></Switch>
        <p>Divide by Population</p>
      </div>
      <Container>
        <h2>{usePopulation ? "Accident Count per Thousand People" : "Accident Count"}</h2>
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
            {stateData.id + (usePopulation ? " Accident Count Per Thousand People: " + stateData.countPop : " Accident Count: " + stateData.count) }
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