import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Grid, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import moment from 'moment';

const apiUrl = process.env.REACT_APP_API_URL;

export default function UpdateCompany() {
const user_id = localStorage.getItem('user_id')
const { id } = useParams();
const [name, setName] = useState('');
const [country, setCountry] = useState('');
const [open_time, setOpenTime] = useState('');
const [description, setDescription] = useState('');
const [tax_no, setTaxNo] = useState('');
const [phone, setPhone] = useState('');
const [address, setAddress] = useState('');
const [zipcode, setZipcode] = useState('');
const [contact_person, setContactPerson] = useState('');
const [contact_number, setContactNumber] = useState('');

useEffect(() => {

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(apiUrl+"/company/" + id, requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result['status'] === 'ok') {
        setName(result['company'][0]['name'])
        setCountry(result['company'][0]['country'])
        setOpenTime(result['company'][0]['open_time'])
        setDescription(result['company'][0]['description'])
        setTaxNo(result['company'][0]['tax_no'])
        setPhone(result['company'][0]['phone'])
        setAddress(result['company'][0]['address'])
        setZipcode(result['company'][0]['zipcode'])
        setContactPerson(result['company'][0]['contact_person'])
        setContactNumber(result['company'][0]['contact_number'])
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
    "user_id": user_id,
    "name": name,
    "country": country,
    "open_time": open_time,
    "description": description,
    "tax_no": tax_no,
    "phone": phone,
    "address": address,
    "zipcode": zipcode,
    "location_lat": "00000",
    "location_lng": "00000",
    "contact_person": contact_person,
    "contact_number": contact_number,
    "updated_at": currentDate
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(apiUrl + "/updatecompany/" + id, requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result['status'] === 'ok') {
        window.location.href = '/company'
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
        Update Company - ข้อมูลบริษัท/ร้านค้า
        <br/><br/>
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField id="name" label="ชื่อบริษัท" variant="outlined" 
                  fullWidth required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  size="small"
                 />
            </Grid>
            <Grid item xs={12}>
                <TextField id="country" label="ประเทศ" variant="outlined" 
                    fullWidth required
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    size="small"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField id="open_time" label="เวลาทำการ" variant="outlined" 
                  fullWidth required
                  onChange={(e) => setOpenTime(e.target.value)}
                  value={open_time}
                  size="small"
                 />
            </Grid>
            <Grid item xs={12}>
                <TextField id="description" label="รายละเอียด" variant="outlined" 
                  fullWidth required
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  size="small"
                 />
            </Grid>
            <Grid item xs={12}>
                <TextField id="tax_no" label="เลขที่ผู้เสียภาษี" variant="outlined" 
                    fullWidth required
                    onChange={(e) => setTaxNo(e.target.value)}
                    value={tax_no}
                    size="small"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField id="phone" label="เบอร์โทร" variant="outlined" 
                  fullWidth required
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  size="small"
                 />
            </Grid>
            <Grid item xs={12}>
                <TextField id="address" label="ที่อยู่บริษัท" variant="outlined" 
                  fullWidth required
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  size="small"
                 />
            </Grid>
            <Grid item xs={12}>
                <TextField id="zipcode" label="รหัสไปรษณีย์" variant="outlined" 
                    fullWidth required
                    onChange={(e) => setZipcode(e.target.value)}
                    value={zipcode}
                    size="small"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField id="contact_person" label="ชื่อผู้ติดต่อ" variant="outlined" 
                  fullWidth required
                  onChange={(e) => setContactPerson(e.target.value)}
                  value={contact_person}
                  size="small"
                 />
            </Grid>
            <Grid item xs={12}>
                <TextField id="contact_number" label="เบอร์โทรผู้ติดต่อ" variant="outlined" 
                  fullWidth required
                  onChange={(e) => setContactNumber(e.target.value)}
                  value={contact_number}
                  size="small"
                 />
            </Grid>
            <Grid item xs={12}>
                <Button type='submit' variant="contained" fullWidth>Update</Button>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item >
                <Link href="/company" variant="body2">
                  All Company? Go
                </Link>
              </Grid>
            </Grid>
        </Grid> 
      </form>
      </Container>
    </React.Fragment>
  );
}