import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/core/Slider';
import { callAPI } from '../api-functions.js'

function Severity() {

  

  const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
      paddingTop: 45
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

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#424242",
      color: "white",
    },
  }))(TableCell);  

  const coefficients = ["Precipitation", "Humidity", "Wind_Speed", "Wind_Chill", "Temperature", "Visibility", "Pressure", "Severity"];
  
  const rows = [
    {name: "Precipitation", value: 0},
    {name: "Humidity", value: 0},
    {name: "Wind Speed", value: 0},
    {name: "Wind Chill", value: 0},
    {name: "Temperature", value: 0},
    {name: "Visibility", value: 0},
    {name: "Pressure", value: 0},
    {name: "Severity", value: 0}
  ];

  const qn = 5
  const[year, setYear] = useState(2016);
  const [coeffData, setCoeffData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    let flag = true

    const fetchData = async function() {

      if (flag) {
        for(let i = 0; i < coefficients.length; i++){
          let tempDict = await callAPI(qn, JSON.stringify([
            [coefficients[i], year]
          ]));
        
          let r_value = tempDict["1"]["CORRELATION_COEFFICIENT"][0];
          rows[i].value = r_value;
          console.log(r_value);
        }
        console.log(rows);
        setCoeffData(rows);
        setLoading(false);
       
      }
    }

    fetchData()

    return function stopQuery() {
      flag = false
    }
  }, [year]);     
   
  const handleTimeLineChange = (event, value) => {
    setYear(value);
    setLoading(true);
  }

  return (
    <div>
      <h1>What Factors Impact the Severity of Accidents and by How Much?</h1>
      {isLoading ? <CircularProgress /> : null}
        <TableContainer>
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Factors</StyledTableCell>
                <StyledTableCell align="center">Correlation Coefficient</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coeffData.sort((a, b) => Math.abs(b.value) - Math.abs(a.value)).map((row) =>(
                <TableRow style={ row.value > 0 ? {"background" : "#8bc34a"}: {"background" : "#ff5722"} } key={row.value}>
                  <TableCell style={{"border-right-style": "solid"}}align="center" >{row.name}</TableCell>
                  <TableCell align="center" >{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
  );
}

export default Severity;