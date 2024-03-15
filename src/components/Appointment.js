import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
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
import Snackbar from '@mui/material/Snackbar';

const Appointment = (props) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const ref = collection(firestore, "appointment");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate(); // useNavigate hook

    const [formValues, setFormValues] = useState({
        username: '',
        mobno: '',
        email: '',
        dov: '',
        tov: '',
        setReminder: false,
        thankYouNotification: false,
        visitCompleted: false,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email } = user;
                setUserData({ displayName, email });
                setIsLoggedIn(true);
                // Check if the user's email is admin email
                if (email === process.env.REACT_APP_ADMIN_EMAIL1 || email === process.env.REACT_APP_ADMIN_EMAIL2 || email === process.env.REACT_APP_ADMIN_EMAIL3 || email === process.env.REACT_APP_ADMIN_EMAIL4 ) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
                // Prefill form fields with user data
                setFormValues(prevValues => ({
                    ...prevValues,
                    username: displayName || '',
                    email: email || '',
                }));
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
            setOpenSnackbar(true);
            setTimeout(() => {
                navigate("/home");
            }, 3000); // Delay the navigation for 3000 milliseconds (3 seconds)
        } catch (error) {
            console.error("Error adding document: ", error);
        }
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
            setReminder: false,
            thankYouNotification: false,
            visitCompleted: false,
        });
    };

    const isFormValid = () => {
        const { username, mobno, email, dov, tov } = formValues;
        return username && mobno && email && dov && tov;
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <Container maxWidth="sm">
                <div className="appointment">
                    <h2 style={{ margin: "20px" }}>Appointment Form</h2>
                    <form onSubmit={addPost} >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Customer Name" variant="outlined" type="string" placeholder="Customer Name" name="username" value={formValues.username} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Mobile Number" variant="outlined" type="string" placeholder="Mobile Number" name="mobno" value={formValues.mobno} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Email" variant="outlined" type="email" placeholder="Email" name="email" value={formValues.email} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Date of Visit" variant="outlined" type="date" placeholder="Date of Visit" name="dov" InputLabelProps={{ shrink: true }} value={formValues.dov} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Time of Visit" variant="outlined" type="time" placeholder="Time of Visit" name="tov" InputLabelProps={{ shrink: true }} value={formValues.tov} onChange={handleInputChange} />
                            </Grid>

                            {isAdmin && (
                                <Grid item xs={12}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox name='setReminder' checked={formValues.setReminder} onChange={handleInputChange} />} label="Send Reminder Notification" />
                                        <FormControlLabel control={<Checkbox name='thankYouNotification' checked={formValues.thankYouNotification} onChange={handleInputChange} />} label="Send Thank You Notification" required />
                                        <FormControlLabel control={<Checkbox name='visitCompleted' checked={formValues.visitCompleted} onChange={handleInputChange} />} label="Visit Completed" required />
                                    </FormGroup>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" style={{ margin: "15px" }} disabled={!isFormValid()}>Submit</Button>
                                <Button type="reset" variant="contained" color="primary" onClick={handleReset} style={{ backgroundColor: "red", margin: "15px" }}>Reset</Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={"Appointment Booked Successfully"}
            />
        </>
    );
}

export default Appointment;
