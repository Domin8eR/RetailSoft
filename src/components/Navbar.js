import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase.config.js';
import Button from '@mui/material/Button';

const pages = ['Services', 'Inventory List', 'Update_inventory', 'Service_List', 'Transfer_List'];
const settings = ['Login'];
const adminEmail = [process.env.REACT_APP_ADMIN_EMAIL1, process.env.REACT_APP_ADMIN_EMAIL2, process.env.REACT_APP_ADMIN_EMAIL3];


function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState({});
  const [adminEmails, setAdminEmails] = useState([]);
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);
  const [inventoryAnchorEl, setInventoryAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setAdminEmails(adminEmail);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email } = user;
        setUserData({ displayName, email });
        setIsLoggedIn(true);

        // Check if the user's email is in the array of admin emails
        if (adminEmails.includes(email)) {
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

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const SignUpUsingGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email } = result.user;
        setUserData({ displayName, email });
        setIsLoggedIn(true);
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
        navigate('/home');
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const loginnnn = () => {
    navigate('/login');
  };

  const handleMenuClick = (event, anchor) => {
    if (anchor === 'services') {
      setServicesAnchorEl(event.currentTarget);
    } else if (anchor === 'inventory') {
      setInventoryAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = (anchor) => {
    if (anchor === 'services') {
      setServicesAnchorEl(null);
    } else if (anchor === 'inventory') {
      setInventoryAnchorEl(null);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <img src="/ReteLogo.svg" alt="Rete Logo" style={{ height: 30, marginRight: 10 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              RetailSoft
            </Typography>
              
            
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/* Services dropdown */}
              {isLoggedIn && adminEmails.includes(userData.email) &&(
              <Button
                aria-haspopup="true"
                aria-controls="services-menu"
                onClick={(event) => handleMenuClick(event, 'services')}
                color="inherit"
                style={{backgroundColor:"#1976d2"}}
              >
                Services
              </Button>
              )}
              <Menu
                id="services-menu"
                anchorEl={servicesAnchorEl}
                keepMounted
                open={Boolean(servicesAnchorEl)}
                onClose={() => handleMenuClose('services')}
              >
                {['Services', 'Service List'].map((page, index) => (
                  <MenuItem
                    key={index}
                    component={Link}
                    to={`/${page.toLowerCase().replace(/\s+/g, '_')}`}
                    onClick={() => handleMenuClose('services')}
                  >
                    {page}
                  </MenuItem>
                ))}
              </Menu>

              {/* Inventory dropdown */}
              {isLoggedIn && adminEmails.includes(userData.email) &&(
              <Button
                aria-haspopup="true"
                aria-controls="inventory-menu"
                onClick={(event) => handleMenuClick(event, 'inventory')}
                color="inherit"
                style={{backgroundColor:"#1976d2"}}
              >
                Inventory
              </Button>
              )}
              <Menu
                id="inventory-menu"
                anchorEl={inventoryAnchorEl}
                keepMounted
                open={Boolean(inventoryAnchorEl)}
                onClose={() => handleMenuClose('inventory')}
              >
                {['Inventory List', 'Update Inventory', 'Transfer List'].map((page, index) => (
                  <MenuItem
                    key={index}
                    component={Link}
                    to={`/${page.toLowerCase().replace(/\s+/g, '_')}`}
                    onClick={() => handleMenuClose('inventory')}
                  >
                    {page}
                  </MenuItem>
                ))}
              </Menu>
              
              {/* Conditionally render Details link */}
              {isLoggedIn && adminEmails.includes(userData.email) && (
                <Button
                  key="Details"
                  component={Link}
                  to="/details"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Details
                </Button>
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings" sx={{ display: 'flex', justifyContent: 'space-between' }} >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={index} onClick={isLoggedIn ? Logout : loginnnn}>
                    <Typography textAlign="center">{isLoggedIn ? 'Logout' : 'Login'}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Navbar;
