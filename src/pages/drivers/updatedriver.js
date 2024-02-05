import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Grid, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const apiUrl = process.env.REACT_APP_API_URL;

export default function UpdateDriver() {

  const user_id = localStorage.getItem('user_id')

  const { id } = useParams();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [license_no, setLicenseNo] = useState('');

  useEffect(() => {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(apiUrl+"/driver/" + id, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result['status'] === 'ok') {
          setFirstName(result['driver'][0]['firstname'])
          setLastName(result['driver'][0]['lastname'])
          setLicenseNo(result['driver'][0]['license_no'])
        }
      })
      .catch(error => console.log('error', error));
  }, [id])

  const handleSubmit = event => {
    event.preventDefault();
    
    //Check user id
    if (user_id === null || user_id === undefined ) {
      alert('user_id is null, please login');
      return;    
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "user_id": user_id,
      "firstname": firstname,
      "lastname": lastname,
      "license_no": license_no
    });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(apiUrl + "/updatedriver/" + id, requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result['status'] === 'ok') {
        window.location.href = '/drivers'
      } else {
        alert(result['message'])
      }
  })
  .catch(error => console.log('error', error));

}
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{p: 2}}>
      <Typography variant="h6" gutterBottom component="div">
        Update Driver - แก้ไขข้อมูลคนขับรถ
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField id="firstname" label="ชื่อคนขับรถ" variant="outlined" 
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
                <TextField id="license_no" label="เลขใบขับขี่" variant="outlined" 
                  fullWidth required
                  onChange={(e) => setLicenseNo(e.target.value)}
                  value={license_no}
                  size="small"
                 />
            </Grid>
            <Grid item xs={12}>
                <Button type='submit' variant="contained" fullWidth>Update</Button>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item >
                <Link href="/drivers" variant="body2">
                  All Drivers? Go
                </Link>
              </Grid>
            </Grid>
        </Grid> 
      </form>
      </Container>
    </React.Fragment>
  );
}