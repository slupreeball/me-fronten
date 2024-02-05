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
//import { styled } from '@mui/material/styles';

//Start dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
//import { blue, grey } from '@mui/material/colors';

const apiUrl = process.env.REACT_APP_API_URL;

export default function Drivers() {
 const [items, setItems] = useState([]);
 
 useEffect(() => {
   DataGet()
  }, [])

  const DataGet = () => {
    fetch(apiUrl+"/alldrivers")
      .then(res => res.json())
      .then(
        (result) => {
          //setIsLoaded(true);
          setItems(result);
        }
      )
  }

  const DataUpdate = id => {
    window.location = '/updatedriver/' + id
  }

  const DataDelete = id => {

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch(apiUrl+"/deletedriver/" + id, requestOptions)
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

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [id_del, setDel] = useState(0);

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
                <Typography variant="h6" gutterBottom component="div">
                    Drivers - ข้อมูลคนขับรถ
                </Typography>
                </Box>
                <Box>
                    <Link href="/adddriver">
                        <Button variant="contained" size="small" >Create</Button>
                    </Link>
                </Box>
            </Box>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                      <TableCell style={headStyle}>ID</TableCell>
                      <TableCell align="left" style={headStyle}>ชื่อ</TableCell>
                      <TableCell align="left" style={headStyle}>นามสกุล</TableCell>
                      <TableCell align="left" style={headStyle}>เลขที่ใบขับขี่</TableCell>
                      <TableCell align="right" style={headStyle}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {items.map((row) => (
                    <TableRow
                      key={row.driver_id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" style={bodyStyle}>
                          {row.driver_id}
                      </TableCell>
                      <TableCell align="left" style={bodyStyle}>{row.firstname}</TableCell>
                      <TableCell align="left" style={bodyStyle}>{row.lastname}</TableCell>
                      <TableCell align="letf" style={bodyStyle}>{row.license_no}</TableCell>
                      <TableCell align="right" style={bodyStyle}>
                      <ButtonGroup variant="outlined" aria-label="outlined button group" size="small">
                          <Button onClick={()=>DataUpdate(row.driver_id)}>Edit</Button>
                          <Button onClick={()=>handleClickOpen(row.driver_id)}>Delete</Button>
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
