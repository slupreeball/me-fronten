import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import moment from 'moment';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
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

export default function SignUp() {

    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
  
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for errors in any text field
    if (Object.values(errors).some((error) => error)) {
        alert('One or more text fields are empty.');
        return;
      }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.")
        return;   
      }

    const currentDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const data = new FormData(event.currentTarget);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
        
    var raw = JSON.stringify({
         "firstname": data.get('firstName'),
        "lastname": data.get('lastName'),
        "company_id": "",
        "role": "",
        "country": "",
        "email": data.get('email'),
        "avatar": "",
        "password": data.get('password'),
        "remember_token": "",
        "created_at": currentDate,
        "updated_at": currentDate
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    fetch(apiUrl+"/adduser", requestOptions)
        .then(response => response.json())
        .then(result => {  
            if (result['status'] === 'ok') {
                window.location.href = '/login'
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up 
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={text1}
                  onChange={(e) => handleTextChange(e, 'text1')}
                  error={errors.text1}
                  helperText={errors.text1 ? 'Text field cannot be empty' : ''}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={text2}
                  onChange={(e) => handleTextChange(e, 'text2')}
                  error={errors.text2}
                  helperText={errors.text2 ? 'Text field cannot be empty' : ''}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  onChange={handleConfirmPasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
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