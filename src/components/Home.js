import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import './home.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Login from './Login';


const Home = () => {
  const [hoverText, setHoverText] = useState("");

  const handleMouseEnter = () => {
    setHoverText("Book appointment");
    
  };

  const handleMouseLeave = () => {
    setHoverText("");
  };

  return (
    <div className="home">
      <div className="homeinfo">
        <h1>Welcome to RetailSoft </h1>
      </div>

      <div className="homeButton">
        <Link to="/login"> {/* Link to the login page */}
          <Fab
            style={{ backgroundColor: "#1976d2" }}
            label="kjshgkjhfskgjk"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <AddIcon style={{ color: "#fff" }} />
          </Fab>
        </Link>
        <div  style={{fontSize:"15px","margin":"10px"}}>Book an Appointment</div>
      </div>
      
    </div>
  );
}

export default Home;
