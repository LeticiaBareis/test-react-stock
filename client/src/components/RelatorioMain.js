import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables() {
  const [list, setList]= useState([]);

  useEffect(()=>{
    fetch("http://localhost:3000/list").then((response)=>{ 
      return response.json()
    }).then((data)=>{ console.log(data)
      setList(data)
    })
  },[]);

  function statusTest(list){
    let status = ''
    if(parseFloat(list.volume_order.replace(',','.')) > 140){
      status = "otimo"
    }
    else if(parseFloat(list.volume_order.replace(',','.')) < 110){
      status = "critico"
    }
    else{
      status= "bom"
    };
    return status
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Data</StyledTableCell>
            <StyledTableCell align="right">Open</StyledTableCell>
            <StyledTableCell align="right">High</StyledTableCell>
            <StyledTableCell align="right">Low</StyledTableCell>
            <StyledTableCell align="right">Close</StyledTableCell>
            <StyledTableCell align="right">Volume</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell>{row.date_order}</StyledTableCell>
              <StyledTableCell align="right">{row.open_order}</StyledTableCell>
              <StyledTableCell align="right">{row.high}</StyledTableCell>
              <StyledTableCell align="right">{row.low}</StyledTableCell>
              <StyledTableCell align="right">{row.close_order}</StyledTableCell>
              <StyledTableCell align="right">{row.volume_order}</StyledTableCell>
              <StyledTableCell align="right">{statusTest(row)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
