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

        const username = e.target.username.value;
        const mobno = e.target.mobno.value;
        const email = e.target.email.value;
        const dov = e.target.dov.value;
        const tov = e.target.tov.value;
        const setRemainder = e.target.setRemainder ? e.target.setRemainder.checked : false;
        const thankyouNotification = e.target.thankyouNotification ? e.target.thankyouNotification.checked : false;
        const visit = e.target.visit ? e.target.visit.checked : false;

        let data = {
            username: username,
            mobno: mobno,
            email: email,
            dov: dov,
            tov: tov,
            setRemainder: setRemainder,
            thankyouNotification: thankyouNotification,
            visit: visit,
        };

        try {
            await addDoc(ref, data);
            console.log("Document successfully written!");
            toast.success("Appointment Booked successFully");
            setTimeout(() => {
              navigate("/home"); 
            }, 3000); // Delay the navigation for 1000 milliseconds (1 second)
            // Navigate to home after successful submission
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleReset = (e) => {
        e.preventDefault();
        const form = e.target.form;
        form.reset();
    };

    return (
        <Container maxWidth="sm">
            <ToastContainer/>
            <div className="appointment">
                <h2 style={{margin:"20px"}}>Appointment Form</h2>
                <form onSubmit={addPost}>
                    <Grid container spacing={4}>    
                        <Grid item xs={12}>
                            <TextField fullWidth label="Customer Name" variant="outlined" type="string" placeholder="Customer Name" name="Customer Name" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Mobile Number" variant="outlined" type="string" placeholder="Mobile Number" name="mobno" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Email" variant="outlined" type="email" placeholder="Email" name="email" />
                        </Grid>
                        <Grid item xs={15}>
                            <TextField fullWidth  label="Date of Visit" variant="outlined" type="date" placeholder="Date of Visit" name="dov" InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={15}>
                            <TextField fullWidth label="Time of Visit" variant="outlined" type="time" placeholder="Time of Visit" name="tov" InputLabelProps={{ shrink: true }} />
                        </Grid>
                        
                        
                        {isAdmin && (
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox name='setRemainder' />} label="Send Reminder Notification" />
                                    <FormControlLabel control={<Checkbox name='thankyouNotification' />} label="Send Thank You Notification" required />
                                    <FormControlLabel control={<Checkbox name='visit' />} label="Visit Completed" required />
                                </FormGroup>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" style={{margin:"15px"}}>Submit</Button>
                            <Button type="submit" variant="contained" color="primary" onClick={handleReset} style={{backgroundColor:"red",margin:"15px"}}>Reset</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Appointment;
