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
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DesignServicesIcon from '@mui/icons-material/DesignServices'; // Import Services icon
import EventNoteIcon from '@mui/icons-material/EventNote'; // Import Appointments icon
import InventoryIcon from '@mui/icons-material/Inventory'; // Import Inventory icon

const pages = ['Services', 'Inventory List', 'Update Inventory', 'Service List', 'Transfer List','Register'];
const settings = ['Login'];
const adminEmail = [process.env.REACT_APP_ADMIN_EMAIL1, process.env.REACT_APP_ADMIN_EMAIL2, process.env.REACT_APP_ADMIN_EMAIL3,process.env.REACT_APP_ADMIN_EMAIL4];
const workerEmail = [process.env.REACT_APP_WORKER_EMAIL1,process.env.REACT_APP_WORKER_EMAIL2,process.env.REACT_APP_WORKER_EMAIL3,process.env.REACT_APP_WORKER_EMAIL4];

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState({});
  const [adminEmails, setAdminEmails] = useState([]);
  const [workerEmails, setWorkerEmails] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null); // Define state for Services anchor element
  const [inventoryAnchorEl, setInventoryAnchorEl] = useState(null); // Define state for Inventory anchor element
  const navigate = useNavigate();

  const toggleDrawer = (open) => {
    setOpenDrawer(open);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
      {isLoggedIn && adminEmails.includes(userData.email) &&
      <AccordionDetails>
      <List>
        <ListItem disablePadding component={Link} to="/details">
          <ListItemButton>
            <ListItemIcon><EventNoteIcon /></ListItemIcon> {/* Add icon for Appointments */}
            <ListItemText primary="Appointments" />
          </ListItemButton>
        </ListItem>
      </List>
    </AccordionDetails>
      }
      <AccordionDetails>
            <List>
              {['Register'].map((page, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton component={Link} to={`/${page.toLowerCase().replace(/\s+/g, '_')}`}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={page} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        {isLoggedIn && (adminEmails.includes(userData.email) || workerEmails.includes(userData.email)) && 
      <List>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={(event) => event.stopPropagation()} // Add this line to stop event propagation
          >
            <ListItemIcon><DesignServicesIcon /></ListItemIcon>
            <Typography>Services</Typography> {/* Change this line */}
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {['Services', 'Service List'].map((page, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton component={Link} to={`/${page.toLowerCase().replace(/\s+/g, '_')}`}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={page} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={(event) => event.stopPropagation()} // Add this line to stop event propagation
          >
            <ListItemIcon><InventoryIcon /></ListItemIcon>
            <Typography>Inventory</Typography> {/* Change this line */}
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {['Inventory List','Transfer List'].map((page, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton component={Link} to={`/${page.toLowerCase().replace(/\s+/g, '_')}`}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={page} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </List>
      }
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

  useEffect(() => {
    setAdminEmails(adminEmail);
    setWorkerEmails(workerEmail);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email } = user;
        setUserData({ displayName, email });
        setIsLoggedIn(true);

        // Check if the user's email is in the array of admin emails
        if (adminEmails.includes(email) || workerEmails.includes(email)) {
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
              onClick={() => toggleDrawer(true)}
              sx={{ mr: 2, display: { xs: 'flex' } }}
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
            <Drawer
              anchor="left"
              open={openDrawer}
              onClose={() => toggleDrawer(false)}
            >
              {DrawerList}
            </Drawer>
           

            <Box sx={{ flexGrow: 1 }} /> {/* This will push the settings menu to the right */}
  <Box sx={{ mr: 2 }}> {/* Add margin to space it from other items */}
    <Tooltip title="Open settings" sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
