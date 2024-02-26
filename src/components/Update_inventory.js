import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, child, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

function UpdateInventory() {
  const [action, setAction] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [reorderThreshold, setReorderThreshold] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const [reorderReminder, setReorderReminder] = useState(false);
  const [peopleList, setPeopleList] = useState([]); // State to store the list of people

  useEffect(() => {
    const firebaseConfig = {
      apiKey :"AIzaSyC_cBI5oP33hQC5G1qd7B7KBZuFOp69lVk",
      authDomain: "digilytics-80f52.firebaseapp.com",
      projectId: "digilytics-80f52",
      storageBucket: "digilytics-80f52.appspot.com",
      messagingSenderId: "365028667698",
      appId: "1:365028667698:web:ef9ac5217209ee655be72b"
    };
    const firebaseApp = initializeApp(firebaseConfig);

    const database = getDatabase();

    // Fetch the list of people from Firebase and populate the state
    const peopleRef = ref(database, 'people');
    get(peopleRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const peopleData = snapshot.val();
          const peopleArray = Object.keys(peopleData).map((key) => ({
            id: key,
            name: peopleData[key].name // Assuming each person object has a "name" field
          }));
          setPeopleList(peopleArray);
        }
      })
      .catch((error) => {
        console.error('Error fetching people list from Firebase: ', error);
      });
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const database = getDatabase();
    const data = {
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

    push(ref(database, 'inventory'), data)
      .then(() => {
        console.log('Data sent to Firebase successfully!');
        handleReset();
        navigate('/Inventory_list', { state: { updatedDate: date } });
      })
      .catch((error) => {
        console.error('Error sending data to Firebase: ', error);
      });
  };

  const handleReset = () => {
    setAction('');
    setItemName('');
    setItemDescription('');
    setQuantity('');
    setUnit('');
    setReorderThreshold('');
    setAssignedTo('');
    setDate('');
    setReorderReminder(false);
  };

  return (
    <div>
      <h2>Update Inventory</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="action">Action:</label>
          <select id="action" value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="">Select Action</option>
            <option value="add">Add</option>
            <option value="update">Update/Edit</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>
        <div>
          <label htmlFor="itemName">Item Name:</label>
          <input type="text" id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="itemDescription">Item Description:</label>
          <input type="text" id="itemDescription" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input type="text" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div>
          <label htmlFor="unit">Unit:</label>
          <input type="text" id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} />
        </div>
        <div>
          <label htmlFor="reorderThreshold">Reorder Threshold:</label>
          <input type="text" id="reorderThreshold" value={reorderThreshold} onChange={(e) => setReorderThreshold(e.target.value)} />
        </div>
        <div>
          <label htmlFor="assignedTo">Assigned To:</label>
          <select id="assignedTo" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
            <option value="">Select Person</option>
            {peopleList.map((person) => (
              <option key={person.id} value={person.name}>{person.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
          
        </div>
        <div>
          <input type="checkbox" id="reorderReminder" checked={reorderReminder} onChange={(e) => setReorderReminder(e.target.checked)} />
          <label htmlFor="reorderReminder">Reorder Reminder Notification</label>
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
    </div>
  );
}

export default UpdateInventory;
