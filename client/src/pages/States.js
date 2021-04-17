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
  const [countData, setCountData] = useState([])
  const [countPopData, setCountPopData] = useState([])
  const [statesData, setStatesData] = useState(statesFile);
  const[year, setYear] = useState(2016);
  
  const handleTimeLineChange = (event, value) => {
    
    let newArr = [...statesData];

    if(value===2016){
    newArr.forEach(stateData=>{
      stateData.color = "red";
    })}

    if(value===2017){
      newArr.forEach(stateData=>{
        stateData.color = "orange";
    })}

    if(value===2018){
        newArr.forEach(stateData=>{
          stateData.color = "green";
   })}

    if(value===2019){
        newArr.forEach(stateData=>{
          stateData.color = "blue";
    })}

    if(value===2020){
      newArr.forEach(stateData=>{
        stateData.color = "blueviolet";
    })}
    
    setYear(value);
    setStatesData(newArr);
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

        console.log(countArray)
        console.log(countPopArray)
        console.log(stateCodes)
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
  }, []);  
  
  return (
    <div>
      <h1>What Are the Differences in Auto Accidents Between States?</h1>
      <Switch></Switch>
      <p>Divide by Population</p>
      <Container>
      <svg viewBox="0 0 960 600">
        {statesData.map((stateData, index) =>
          <path 
            style={{cursor: "pointer", fill:stateData.color}}
            key={index}
            stroke="#fff"
            strokeWidth="6px"
            d={stateData.shape}
          >
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