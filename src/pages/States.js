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

  let stateColor = 'green';

  const handleTimeLineChange = (value) => {
    
  }
  
  return (
    <div>
      <Switch></Switch>
      <Container>
      <svg viewBox="0 0 960 600">
        {statesData.map((stateData, index) =>
          <path
            className="someCSSClass"
            style={{cursor: "pointer", fill: stateColor}}
            key={index}
            stroke="#fff"
            strokeWidth="6px"
            d={stateData.shape}
            onMouseOver={(event) => {
              event.target.style.fill = 'red';
              //console.log(statesData[index].id);
            }}
            onMouseOut={(event) => {
              event.target.style.fill = 'orange';
            }}
          >
          </path>
        )}
      </svg>
      </Container>
      <div>
      <PrettoSlider 
        valueLabelDisplay="auto"  
        aria-label="pretto slider" 
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