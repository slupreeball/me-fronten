import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import moment from 'moment';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const apiUrl = process.env.REACT_APP_API_URL;

export default function AddCars() {

    const user_id = localStorage.getItem('user_id')

    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [errors, setErrors] = useState({});

    const handleTextChange = (e, field) => {
      const value = e.target.value;
      setErrors((prevErrors) => ({ ...prevErrors, [field]: value.trim() === '' }));
      switch (field) {
        case 'text1':
          setText1(value);
          break;
        case 'text2':
          setText2(value);
          break;
        default:
          break;
      }
    };

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const data = new FormData(event.currentTarget);

    // Check for errors in any text field
    if (Object.values(errors).some((error) => error)) {
        alert('One or more text fields are empty.');
        return;
    }

     // Check empty
     if (data.get('registration_no').trim() === '' || data.get('brand').trim() === '') {
        alert('One or more text fields are empty.');
        return;   
      }

      //Check user id
      if (user_id === null || user_id === undefined ) {
        alert('user_id is null, please login');
        return;    
      }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
     
    //console.log(data.get('registration_no'), data.get('brand'), data.get('color')) 
    
    var raw = JSON.stringify({
        "user_id": user_id,
        "registration_no": data.get('registration_no'),
        "brand": data.get('brand'),
        "color": data.get('color'),
        "created_at": currentDate,
        "updated_at": currentDate
    });

   /*
    var raw = JSON.stringify({
        "user_id": 49,
        "registration_no": "มอ-70-4018",
        "brand": "IZUSU",
        "color": "ดำ",
        "created_at": "2024-01-15",
        "updated_at": "2024-01-15"
      });
     */

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    fetch(apiUrl+"/addcar", requestOptions)
        .then(response => response.json())
        .then(result => {  
            if (result['status'] === 'ok') {
                window.location.href = '/cars'
            } else {
                alert(result['message']['sqlMessage'])
            }
        })
        .catch(error => console.log('error', error));
    
   };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LocalShippingIcon/>
          </Avatar>
          <Typography component="h1" variant="h5" style={bodyStyle}>
            เพิ่มข้อมูลรถ
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="registration_no"
                  value={text1}
                  onChange={(e) => handleTextChange(e, 'text1')}
                  error={errors.text1}
                  helperText={errors.text1 ? 'Text field cannot be empty' : ''}
                  required
                  fullWidth
                  id="registration_no"
                  label="ทะเบียนรถ"
                  autoFocus
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="brande"
                  label="ยีห้อรถ"
                  name="brand"
                  value={text2}
                  onChange={(e) => handleTextChange(e, 'text2')}
                  error={errors.text2}
                  helperText={errors.text2 ? 'Text field cannot be empty' : ''}
                  autoComplete="family-name"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="color"
                  label="สีรถ"
                  name="color"
                  autoComplete="color"
                  size="small"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/cars" variant="body2">
                  All cars? Go
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

const bodyStyle = {
  fontFamily: 'kanit',
  fontSize: 14
}