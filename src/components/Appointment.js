import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "@firebase/firestore";
import { firestore } from "../firebase.config.js";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { auth } from '../firebase.config.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import "./appointment.css";
import { useNavigate } from 'react-router-dom';

const Appointment = (props) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const ref = collection(firestore, "appoinement");
    const navigate = useNavigate(); // useNavigate hook

    const [formValues, setFormValues] = useState({
        username: '',
        mobno: '',
        email: '',
        dov: '',
        tov: '',
        setRemainder: false,
        thankyouNotification: false,
        visit: false,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email } = user;
                setUserData({ displayName, email });
                setIsLoggedIn(true);
                // Check if the user's email is admin email
                if (email === 'piyushlenka02@gmail.com') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const addPost = async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        try {
            await addDoc(ref, formValues);
            console.log("Document successfully written!");
            toast.success("Appointment Booked successfully");
            setTimeout(() => {
                navigate("/home"); 
            }, 3000); // Delay the navigation for 3000 milliseconds (3 seconds)
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    // Function to format date as DD-MM-YYYY
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleInputChange = (e) => {
        const { name, value, checked, type } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormValues({ ...formValues, [name]: newValue });
    };

    const handleReset = (e) => {
        e.preventDefault();
        setFormValues({
            username: '',
            mobno: '',
            email: '',
            dov: '',
            tov: '',
            setRemainder: false,
            thankyouNotification: false,
            visit: false,
        });
    };

    const isFormValid = () => {
        const { username, mobno, email, dov, tov } = formValues;
        return username && mobno && email && dov && tov;
    };

    return (
        <Container maxWidth="sm">
            <ToastContainer/>
            <div className="appointment">
                <h2 style={{ margin:"20px"}}>Appointment Form</h2>
                <form onSubmit={addPost} >
                    <Grid container spacing={4}>    
                        <Grid item xs={12}>
                            <TextField fullWidth label="Customer Name" variant="outlined" type="string" placeholder="Customer Name" name="username" value={formValues.username} onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Mobile Number" variant="outlined" type="string" placeholder="Mobile Number" name="mobno" value={formValues.mobno} onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Email" variant="outlined" type="email" placeholder="Email" name="email" value={formValues.email} onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={15}>
                            <TextField fullWidth label="Date of Visit" variant="outlined" type="date" placeholder="Date of Visit" name="dov" InputLabelProps={{ shrink: true }} value={formValues.dov} onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={15}>
                            <TextField fullWidth label="Time of Visit" variant="outlined" type="time" placeholder="Time of Visit" name="tov" InputLabelProps={{ shrink: true }} value={formValues.tov} onChange={handleInputChange} />
                        </Grid>
                        
                        
                        {isAdmin && (
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox name='setRemainder' checked={formValues.setRemainder} onChange={handleInputChange} />} label="Send Reminder Notification" />
                                    <FormControlLabel control={<Checkbox name='thankyouNotification' checked={formValues.thankyouNotification} onChange={handleInputChange} />} label="Send Thank You Notification" required />
                                    <FormControlLabel control={<Checkbox name='visit' checked={formValues.visit} onChange={handleInputChange} />} label="Visit Completed" required />
                                </FormGroup>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" style={{margin:"15px"}} disabled={!isFormValid()}>Submit</Button>
                            <Button type="reset" variant="contained" color="primary" onClick={handleReset} style={{backgroundColor:"red",margin:"15px"}}>Reset</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Appointment;
