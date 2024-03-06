import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./work.css"
import FacialIcon from '@mui/icons-material/Face2';
import HairColorIcon from '@mui/icons-material/ColorLens';
import ManicureIcon from '@mui/icons-material/LocalFlorist';
import PedicureIcon from '@mui/icons-material/Spa';
import WaxingIcon from '@mui/icons-material/Waves';
import SpaIcon from '@mui/icons-material/Spa';
import ColorLensIcon from '@mui/icons-material/Air';
import HairstyleIcon from '@mui/icons-material/Brush';
import MakeupIcon from '@mui/icons-material/Face';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid'; // Changed to Grid from Unstable_Grid2

const EmployeeWorkLog = () => {
  const navigate = useNavigate(); // useNavigate hook

  const [remarks, setRemarks] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const db = getFirestore(); // Initialize Firestore

  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };

  const handleTimeSpentChange = (event) => {
    setTimeSpent(event.target.value);
  };

  const handleCheckboxChange = (label) => {
    const currentIndex = checkedItems.indexOf(label);
    const newCheckedItems = [...checkedItems];

    if (currentIndex === -1) {
      newCheckedItems.push(label);
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }

    setCheckedItems(newCheckedItems);
  };

  const handleSubmit = async () => {
    const currentDate = new Date();
    const data = {
      remarks: remarks,
      timeSpent: timeSpent,
      checkedItems: checkedItems,
      date: currentDate
    };
    try {
      await addDoc(collection(db, 'activities_selected'), data);
      console.log('Data saved to Firestore successfully!');
      navigate("/home"); // Navigate to home after successful submission
    } catch (error) {
      console.error('Error saving data to Firestore: ', error);
    }
  };
  const handleCancel = () => {
    // Reset all input values
    setRemarks("");
    setTimeSpent("");
    setCheckedItems([]);
  };

  const handleChipClick = (label) => {
    if (checkedItems.includes(label)) {
        // If the item is already checked, remove it
        const newCheckedItems = checkedItems.filter((item) => item !== label);
        setCheckedItems(newCheckedItems);
    } else {
        // If the item is not checked, add it
        setCheckedItems([...checkedItems, label]);
    }
  };

  return (
     <div className="parent">
        <div style={{fontSize:"30px","margin" : "20px"}}>Services</div>
        
       <div className="activities">
          <Grid container spacing={1}> {/* Wrap all chips with Grid container */}
            <Grid item xs={4}> {/* Three chips per row */}
              <Chip
                label="Haircut"
                icon={<HairstyleIcon />}
                variant={checkedItems.includes("Haircut") ? "filled" : "outlined"}
                onClick={() => handleChipClick("Haircut")}
                style={{width:"150px"}}
              />
            </Grid>
            <Grid item xs={4}>
              <Chip
                label="Facial"
                icon={<FacialIcon />}
                variant={checkedItems.includes("Facial") ? "filled" : "outlined"}
                onClick={() => handleChipClick("Facial")}
                style={{width:"150px"}}
              />
            </Grid>
            <Grid item xs={4}>
              <Chip
                label="Hair Colouring"
                icon={<HairColorIcon />}
                variant={checkedItems.includes("Hair Colouring") ? "filled" : "outlined"}
                onClick={() => handleChipClick("Hair Colouring")}
                style={{width:"150px"}}
              />
            </Grid>
            <Grid item xs={4}>
            <Chip
              label="Manicure"
              icon={<ManicureIcon />}
              variant={checkedItems.includes("Manicure") ? "filled" : "outlined"}
              onClick={() => handleChipClick("Manicure")}
              
              style={{width:"150px"}}
            />
            </Grid>
            <Grid item xs={4}>
            <Chip
              label="Pedicure"
              icon={<PedicureIcon />}
              variant={checkedItems.includes("Pedicure") ? "filled" : "outlined"}
              onClick={() => handleChipClick("Pedicure")}
              
              style={{width:"150px"}}
            />
            </Grid>
            <Grid item xs={4}>
            <Chip
              label="Waxing"
              icon={<WaxingIcon />}
              variant={checkedItems.includes("Waxing") ? "filled" : "outlined"}
              onClick={() => handleChipClick("Waxing")}
              
              style={{width:"150px"}}
            />
            </Grid>
            <Grid item xs={4}>
            <Chip
              label="Massage"
              icon={<SpaIcon />}
              variant={checkedItems.includes("Massage") ? "filled" : "outlined"}
              onClick={() => handleChipClick("Massage")}
              
              style={{width:"150px"}}
            />
            </Grid>
            <Grid item xs={4}>
            <Chip
              label="Hairstyling"
              icon={<ColorLensIcon />}
              variant={checkedItems.includes("Hairstyling") ? "filled" : "outlined"}
              onClick={() => handleChipClick("Hairstyling")}
              
              style={{width:"150px"}}
            />
            </Grid>
            <Grid item xs={4}>
            <Chip
              label="MakeUp"
              icon={<MakeupIcon />}
              variant={checkedItems.includes("MakeUp") ? "filled" : "outlined"}
              onClick={() => handleChipClick("MakeUp")}
              
              style={{width:"150px"}}
            />
            </Grid>
          </Grid>
       </div>

      <div className="remark" style={{margin : "20px"}}>
        <TextField
          className="remarkInput"
          multiline
          rows={4}
          variant="outlined"
          label="Additional Remarks"
          value={remarks}
          onChange={handleRemarksChange}
        />
      </div>

      <div className="numberOfHours">
        <AccessTimeIcon/>
        <span style={{margin : "20px","fontSize":"23px"}}>Time Spent</span>
        <TextField 
          type="number" 
          variant="outlined" 
          margin="20px"
          value={timeSpent}
          onChange={handleTimeSpentChange}
        />
      </div>

      <div className="buttons">
        <Button variant="contained" color="success" style={{margin:"20px",backgroundColor:"#28a745"}} onClick={handleSubmit}>
           Submit
        </Button>
        <Button variant="contained" color="error" style={{margin:"20px",backgroundColor:"red"}} onClick={handleCancel}>
          Cancel
        </Button>
      </div>
      </div>
  );
};

export default EmployeeWorkLog;
