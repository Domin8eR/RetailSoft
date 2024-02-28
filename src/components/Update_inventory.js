// import React, { useState, useEffect } from 'react';
// import { initializeApp } from 'firebase/app';
// import { useNavigate } from 'react-router-dom';
// import './Update_inventory.css';
// import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// function UpdateInventory() {
//   const [action, setAction] = useState('');
//   const [itemName, setItemName] = useState('');
//   const [itemDescription, setItemDescription] = useState('');
//   const [quantity, setQtyRemaining] = useState('');
//   const [unit, setQtyMetricUnit] = useState('');
//   const [reorderThreshold, setQtyRestockThreshold] = useState('');
//   const [assignedTo, setAssignedTo] = useState('');
//   const [date, setDateOfLastOrder] = useState('');
//   const [reorderReminder, setReorderReminder] = useState(false);
//   const [peopleList, setPeopleList] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const firebaseConfig = {
//       apiKey: "AIzaSyCp7fQThMsjliwo-86_ToB-dBez5WrVrhE",
//       authDomain: "retailsoft-b6089.firebaseapp.com",
//       projectId: "retailsoft-b6089",
//       storageBucket: "retailsoft-b6089.appspot.com",
//       messagingSenderId: "329182148622",
//       appId: "1:329182148622:web:c6114d929298280f2ea45f",
//       databaseURL: "https://retailsoft-b6089-default-rtdb.firebaseio.com",
//     };
//     const firebaseApp = initializeApp(firebaseConfig);
//     const db = getFirestore();

//     const fetchData = async () => {
//       const peopleCollection = collection(db, 'people');
//       const querySnapshot = await getDocs(peopleCollection);
//       const peopleArray = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         name: doc.data().name
//       }));
//       setPeopleList(peopleArray);
//     };

//     fetchData();
//   }, []); 

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const firebaseConfig = {
//       apiKey: "AIzaSyCp7fQThMsjliwo-86_ToB-dBez5WrVrhE",
//       authDomain: "retailsoft-b6089.firebaseapp.com",
//       projectId: "retailsoft-b6089",
//       storageBucket: "retailsoft-b6089.appspot.com",
//       messagingSenderId: "329182148622",
//       appId: "1:329182148622:web:c6114d929298280f2ea45f",
//       databaseURL: "https://retailsoft-b6089-default-rtdb.firebaseio.com",
//     };
    
//     const firebaseApp = initializeApp(firebaseConfig);
//     const db = getFirestore();

//     const data = {
//       action,
//       itemName,
//       itemDescription,
//       quantity,
//       unit,
//       reorderThreshold,
//       assignedTo,
//       date,
//       reorderReminder
//     };

//     try {
//       const docRef = await addDoc(collection(db, 'inventory'), data);
//       console.log('Document written with ID: ', docRef.id);
//       console.log('Data sent to Firestore successfully!');
//       handleReset();
//       navigate('/Inventory_list', { state: { updatedDate: date } });
//     } catch (error) {
//       console.error('Error sending data to Firestore: ', error);
//     }
//   };

//   const handleReset = () => {
//     setAction('');
//     setItemName('');
//     setItemDescription('');
//     setQtyRemaining('');
//     setQtyMetricUnit('');
//     setQtyRestockThreshold('');
//     setAssignedTo('');
//     setDateOfLastOrder('');
//     setReorderReminder(false);
//   };

//   return (
//     <div>
//       <h2>Update Inventory</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="action">Action:</label>
//           <select id="action" value={action} onChange={(e) => setAction(e.target.value)}>
//             <option value="">Select Action</option>
//             <option value="add">Add</option>
//             <option value="update">Update/Edit</option>
//             <option value="transfer">Transfer</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="itemName">Item Name:</label>
//           <input type="text" id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="itemDescription">Item Description:</label>
//           <input type="text" id="itemDescription" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="quantity">Quantity:</label>
//           <input type="text" id="quantity" value={quantity} onChange={(e) => setQtyRemaining(e.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="unit">Unit:</label>
//           <input type="text" id="unit" value={unit} onChange={(e) => setQtyMetricUnit(e.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="reorderThreshold">Reorder Threshold:</label>
//           <input type="text" id="reorderThreshold" value={reorderThreshold} onChange={(e) => setQtyRestockThreshold(e.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="assignedTo">Assigned To:</label>
//           <input type="text" id="assignedTo" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="date">Date:</label>
//           <input type="date" id="date" value={date} onChange={(e) => setDateOfLastOrder(e.target.value)} />
//         </div>
//         <div>
//           <input type="checkbox" id="reorderReminder" checked={reorderReminder} onChange={(e) => setReorderReminder(e.target.checked)} />
//           <label htmlFor="reorderReminder">Reorder Reminder Notification</label>
//         </div>
//         <button type="submit">Submit</button>
//         <button type="button" onClick={handleReset}>Reset</button>
//       </form>
//     </div>
//   );
// }

// export default UpdateInventory;

import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import './Update_inventory.css';

function UpdateInventory() {
  const [action, setAction] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [quantity, setQtyRemaining] = useState('');
  const [unit, setQtyMetricUnit] = useState('');
  const [reorderThreshold, setQtyRestockThreshold] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [date, setDateOfLastOrder] = useState('');
  const [reorderReminder, setReorderReminder] = useState(false);
  const [peopleList, setPeopleList] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const firebaseConfig = {
      apiKey:process.env.REACT_APP_API_KEY,
  authDomain: "digilytics-80f52.firebaseapp.com",
  projectId: "digilytics-80f52",
  storageBucket: "digilytics-80f52.appspot.com",
  messagingSenderId: "365028667698",
  appId: "1:365028667698:web:ef9ac5217209ee655be72b"
    };
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore();

    // Fetch data if needed
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firebaseConfig = {
      apiKey:process.env.REACT_APP_API_KEY,
  authDomain: "digilytics-80f52.firebaseapp.com",
  projectId: "digilytics-80f52",
  storageBucket: "digilytics-80f52.appspot.com",
  messagingSenderId: "365028667698",
  appId: "1:365028667698:web:ef9ac5217209ee655be72b"
    };
    
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore();

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

    try {
      const docRef = await addDoc(collection(db, 'inventory'), data);
      console.log('Document written with ID: ', docRef.id);
      console.log('Data sent to Firestore successfully!');
      handleReset();
      navigate('/Inventory_list', { state: { updatedDate: date } });
    } catch (error) {
      console.error('Error sending data to Firestore: ', error);
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
        <input type="text" id="quantity" value={quantity} onChange={(e) => setQtyRemaining(e.target.value)} />
      </div>
      <div>
        <label htmlFor="unit">Unit:</label>
        <input type="text" id="unit" value={unit} onChange={(e) => setQtyMetricUnit(e.target.value)} />
      </div>
      <div>
        <label htmlFor="reorderThreshold">Reorder Threshold:</label>
        <input type="text" id="reorderThreshold" value={reorderThreshold} onChange={(e) => setQtyRestockThreshold(e.target.value)} />
      </div>
      <div>
        <label htmlFor="assignedTo">Assigned To:</label>
        <input type="text" id="assignedTo" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={date} onChange={(e) => setDateOfLastOrder(e.target.value)} />
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
