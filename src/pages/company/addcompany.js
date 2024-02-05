import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
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

export default function AddCompany() {

    const user_id = localStorage.getItem('user_id')

    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const [text4, setText4] = useState('');
    const [text5, setText5] = useState('');
    const [text6, setText6] = useState('');
    const [text7, setText7] = useState('');
    const [text8, setText8] = useState('');
    const [text9, setText9] = useState('');
    const [text10, setText10] = useState('');
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
        case 'text3':
          setText3(value);
          break;
        case 'text4':
          setText4(value);
          break;
        case 'text5':
          setText5(value);
          break;
        case 'text6':
          setText6(value);
          break;
        case 'text7':
          setText7(value);
          break;
        case 'text8':
          setText8(value);
          break;
        case 'text9':
          setText9(value);
          break;
        case 'text10':
          setText10(value);
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
     if (data.get('name').trim() === '' || data.get('description').trim() === '') {
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
     
    var raw = JSON.stringify({
        "user_id": user_id,
        "name": data.get('name'),
        "country": data.get('country'),
        "open_time": data.get('open_time'),
        "description": data.get('description'),
        "tax_no": data.get('tax_no'),
        "phone": data.get('phone'),
        "address": data.get('address'),
        "zipcode": data.get('zipcode'),
        "location_lat": "0000",
        "location_lng": "0000",
        "contact_person": data.get('contact_person'),
        "contact_number": data.get('contact_number'),
        "created_at": currentDate,
        "updated_at": currentDate
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    fetch(apiUrl+"/addcompany", requestOptions)
        .then(response => response.json())
        .then(result => {  
            if (result['status'] === 'ok') {
                window.location.href = '/company'
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
            <AddBusinessIcon/>
          </Avatar>
          <Typography component="h1" variant="h5" style={bodyStyle}>
            เพิ่มข้อมูลบริษัท/ร้านค้า
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  value={text1}
                  onChange={(e) => handleTextChange(e, 'text1')}
                  error={errors.text1}
                  helperText={errors.text1 ? 'Text field cannot be empty' : ''}
                  required
                  fullWidth
                  id="name"
                  label="ชื่อบริษัท"
                  autoFocus
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  label="ประเทศ"
                  name="country"
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
                  id="oopen_time"
                  label="เวลาทำการ"
                  name="open_time"
                  value={text3}
                  onChange={(e) => handleTextChange(e, 'text3')}
                  error={errors.text3}
                  helperText={errors.text3 ? 'Text field cannot be empty' : ''}
                  autoComplete="family-name"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="รายละเอียด"
                  name="description"
                  value={text4}
                  onChange={(e) => handleTextChange(e, 'text4')}
                  error={errors.text4}
                  helperText={errors.text4 ? 'Text field cannot be empty' : ''}
                  autoComplete="family-name"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="tax_no"
                  label="เลขที่ผู้เสียภาษี"
                  name="tax_no"
                  value={text5}
                  onChange={(e) => handleTextChange(e, 'text5')}
                  error={errors.text5}
                  helperText={errors.text5 ? 'Text field cannot be empty' : ''}
                  autoComplete="family-name"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="เบอร์โทร"
                  name="phone"
                  value={text6}
                  onChange={(e) => handleTextChange(e, 'text6')}
                  error={errors.text6}
                  helperText={errors.text6 ? 'Text field cannot be empty' : ''}
                  autoComplete="family-name"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="ที่อยู่"
                  name="address"
                  value={text7}
                  onChange={(e) => handleTextChange(e, 'text7')}
                  error={errors.text7}
                  helperText={errors.text7 ? 'Text field cannot be empty' : ''}
                  autoComplete="family-name"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="zipcode"
                  label="รหัสไปรษณีย์"
                  name="zipcode"
                  value={text8}
                  onChange={(e) => handleTextChange(e, 'text8')}
                  error={errors.text8}
                  helperText={errors.text8 ? 'Text field cannot be empty' : ''}
                  autoComplete="family-name"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contact_person"
                  label="ชื่อผู้ติดต่อ"
                  name="contact_person"
                  value={text9}
                  onChange={(e) => handleTextChange(e, 'text9')}
                  error={errors.text9}
                  helperText={errors.text9 ? 'Text field cannot be empty' : ''}
                  autoComplete="family-name"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contact_number"
                  label="เบอร์ผู้ติดต่อ"
                  name="contact_number"
                  value={text10}
                  onChange={(e) => handleTextChange(e, 'text10')}
                  error={errors.text10}
                  helperText={errors.text10 ? 'Text field cannot be empty' : ''}
                  autoComplete="family-name"
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
                <Link href="/company" variant="body2">
                  All Company? Go
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
  fontFamily: 'kanit'
}