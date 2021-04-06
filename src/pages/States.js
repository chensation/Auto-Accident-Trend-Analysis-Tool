import React, {useEffect} from "react";
import h337 from "heatmap.js";
import Switch from '@material-ui/core/Switch';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import USAMap from "react-usa-map";
import Slider from '@material-ui/core/Slider';

function States() {
  
  function mapHandler(event){
    alert(event.target.dataset.name);
  };

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
  
  
  return (
    <div>
      <Switch></Switch>
      <USAMap onClick={mapHandler}/>
      <div>
      <PrettoSlider 
        valueLabelDisplay="auto"  
        aria-label="pretto slider" 
        min={2016}
        step={1}
        max={2020} 
        defaultValue ={2016}
      />
      </div>
    </div>
  );
}

export default States;