import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import './Update_inventory.css';
import Snackbar from '@mui/material/Snackbar';

function UpdateInventory() {
  const location = useLocation();
  const rowData = location.state;
  const [action, setAction] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [quantity, setQtyRemaining] = useState('');
  const [unit, setQtyMetricUnit] = useState('');
  const [reorderThreshold, setQtyRestockThreshold] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [date, setDateOfLastOrder] = useState('');
  const [reorderReminder, setReorderReminder] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (rowData) {
      setAction(rowData.action || '');
      setItemName(rowData.itemName || '');
      setItemDescription(rowData.itemDescription || '');
      setQtyRemaining(rowData.quantity || '');
      setQtyMetricUnit(rowData.unit || '');
      setQtyRestockThreshold(rowData.reorderThreshold || '');
      setAssignedTo(rowData.assignedTo || '');
      setDateOfLastOrder(rowData.date || '');
      setReorderReminder(rowData.reorderReminder || false);
    }
  }, [rowData]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const db = getFirestore();

    const dataToUpdate = {
      action,
      itemName,
      itemDescription,
      quantity,
      unit,
      reorderThreshold,
      assignedTo,
      date,
      reorderReminder
    };

    try {
      if (action === 'update') {
        if (rowData && rowData.id) {
          const docRef = doc(db, 'inventory', rowData.id);
          await updateDoc(docRef, dataToUpdate);
          console.log('Document updated with ID: ', rowData.id);
          console.log('Data updated in Firestore successfully!');
          setOpenSnackbar(true);
        } else {
          console.error('Row data or ID missing. Cannot update document.');
        }
      } else if (action === 'add' || action === 'transfer') {
        const docRef = await addDoc(collection(db, 'inventory'), dataToUpdate);
        console.log('Document written with ID: ', docRef.id);
        console.log('Data added to Firestore successfully!');
        setOpenSnackbar(true);
      } else {
        console.error('Invalid action selected.');
      }

      handleReset();
      setTimeout(() => {
        navigate('/Inventory_list', { state: { updatedDate: date } }); 
    }, 3000);

      
    } catch (error) {
      console.error('Error updating/adding data in Firestore: ', error);
    }
  };

  const handleReset = () => {
    setAction('');
    setItemName('');
    setItemDescription('');
    setQtyRemaining('');
    setQtyMetricUnit('');
    setQtyRestockThreshold('');
    setAssignedTo('');
    setDateOfLastOrder('');
    setReorderReminder(false);
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
    <Container maxWidth="sm">
      <div className="update-inventory">
        <h2 style={{"margin":"20px"}}>Update Inventory</h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Action"
                variant="outlined"
                value={action}
                onChange={(e) => setAction(e.target.value)}
              >
                <MenuItem value="">Select Action</MenuItem>
                <MenuItem value="add">Add</MenuItem>
                <MenuItem value="update">Update/Edit</MenuItem>
                <MenuItem value="transfer">Transfer</MenuItem>
              </TextField>
            </Grid>
            {/* Other form fields */}
            <Grid item xs={12}>
              <TextField fullWidth label="Item Name" type="string" variant="outlined" value={itemName} onChange={(e) => setItemName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Item Description" type="string" variant="outlined" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Quantity" type="string" variant="outlined" value={quantity} onChange={(e) => setQtyRemaining(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Unit" type="string" variant="outlined" value={unit} onChange={(e) => setQtyMetricUnit(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Reorder Threshold" type="string" variant="outlined" value={reorderThreshold} onChange={(e) => setQtyRestockThreshold(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Assigned To" type="string" variant="outlined" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth  type="date" variant="outlined" value={date} onChange={(e) => setDateOfLastOrder(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={reorderReminder} onChange={(e) => setReorderReminder(e.target.checked)} />} label="Reorder Reminder Notification" />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">Submit</Button>
              <Button type="button" variant="contained" onClick={handleReset} style={{backgroundColor:"red"}}>Reset</Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    <Snackbar
    open={openSnackbar}
    autoHideDuration={6000}
    onClose={handleSnackbarClose}
    message={"Inventory Changes made successfully "}
  />
  </>
  );
}

export default UpdateInventory;
