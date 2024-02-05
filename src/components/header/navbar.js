import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const apiUrl = process.env.REACT_APP_API_URL;
export default function NavBar() {

  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch("http://localhost:5001/authen", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer '+token
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.status  === 'ok') {
        setEmail(data.email)
    } else {
        //alert('authen failed')
        localStorage.removeItem('token');
        //window.location = '/login'
    }
    //console.log("Success:", data);
  } )
  .catch ((error) => {
    console.error("Error:", error);
  })
  }, [])

  const logOut = () => {
    //localStorage.removeItem('token');
     //window.location = '/login'
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
            QMS [ apiUrl : {apiUrl} ]
          </Typography>
          {email}
          <Button color="inherit" onClick={logOut()}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
