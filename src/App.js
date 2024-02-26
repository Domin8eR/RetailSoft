import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Appointment from './components/Appointment';
import Navbar from './components/Navbar';
import "./App.css";
import Read from './components/read';
import EmployeeWorkLog from './components/EmployeeWorkLog';
import Auth from './components/Login';
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged
import { auth } from './firebase.config'; // Import auth from firebase.js (assuming firebase.js is in the same directory)
import UpdateInventory from './components/Update_inventory';
import BasicTable from './components/Inventory_list';


// Import necessary components and dependencies

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} />
        <div>
          <Routes>
            {/* Public Routes */}
            <Route exact path="/login" element={<Auth />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/" element={<Home />} />

            {/* Protected Routes */}
            {isLoggedIn && (
              <>
               <Route path="/update_inventory" element={<UpdateInventory />} />
        <Route path="/inventory_list" element={<BasicTable/>} />
                <Route exact path="/appointment" element={<Appointment />} />
                <Route exact path="/details" element={<Read />} />
                <Route exact path="/appointments" element={<EmployeeWorkLog />} />
              </>
            )}

            {/* Add more routes here */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
// import Home from './components/Home';
// import Appointment from './components/Appointment';
// import Navbar from './components/Navbar';
// import "./App.css";
// import Read from './components/read';
// import EmployeeWorkLog from './components/EmployeeWorkLog';
// import Auth from './components/Login';

// const App = () => {
//   return (
//     <>
//     <Router>
//     <Navbar/>
//     <div>
//         <Routes>
//           <Route exact path="/home" element={<Home/>}/>
//           <Route exact path="/" element={<Home/>} />
//           <Route exact path="/appointment" element={<Appointment/>} />
//           <Route exact path="/details" element={<Read/>} />
//           <Route exact path="/appointments" element={<EmployeeWorkLog/>} />
//           <Route exact path="/login" element={<Auth/>} />
//         </Routes>
     

//     </div>
//     </Router>
//     </>
//   );
// }

// export default App;