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
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import './home.css';

function Read() {
  const [info, setInfo] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [filteredInfo, setFilteredInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataFromFirestore(); 
        setInfo(data);
        setFilteredInfo(data); // Initialize filteredInfo with all data
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };
    fetchData(); 
  }, []);

  const handleSearch = () => {
    // Convert searchDate to match the format stored in Firestore
    const formattedDate = new Date(searchDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replaceAll('/', '-'); // Replace '/' with '-' if needed
  
    const filteredData = info.filter(item => item.dov === formattedDate);
    setFilteredInfo(filteredData);
  };

  // Form validation function
  const isFormValid = () => {
    // Check if searchDate is not empty
    return searchDate.trim() !== '';
  };

  return (
    <div className="read">
      <div className="appointmentHeading">
        <h1>Appointment Details</h1>
      </div>
      <div className='searchButton'>
        <input
          className='searchInput'
          type="date"
          placeholder="Customer Date of Visit"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          style={{ width: '200px', height: '35px' }}
        />
        <button onClick={handleSearch} style={{backgroundColor:"#007bff"}} disabled={!isFormValid()}>Search</button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976D2' }}>
              <TableCell sx={{ color: 'white' }}>Username</TableCell>
              <TableCell align="right" sx={{ color: 'white' }}>Date of Visit</TableCell>
              <TableCell align="right" sx={{ color: 'white' }}>Mobile Number</TableCell>
              <TableCell align="right" sx={{ color: 'white' }}>Email</TableCell>
              <TableCell align="right" sx={{ color: 'white' }}>Time of Visit</TableCell>
              <TableCell align="right" sx={{ color: 'white' }}>Set Remainder</TableCell>
              <TableCell align="right" sx={{ color: 'white' }}>Thankyou Notification</TableCell>
              <TableCell align="right" sx={{ color: 'white' }}>Visit Again</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInfo.map((data, index) => (
              <TableRow key={index} >
                <TableCell component="th" scope="row">
                  {data.username}
                </TableCell>
                <TableCell align="right">{data.dov}</TableCell>
                <TableCell align="right">{data.mobno}</TableCell>
                <TableCell align="right">{data.email}</TableCell>
                <TableCell align="right">{data.tov}</TableCell>
                <TableCell align="right">{data.setRemainder ? 'Yes' : 'No'}</TableCell>
                <TableCell align="right">{data.thankyouNotification ? 'Yes' : 'No'}</TableCell>
                <TableCell align="right">{data.visit ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="homeButton">
        <Link to="/appointment">
          <Fab
            style={{ backgroundColor: "#1976d2" }}
            label="kjshgkjhfskgjk"
            disabled={!isFormValid()} // Disable the Fab if form is not valid
          >
            <AddIcon style={{ color: "#fff" }} />
          </Fab>
        </Link>
         <div style={{fontSize:"15px","margin":"10px"}}>Book an Appointment</div>
      </div>
    </div>
  );
}

export default Read;
