import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import { ButtonGroup } from '@mui/material';
//Start dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const apiUrl = process.env.REACT_APP_API_URL;

export default function Company() {

 const [items, setItems] = useState([]);
 const [open, setOpen] = React.useState(false);
 const theme = useTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
 const [id_del, setDel] = useState(0);

 useEffect(() => {
   DataGet()
  }, [])

  const DataGet = () => {
    fetch(apiUrl+"/allcompany")
      .then(res => res.json())
      .then(
        (result) => {
          //setIsLoaded(true);
          setItems(result);
        }
      )
  }

  const DataUpdate = id => {
    window.location = '/updatecompany/' + id
  }

  const DataDelete = id => {

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch(apiUrl+"/deletecompany/" + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result['status'] === 'ok') {
                alert(result['message'])
                DataGet()
            } else {
                alert(result['message']['sqlMessage'])
            }
        })
        .catch(error => console.log('error', error));
  }

  const handleClickOpen = (id) => {
    setDel(id);
    setOpen(true);
  };

  const handleClose = (flag) => {
    if (flag === 1) {
        DataDelete(id_del)
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
            <Box display="flex">
                <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom component="div" style={bodyStyle}>
                    Company - ข้อมูลบริษัท/ร้านค้า
                    <br/> <br/>
                </Typography>
                </Box>
                <Box>
                    <Link href="/addcompany">
                        <Button variant="contained" size="small">Create</Button>
                    </Link>
                </Box>
            </Box>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small" >
                <TableHead >
                  <TableRow >
                      <TableCell style={headStyle}>ID</TableCell>
                      <TableCell align="left" style={headStyle}>ชื่อบริษัท</TableCell>
                      <TableCell align="left" style={headStyle}>เลขที่ผู้เสียภาษี</TableCell>
                      <TableCell align="left" style={headStyle}>เบอร์โทร</TableCell>
                      <TableCell align="left" style={headStyle}>ชื่อผู้ติดต่อ</TableCell>
                      <TableCell align="left" style={headStyle}>เบอร์โทรผู้ติดต่อ</TableCell>
                      <TableCell align="right" style={headStyle}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {items.map((row) => (
                    <TableRow
                      key={row.company_id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                    <TableCell component="th" scope="row" style={bodyStyle}>
                        {row.company_id}
                    </TableCell>
                    <TableCell align="left" style={bodyStyle}>{row.name}</TableCell>
                    <TableCell align="left" style={bodyStyle}>{row.tax_no}</TableCell>
                    <TableCell align="left" style={bodyStyle}>{row.phone}</TableCell>
                    <TableCell align="left" style={bodyStyle}>{row.contact_person}</TableCell>
                    <TableCell align="left" style={bodyStyle}>{row.contact_number}</TableCell>
                    <TableCell align="right" style={bodyStyle}>
                    <ButtonGroup variant="outlined" aria-label="outlined button group" size="small">
                        <Button onClick={()=>DataUpdate(row.company_id)}>Edit</Button>
                        <Button onClick={()=>handleClickOpen(row.company_id)}>Delete</Button>
                    </ButtonGroup>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Paper>
      </Container>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"แจ้งเตือน"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ต้องการลบข้อมูลนี้หรือไม่?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>handleClose(0)}>
            ยกเลิก
          </Button>
          <Button onClick={()=>handleClose(1)} autoFocus>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const headStyle = {
  fontWeight: "bold",
  fontFamily: 'kanit',
  fontSize: 16
}

const bodyStyle = {
  fontFamily: 'kanit'
}