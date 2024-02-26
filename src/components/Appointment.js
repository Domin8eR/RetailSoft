import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase.config.js';
import { collection, addDoc } from "@firebase/firestore";
import { firestore } from "../firebase.config.js";
import "./appointment.css";

const Appointment = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const ref = collection(firestore, "digitylics");

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
        const setRemainder = e.target.setRemainder.checked;
        const thankyouNotification = e.target.thankyouNotification.checked;
        const visit = e.target.visit.checked;

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
            alert("Message Sent");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div className="appointment">
            <h2>Appointment Form</h2>
            <form onSubmit={addPost}>
                <label htmlFor="username">Username</label>
                <br />
                <input type="text" placeholder='username' name='username' />
                <br />
                <br />
                <label htmlFor="mobno">Mobile Number</label>
                <br />
                <input type="text" placeholder='mob no' name='mobno' />
                <br />
                <br />
                <label htmlFor="email">Email</label>
                <br />
                <input type="text" placeholder='Email' name='email' />
                <br />
                <br />
                <label htmlFor="datevisit">Date of Visit</label>
                <br />
                <input type="date" placeholder='date of Visit' name='dov' />
                <br />
                <br />
                <label htmlFor="timevisit">Time of Visit</label>
                <br />
                <input type="time" placeholder='Time of Visit' name='tov' />
                <br />
                <br />

                {isAdmin && (
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked name='setRemainder' />} label="Send Reminder Notification" />
                        <FormControlLabel control={<Checkbox name='thankyouNotification' />} label="Send Thank You Notification" required />
                        <FormControlLabel control={<Checkbox name='visit' />} label="Visit Completed" required />
                    </FormGroup>
                )}

                <button>Submit</button>
            </form>
        </div>
    );
}

export default Appointment;
