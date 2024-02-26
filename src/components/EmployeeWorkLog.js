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

const EmployeeWorkLog = () => {
  
  const [remarks, setRemarks] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);

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

  const handleSubmit = () => {
    const data = {
      remarks: remarks,
      timeSpent: timeSpent,
      checkedItems: checkedItems
    };
  };
  
  
  return (
     <div className="parent">
        activities:
        
       <div className="activities">
          <div className="row1">
            <div className="rowitem">
              <Checkbox onChange={() => handleCheckboxChange("Hair Cut")} />
              <SpaIcon />
              <span>Hair Cut</span>
            </div>
            <div className="rowitem">
              <Checkbox onChange={() => handleCheckboxChange("Facial")} />
              <FacialIcon />
              <span>Facial</span>
            </div>
            <div className="rowitem">
              <Checkbox onChange={() => handleCheckboxChange("Hair Coloring")} />
              <HairColorIcon />
              <span>Hair Coloring</span>
            </div>
          </div>
          <div className="row1">
            <div className="rowitem">
              <Checkbox onChange={() => handleCheckboxChange("Manicure")} />
              <ManicureIcon />
              <span>Manicure</span>
            </div>
            <div className="rowitem">
              <Checkbox onChange={() => handleCheckboxChange("Pedicure")} />
              <PedicureIcon />
              <span>Pedicure</span>
            </div>
            <div className="rowitem">
              <Checkbox onChange={() => handleCheckboxChange("Waxing")} />
              <WaxingIcon />
              <span>Waxing</span>
            </div>
          </div>
          <div className="row1">
            <div className="rowitem">
              <Checkbox onChange={() => handleCheckboxChange("Massage")} />
              <SpaIcon />
              <span>Massage</span>
            </div>
            <div className="rowitem">
              <Checkbox onChange={() => handleCheckboxChange("Hairstyling")} />
              <HairstyleIcon />
              <span>Hairstyling</span>
            </div>
            <div className="rowitem">
              <Checkbox onChange={() => handleCheckboxChange("Makeup")} />
              <MakeupIcon />
              <span>Makeup</span>
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
        <span style={{margin : "20px","fontSize":"23px"}}>Time Spend</span>
        <TextField 
          type="number" 
          variant="outlined" 
          margin="20px"
          value={timeSpent}
          onChange={handleTimeSpentChange}
        />
      </div>

      <div className="buttons">
        <Button variant="contained" color="success" style={{margin:"20px"}}>
          Submit
        </Button>
        <Button variant="contained" color="error" style={{margin:"20px"}}>
          Cancel
        </Button>
      </div>
      </div>
  );
};

export default EmployeeWorkLog;
