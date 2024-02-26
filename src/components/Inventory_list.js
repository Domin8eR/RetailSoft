import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue, remove, update } from 'firebase/database';
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
import { useLocation } from 'react-router-dom';

function BasicTable() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [updatedDate, setUpdatedDate] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.updatedDate) {
      setUpdatedDate(location.state.updatedDate);
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      const database = getDatabase();
      const dataRef = ref(database, 'inventory');

      onValue(dataRef, (snapshot) => {
        const newData = snapshot.val();
        if (newData) {
          const rows = Object.keys(newData).map((key) => ({
            id: key,
            ...newData[key]
          }));
          setData(rows);
        } else {
          setData([]);
        }
      });
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/Update_inventory/${id}`);
  };

  const handleDelete = (id) => {
    const database = getDatabase();
    const dataRef = ref(database, `inventory/${id}`);

    remove(dataRef)
      .then(() => {
        console.log('Data deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting data: ', error);
      });
  };

  const handleUpdateDate = (id, dateLastOrder) => {
    const database = getDatabase();
    const dataRef = ref(database, `inventory/${id}`);

    update(dataRef, { dateLastOrder })
      .then(() => {
        console.log('Date updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating date: ', error);
      });
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SR No.</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Item Description</TableCell>
              <TableCell>Qty Remaining</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Date of Last Order</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.itemName}</TableCell>
                <TableCell>{row.itemDescription}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.assignedTo}</TableCell>
                <TableCell>{row.dateLastOrder}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit" onClick={() => handleEdit(row.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="transfer">
                    <TransferWithinAStationIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
        }}
        color="primary"
        aria-label="add"
        onClick={() => navigate('/Update_inventory')}
      >
        <AddIcon fontSize="large" />
      </IconButton>
    </React.Fragment>
  );
}

export default BasicTable;
