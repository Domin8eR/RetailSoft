import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';

function TransferTable() {
  const [transferData, setTransferData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const querySnapshot = await onSnapshot(collection(db, 'inventory'), (snapshot) => {
        const transferItems = [];
        snapshot.forEach((doc) => {
          const item = { id: doc.id, ...doc.data() };
          if (item.action === 'transfer') {
            transferItems.push(item);
          }
        });
        setTransferData(transferItems);
      });
    };

    fetchData();
  }, []);

  return (
    <div className="read">
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'blue' }}>
            <TableCell sx={{ color: 'white' }}>SR No.</TableCell>
            <TableCell sx={{ color: 'white' }}>Action</TableCell>
            <TableCell sx={{ color: 'white' }}>Item Name</TableCell>
            <TableCell sx={{ color: 'white' }}>Item Description</TableCell>
            <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
            <TableCell sx={{ color: 'white' }}>Unit</TableCell>
            <TableCell sx={{ color: 'white' }}>Reorder Threshold</TableCell>
            <TableCell sx={{ color: 'white' }}>Assigned To</TableCell>
            <TableCell sx={{ color: 'white' }}>Date</TableCell>
            <TableCell sx={{ color: 'white' }}>Reorder Reminder</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transferData.map((row, index) => (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default TransferTable;
