import './auth.css';
import { useEffect, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase.config.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (result) => {
      if (result) {
        const { displayName, email } = result;
        setUserData({ displayName, email });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const SignUpUsingGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email } = result.user;
        setUserData({ displayName, email });
        // toast.success("Welcome " + displayName);
        setOpenSnackbar(true);
        setTimeout(() => {
          setIsLoggedIn(true);
          navigate('/appointment');
        }, 3000); // Delay the navigation for 3000 milliseconds (3 seconds)
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const Logout = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <div className="App">
      <div className="logginPage"></div>
      <ToastContainer />
      {!isLoggedIn && (
        <button
          onClick={SignUpUsingGoogle}
          type="button"
          className="login-with-google-btn googleloggin"
          style={{ backgroundColor: "#8F00FF", color: "#fff" }}
        >
          Login With Google
        </button>
      )}

      {isLoggedIn && (
        <div className="wrapper">
          {/* Your profile card or other content */}
        </div>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={`Welcome ${userData.displayName || userData.email}`}
      />
    </div>
  );
};

export default Login;
