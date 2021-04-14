import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';

function Severity() {
  
  function createData(num, factor, coefficient) {
    return { num, factor, coefficient };
  }
  
  const rows = [
    createData(0, "precipitation", 159),
    createData(1, "humidity", 23),
    createData(2, "wind speed", 1259),
    createData(3, "wind chill", 234),
    createData(4, "temperature", 119),
    createData(5, "visibility", 123),
    createData(6,"pressure", 120)
  ];

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "red",
      color: "white",
    },
  }))(TableCell);
   
  
  return (
    <div>
    <h1>What factors impact the severity of accidents, and by how much?</h1>
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