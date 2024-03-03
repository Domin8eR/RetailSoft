import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';

function TransferTable() {
  const [transferData, setTransferData] = useState([]);
  const [filteredTransferData, setFilteredTransferData] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    dateFrom: '',
    dateTo: '',
    assignedTo: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const unsubscribe = onSnapshot(collection(db, 'inventory'), (snapshot) => {
        const transferItems = [];
        snapshot.forEach((doc) => {
          const item = { id: doc.id, ...doc.data() };
          if (item.action === 'transfer') {
            transferItems.push(item);
          }
        });
        setTransferData(transferItems);
        setFilteredTransferData(transferItems); // Set filtered data initially to all data
      });

      // Unsubscribe from snapshot listener when component unmounts
      return () => unsubscribe();
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    // Filter transferData based on search criteria
    const filteredData = transferData.filter((item) => {
      const dateFromMatch = !searchCriteria.dateFrom || new Date(item.date) >= new Date(searchCriteria.dateFrom);
      const dateToMatch = !searchCriteria.dateTo || new Date(item.date) <= new Date(searchCriteria.dateTo);
      const assignedToMatch = !searchCriteria.assignedTo || item.assignedTo.toLowerCase().includes(searchCriteria.assignedTo.toLowerCase());
      // For date range search, if both dateFrom and dateTo are provided, we need to check both conditions
      if (searchCriteria.dateFrom && searchCriteria.dateTo) {
        return dateFromMatch && dateToMatch && assignedToMatch;
      } else {
        // For single field search (either date range or assignedTo), we just need to check that particular field
        return dateFromMatch || dateToMatch || assignedToMatch;
      }
    });
    setFilteredTransferData(filteredData); // Maintain a separate state for filtered data
  };

  return (
    <div className="read">
      <div className="tansferReport">
        <h1>Transfer Report</h1>
        <br/>
      </div>
      <div className='searchContainer'>
        <input
          type="date"
          placeholder="Date From"
          value={searchCriteria.dateFrom}
          onChange={(e) => setSearchCriteria({ ...searchCriteria, dateFrom: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date To"
          value={searchCriteria.dateTo}
          onChange={(e) => setSearchCriteria({ ...searchCriteria, dateTo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Assigned To"
          value={searchCriteria.assignedTo}
          onChange={(e) => setSearchCriteria({ ...searchCriteria, assignedTo: e.target.value })}
        />
        <button onClick={handleSearch} style={{backgroundColor:"#1976d2"}}>Search</button>
      </div>

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
            {filteredTransferData.map((row, index) => (
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
