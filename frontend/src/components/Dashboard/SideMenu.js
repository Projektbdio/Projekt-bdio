import React, {useEffect, useState } from 'react';
import {Drawer,IconButton,List,ListItem,ListItemIcon,ListItemText,} from '@mui/material';
import {Menu, Settings, AccountCircle, Logout,Star, Help,Login, SupervisorAccount} from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

// Komponent menu bocznego
const SideMenu = ({ onDrawerToggle }) => {
  // Stan przechowujący informację, czy menu jest zwinięte
  const [collapsed, setCollapsed] = useState(false);
  const loggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonAdm,setButtonAdm] = useState(false);
  const navigate = useNavigate();

  
  // Funkcja zmieniająca stan menu
  const handleDrawerToggle = () => {
    setCollapsed(!collapsed);
    if (onDrawerToggle) {
      onDrawerToggle();
    }
  };

  //funkcja służąca do wylogowywania.
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("typeAccount");
    localStorage.removeItem("loginName");
    localStorage.removeItem("role");
    window.location.href = '/';
  };

    const buttonAdmin = () => {
      navigate("/components/AdminPage");
    }

  useEffect(() => {
    if (!loggedIn) {
      setButtonVisible(true);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn && role === "ADMIN") {
      setButtonAdm(true);
    }
  }, [loggedIn,role]);



  const drawerContent = (
    <List style={{display: 'flex',flexDirection: 'column',height: '100%',width: collapsed ? '55px' : '240px',}}>
      <ListItem style={{ paddingLeft: 8 }}>
        <IconButton onClick={handleDrawerToggle}>
          <Menu />
        </IconButton>
      </ListItem>
      
      {!buttonVisible && (<ListItem button>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Ustawienia konta" />}
      </ListItem>
      )}

      {!buttonVisible && (<ListItem button>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Ustawienia" />}
      </ListItem>)}

      {!buttonVisible && (<ListItem button>
        <ListItemIcon>
          <Star />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Plan Premium" />}
      </ListItem>)}
      
      {!buttonVisible && buttonAdm && (<ListItem button onClick={() => buttonAdmin()}>
        <ListItemIcon>
          <SupervisorAccount />
        </ListItemIcon>
        {!collapsed &&  <ListItemText primary="Panel administratora" />}
      </ListItem>)}


      <ListItem button onClick={loggedIn ? handleLogout : () => {}} component={Link} to="/components/login" >
        <ListItemIcon>
          {loggedIn ? <Logout />:<Login/>}
        </ListItemIcon>
        {!collapsed && loggedIn ? <ListItemText primary="Wyloguj się" />:<ListItemText primary="Zaloguj się" />}
      </ListItem>

      {buttonVisible && (
        <ListItem button component={Link} to="/components/register">
          <ListItemIcon>
            <AppRegistrationIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Zarejestruj się" />}
        </ListItem>
  )}
      <ListItem style={{ flexGrow: 1 }} />
      <ListItem button>
        <ListItemIcon>
          <Help />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Pomoc" />}
      </ListItem>
    </List>
  );

  return (
    <>
    <Drawer variant="permanent" anchor="left">
      {drawerContent}
    </Drawer>
    </>
  );
};

export default SideMenu;
