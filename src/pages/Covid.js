import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import {Bar} from 'react-chartjs-2';

function Covid() {
  
  const [toggle,setToggle] = useState("duration");
  
  let numbers = [
    {
      label: 'Accident Duration',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, -100, 81, 56,10,20,30,40,50,-50,-60]
    }
  ];
  
  const [state, setState] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: numbers
  });

  function switchData(){
    if(toggle == "duration"){
      numbers=[
        {
          label: 'Accident Distace',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [56,10,65, 59,  20,30,-100, 81,40,50,-50,45]
        }
      ];
      setToggle("distance");
    }
    else{
      numbers=[
        {
          label: 'Accident Duration',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [65, 59, -100, 81, 56,10,20,30,40,50,-50,-60]
        }
      ];
      setToggle("duration");
    }

    console.log(toggle);

      setState({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: numbers
      });
  }

  const options = {
    title:{
      display:true,
      text:'COVID-19 Impact',
      fontSize:20
    },
    legend:{
      display:true,
      position:'right'
    }
  }

  return (
    <div>
        <Button onClick={switchData} variant="contained"  color="primary">Toggle</Button>
        <Bar
          data={state}
          options={options}
        />
      </div>
  );
}

export default Covid;