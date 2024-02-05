import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Grid, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import moment from 'moment';

const apiUrl = process.env.REACT_APP_API_URL;

export default function UpdateUser() {
const { id } = useParams();
const [firstname, setFirstName] = useState('');
const [lastname, setLastName] = useState('');
const [email, setEmail] = useState('');

useEffect(() => {

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(apiUrl+"/user/" + id, requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result['status'] === 'ok') {
        setFirstName(result['user'][0]['firstname'])
        setLastName(result['user'][0]['lastname'])
        setEmail(result['user'][0]['email'])
      }
    })
    .catch(error => console.log('error', error));
}, [id])

const handleSubmit = event => {
  event.preventDefault();
   
  const currentDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "firstname": firstname.trim(),
    "lastname": lastname.trim(),
    "email": email.trim(),
    "updated_at": currentDate
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(apiUrl + "/updateuser/" + id, requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result['status'] === 'ok') {
        window.location.href = '/users'
      } else {
        alert(result['message']['sqlMessage'])
      }
  })
  .catch(error => console.log('error', error));

}
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{p: 2}}>
      <Typography variant="h6" gutterBottom component="div">
        Update User - แก้ไขข้อมูลผู้ใช้งาน
        <br/><br/>
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField id="firstname" label="ชื่อผู้ใช้งาน" variant="outlined" 
                  fullWidth required
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstname}
                  size="small"
                 />
            </Grid>
            <Grid item xs={12}>
                <TextField id="lastname" label="นามสกุล" variant="outlined" 
                    fullWidth required
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastname}
                    size="small"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField id="email" label="อีเมล" variant="outlined" 
                  fullWidth required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  size="small"
                 />
            </Grid>
            <Grid item xs={12}>
                <Button type='submit' variant="contained" fullWidth>Update</Button>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item >
                <Link href="/users" variant="body2">
                  All Users? Go
                </Link>
              </Grid>
            </Grid>
        </Grid> 
      </form>
      </Container>
    </React.Fragment>
  );
}