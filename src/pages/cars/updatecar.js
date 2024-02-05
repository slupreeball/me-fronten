import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Grid, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const apiUrl = process.env.REACT_APP_API_URL;

export default function UpdateCar() {
const { id } = useParams();
const [registration_no, setRegistrationNo] = useState('');
const [brand, setBrand] = useState('');
const [color, setColor] = useState('');

useEffect(() => {

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(apiUrl+"/car/" + id, requestOptions)
    .then(response => response.json())
    .then(result => {
      //console.log (result[0]['firstname']);
      if (result['status'] === 'ok') {
        //alert(result['user'][0]['firstname'])
        setRegistrationNo(result['car'][0]['registration_no'])
        setBrand(result['car'][0]['brand'])
        setColor(result['car'][0]['color'])
      }
    })
    .catch(error => console.log('error', error));
}, [id])

const handleSubmit = event => {
  event.preventDefault();
   
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "registration_no": registration_no,
    "brand": brand,
    "color": color
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(apiUrl + "/updatecar/" + id, requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result['status'] === 'ok') {
        window.location.href = '/cars'
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
        Update Car
        <br/><br/>
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField id="registration_no" label="ทะเบียนรถ" variant="outlined" 
                  fullWidth required
                  onChange={(e) => setRegistrationNo(e.target.value)}
                  value={registration_no}
                  size="small"
                 />
            </Grid>
            <Grid item xs={12}>
                <TextField id="brand" label="ยี่ห้อรถ" variant="outlined" 
                    fullWidth required
                    onChange={(e) => setBrand(e.target.value)}
                    value={brand}
                    size="small"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField id="color" label="สีรถ" variant="outlined" 
                  fullWidth required
                  onChange={(e) => setColor(e.target.value)}
                  value={color}
                  size="small"
                 />
            </Grid>
            <Grid item xs={12}>
                <Button type='submit' variant="contained" fullWidth>Update</Button>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item >
                <Link href="/cars" variant="body2">
                  All cars? Go
                </Link>
              </Grid>
            </Grid>
        </Grid> 
      </form>
      </Container>
    </React.Fragment>
  );
}