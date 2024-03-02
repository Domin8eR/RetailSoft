import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import AdbIcon from '@mui/icons-material/Adb';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase.config.js';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';

const pages = ['Services','Inventory_list', 'Update_inventory','Service_List','Transfer_List'];
const settings = ['Login'];
const adminEmail = [process.env.REACT_APP_ADMIN_EMAIL1,process.env.REACT_APP_ADMIN_EMAIL2,process.env.REACT_APP_ADMIN_EMAIL3];
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [adminEmails, setAdminEmails] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const toggleDrawer = (open) => {
    setOpenDrawer(open);
  };

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

  const loginnnn=()=>{
      navigate('/login');
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
      <List>
        {['Register', ...pages,].map((page, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={`/${page.toLowerCase().replace(/\s+/g, '-')}`}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={page} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={isLoggedIn ? '/logout' : '/login'}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={isLoggedIn ? 'Logout' : 'Login'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

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
              onClick={() => toggleDrawer(true)}
              sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            {/* <AdbIcon sx={{ mr: 1 }} /> */}
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

            <Drawer
              anchor="left"
              open={openDrawer}
              onClose={() => toggleDrawer(false)}
            >
              {DrawerList}
            </Drawer>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, index) => (
                (page !== '' && isLoggedIn) || (page === '' && !isLoggedIn) ? (
                  <Button
                    key={index}
                    component={Link}
                    to={`/${page.toLowerCase().replace(/\s+/g, '-')}`}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ) : null
              ))}
              {/* Conditionally render Details link */}
              {isLoggedIn && userData.email === adminEmail && (
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
              <Tooltip title="Open settings"  sx={{ display: 'flex', justifyContent: 'space-between' }} >
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
