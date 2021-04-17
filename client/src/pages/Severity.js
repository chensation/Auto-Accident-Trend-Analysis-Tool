import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import { constSet, callAPI } from '../api-functions.js'

function Severity() {
  function createData(num, factor, coefficient) {
    return { num, factor, coefficient };
  }

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "red",
      color: "white",
    },
  }))(TableCell);  
  
  const rows = [
    createData(0, "precipitation", 159),
    createData(1, "humidity", 23),
    createData(2, "wind speed", 1259),
    createData(3, "wind chill", 234),
    createData(4, "temperature", 119),
    createData(5, "visibility", 123),
    createData(6,"pressure", 120)
  ];

  const qn = 5
  const[year, setYear] = useState(2016);
  const [coeffData, setCoeffData] = useState([])

  useEffect(() => {
    // var flag = true

    // const fetchData = async function() {
    //   let coeffArray = []

    //   if (flag) {
    //     let tempDict = await callAPI(qn, JSON.stringify([
    //       [year]
    //     ]))
    //     coeffArray = tempDict["1"]["CORRELATION_COEFFICIENT"]

    //     console.log(coeffArray)
    //   }

    //   if (flag) {
    //     setCoeffData(coeffArray)
    //   }
    // }

    // fetchData()

    // return function stopQuery() {
    //   flag = false
    // }
  }, []);     
   
  return (
    <div>
    <h1>What Factors Impact the Severity of Accidents and by How Much?</h1>
    <TableContainer component={Paper}>
    <Table className="table" aria-label="simple table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">Factors</StyledTableCell>
          <StyledTableCell align="center">Correlation Coeffficient</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) =>(
          <TableRow key={row.num}>
            <TableCell align="center" >{row.factor}</TableCell>
            <TableCell align="center" >{row.coefficient}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <Slider></Slider>
  </div>
  );
}

export default Severity;