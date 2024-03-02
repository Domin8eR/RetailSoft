import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import SendIcon from '@mui/icons-material/Send';
import "./work.css"
import FacialIcon from '@mui/icons-material/Face';
import HairColorIcon from '@mui/icons-material/ColorLens';
import ManicureIcon from '@mui/icons-material/LocalFlorist';
import PedicureIcon from '@mui/icons-material/Spa';
import WaxingIcon from '@mui/icons-material/Waves';
import SpaIcon from '@mui/icons-material/Spa';
import HairstyleIcon from '@mui/icons-material/Brush';
import MakeupIcon from '@mui/icons-material/Face';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import Chip from '@mui/material/Chip';

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
    if (!checkedItems.includes(label)) {
      setCheckedItems([...checkedItems, label]);
    }
  };

  const handleDelete = (label) => {
    const newCheckedItems = checkedItems.filter((item) => item !== label);
    setCheckedItems(newCheckedItems);
  };
  
  return (
     <div className="parent">
        <span style={{fontSize:"30px"}}>Services</span>
        
       <div className="activities">
          <div className="row1">
            <div className="rowitem">
            <Chip
              label="Haircut"
              icon={<SpaIcon />}
              variant={checkedItems.includes("Haircut") ? "filled" : "outlined"}
              onClick={() => handleChipClick("Haircut")}
              onDelete={() => handleDelete("Haircut")}
            />
            </div>
            <div className="rowitem">
            <Chip
              label="Facial"
              icon={<SpaIcon />}
              variant={checkedItems.includes("Facial") ? "filled" : "outlined"}
              onClick={() => handleChipClick("Facial")}
              onDelete={() => handleDelete("Facial")}
            />
            </div>
            <div className="rowitem">
            <Chip
              label="Hair Colouring"
              icon={<SpaIcon />}
              variant={checkedItems.includes("Hair Colouring") ? "filled" : "outlined"}
              onClick={() => handleChipClick("Hair Colouring")}
              onDelete={() => handleDelete("Hair Colouring")}
            />
            </div>
          </div>
          <div className="row1">
            <div className="rowitem">
            <Chip
              label="Manicure"
              icon={<SpaIcon />}
              variant={checkedItems.includes("Manicure") ? "filled" : "outlined"}
              onClick={() => handleChipClick("Manicure")}
              onDelete={() => handleDelete("Manicure")}
            />
            </div>
            <div className="rowitem">
            <Chip
              label="Pedicure"
              icon={<SpaIcon />}
              variant={checkedItems.includes("Pedicure") ? "filled" : "outlined"}
              onClick={() => handleChipClick("Pedicure")}
              onDelete={() => handleDelete("Pedicure")}
            />
            </div>
            <div className="rowitem">
            <Chip
              label="Waxing"
              icon={<SpaIcon />}
              variant={checkedItems.includes("Waxing") ? "filled" : "outlined"}
              onClick={() => handleChipClick("Waxing")}
              onDelete={() => handleDelete("Waxing")}
            />
            </div>
          </div>
          <div className="row1">
            <div className="rowitem">
            <Chip
              label="Massage"
              icon={<SpaIcon />}
              variant={checkedItems.includes("Massage") ? "filled" : "outlined"}
              onClick={() => handleChipClick("Massage")}
              onDelete={() => handleDelete("Massage")}
            />
            </div>
            <div className="rowitem">
            <Chip
              label="Hairstyling"
              icon={<SpaIcon />}
              variant={checkedItems.includes("Hairstyling") ? "filled" : "outlined"}
              onClick={() => handleChipClick("Hairstyling")}
              onDelete={() => handleDelete("Hairstyling")}
            />
            </div>
            <div className="rowitem">
            <Chip
              label="MakeUp"
              icon={<SpaIcon />}
              variant={checkedItems.includes("MakeUp") ? "filled" : "outlined"}
              onClick={() => handleChipClick("MakeUp")}
              onDelete={() => handleDelete("MakeUp")}
            />
            </div>
          </div>
       </div>

      <div className="remark">
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
