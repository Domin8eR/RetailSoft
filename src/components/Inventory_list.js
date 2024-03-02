import React, { useState, useEffect } from 'react';
import { collection, getFirestore, onSnapshot, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom'; 
import './Inventory_list.css';

function BasicTable() {
  const [data, setData] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook for programmatic navigation

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const querySnapshot = await onSnapshot(collection(db, 'inventory'), (snapshot) => {
        const newData = [];
        snapshot.forEach((doc) => {
          const item = { id: doc.id, ...doc.data() };
          if (!isEmptyObject(item)) {
            newData.push(item);
          }
        });
        setData(newData);
      });

      const accountsCollection = collection(db, 'accounts');
      const accountsSnapshot = await onSnapshot(accountsCollection, (snapshot) => {
        const accountsData = [];
        snapshot.forEach((doc) => {
          accountsData.push({ id: doc.id, ...doc.data() });
        });
        setAccounts(accountsData);
      });
    };

    fetchData();
  }, []);

  const handleEdit = (item) => {
    setEditedItem(item);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    const db = getFirestore();
    await deleteDoc(doc(db, 'inventory', id));
  };

  

  const handleTransferClose = () => {
    setAnchorEl(null);
  };

  const handleTransferSelect = (accountId) => {
    setSelectedAccount(accountId);
    setAnchorEl(null);
  };

  const handleTransfer = async (id) => {
    const db = getFirestore();
    await updateDoc(doc(db, 'inventory', id), { assignedTo: selectedAccount });
  };

  const handleFormSubmit = async (editedData) => {
    const db = getFirestore();
    await updateDoc(doc(db, 'inventory', editedData.id), editedData);
    setIsEditing(false);
    setEditedItem(null);
  };

  const handleTransferAction = (event, row) => {
    if( row.action = "transfer"){
      navigate('/update_inventory', { state: { ...row, action: "transfer" }});
    }
    else if( row.action = "add"){
      navigate('/update_inventory', { state: { ...row, action: "add" }});
    }

   
  };

  // Function to check if an object is empty
  const isEmptyObject = (obj) => {
    return Object.values(obj).every(value => value === '' || value === false || value === null);
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SR No.</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Item Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Reorder Threshold</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Reorder Reminder</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              // Conditional rendering based on action
              row.action !== 'transfer' && (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.action}</TableCell>
                  <TableCell>{row.itemName}</TableCell>
                  <TableCell>{row.itemDescription}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.unit}</TableCell>
                  <TableCell>{row.reorderThreshold}</TableCell>
                  <TableCell>{row.assignedTo}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.reorderReminder ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <IconButton sx={{color:"white"}} aria-label="edit" onClick={(event) => handleTransferAction(event, row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton sx={{color:"black" ,"backgroundColor":"red"}} aria-label="delete" onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton sx={{color:"white"}} aria-label="transfer" onClick={(event) => handleTransferAction(event, row)}>
                      <TransferWithinAStationIcon />
                    </IconButton>
  
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleTransferClose}
                    >
                      {accounts.map((account) => (
                        <MenuItem key={account.id} onClick={() => handleTransferSelect(account.id)}>
                          {account.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </TableCell>
                </TableRow>
              )
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor:"blue",
          color:"white"
        }}
        color="primary"
        aria-label="add"
        onClick={() => navigate('/Update_inventory')}
      >
        <AddIcon fontSize="large" />
      </IconButton>
      {isEditing && (
        <EditForm
          editedItem={editedItem}
          handleFormSubmit={handleFormSubmit}
        />
      )}
    </React.Fragment>
  );
}

function EditForm({ editedItem, handleFormSubmit }) {
  const [formData, setFormData] = useState(editedItem);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(formData);
  };

  return (
    <div></div>
  );
}

export default BasicTable;
