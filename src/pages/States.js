import React, {useState} from "react";
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import statesfile from '../components/states.json'

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

  const [statesData, setStatesData] = useState(statesfile);
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
  
  return (
    <div>
      <Switch></Switch>
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