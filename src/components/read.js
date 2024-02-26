import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchDataFromFirestore } from "../api/database"; 
import "./read.css";

function Read() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataFromFirestore(); 
        setInfo(data);
        console.log(info);
        
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };
    fetchData(); 
  }, []);

  return (
    <div className="read">

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'blue' }}>
            <TableCell sx={{ color: 'white' }}>Username</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Mobile Number</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Email</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Date of Visit</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Time of Visit</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Set Remainder</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Thankyou Notification</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Visit Again</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {info.map((data, index) => (
            <TableRow key={index} >
              <TableCell component="th" scope="row">
                {data.username}
              </TableCell>
              <TableCell align="right">{data.mobno}</TableCell>
              <TableCell align="right">{data.email}</TableCell>
              <TableCell align="right">{data.dov}</TableCell>
              <TableCell align="right">{data.tov}</TableCell>
              <TableCell align="right">{data.setRemainder ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">{data.thankyouNotification ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">{data.visit ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default Read;
