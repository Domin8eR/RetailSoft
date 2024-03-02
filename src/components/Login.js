
import './auth.css';
import { useEffect, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase.config.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';


const Login=() =>{
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({})


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (result) => {
      if (result) {

        const {displayName, email} = result
        setUserData({ displayName, email })

        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }

    })

    return () => unsubscribe();
  },[])
  
  const SignUpUsingGoogle =  () => {
    // alert("CL:ICJKED ON THE LOGIN NUTTON")
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {

        const { displayName, email } = result.user;
        setUserData({ displayName, email })
        toast.success("Welcome " + displayName);
        setTimeout(() => {
          setIsLoggedIn(true);
          navigate('/appointment');
        }, 3000); // Delay the navigation for 1000 milliseconds (1 second)
      })
      .catch((error) => {

        console.log({ error });

      });
      
      
  }

  const Logout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setUserData({})
      setIsLoggedIn(false)
    }).catch((error) => {
      // An error happened.
      console.log({ error });
    });
  }

  return (
    <div className="App">
      <ToastContainer/>
      {!isLoggedIn &&
        <button onClick={SignUpUsingGoogle}  type="button" className="login-with-google-btn"  style={{backgroundColor:"#8F00FF",color:"#fff"}}    >
          Login With Google
        </button>
      }

      {isLoggedIn &&
        <div className="wrapper">
          {/* <div className="profile-card js-profile-card">

           

            {/* <div className="profile-card__cnt js-profile-cnt">
              <div className="profile-card__name">{userData.displayName}</div>
              <div className="profile-card__txt">{userData.email}</div>
              <div className="profile-card-loc">
              </div>
              <div className="profile-card-ctr">
                <button className="profile-card__button button--orange" onClick={Logout}>Log out</button>
              </div>
            </div> */}

          {/* </div> */} 
        </div>
      }



    </div>
  );
}

export default Login;