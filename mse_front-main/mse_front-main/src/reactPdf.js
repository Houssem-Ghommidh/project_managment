import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import logo from './assests/images/logo_mse.jpg'
import noClient from './assests/images/noclient.jpg'
import html2canvas from 'html2canvas';
import './App.css'
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { json, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { tokens } from './theme';

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";


const generatePDF = () => {
  const input = document.getElementById('html-content');

  // Define the A4 size in millimeters
  const pdf = new jsPDF('p', 'mm', 'a4');

  // Convert the HTML element to canvas
  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Set the canvas image width and height to A4 size
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;


      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      // Save the PDF
      pdf.save('converted-file.pdf');
    })
    .catch((error) => {
      console.error('Error converting HTML to PDF:', error);
    });
};

const PdfComponent = () => {
  const location = useLocation();
  const {technicien, client,locationField,date,engine,status,running_Hours,last_PM_Hours,failures_and_Observations,intervention,tache} = location.state;

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    unstyledTable: {
      width: '80%',
      border: '3px solid black',
      borderCollapse: 'collapse',
    },
    tableCell: {
      fontSize: '20px',
      padding: '5px',
    },
    span: {
      fontWeight: '700',
    },
  };
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);  return (
    <Box  m='20px'>

<Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="Rapport" subtitle="Welcome to your Rapport" />

        {<Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={generatePDF}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>}
      </Box>
    <div>
    <div id="html-content">


<body>
  <div style={{height:50,color:'white',backgroundColor:'white'
  }}></div>
<div style={{backgroundColor:'white'
  }} className="container">
<table style={{backgroundColor:'white'
  }}  className="unstyledTable">
<tbody>
<tr>
<td style={{width: 200,height: 180}} rowSpan={4}><div style={{display: 'flex', justifyContent: 'center'}}> <img style={{width: 150,height: 150}} alt="logo1" src={logo}/></div></td>
<td style={{textAlign: 'center', fontWeight: 'bold',fontSize: 26,color:'black'}}>DAILY INSPECTION REPORT</td>
<td style={{width: 200,height: 180}} rowSpan={4}><div style={{display: 'flex', justifyContent: 'center'}}> <img style={{width: 150,height: 150}} alt="logo2" src={client.image?`${process.env.REACT_APP_BASE_URL}/api/userImages/${client.image}` :noClient}/></div></td>
</tr>
<tr>

<td style={{color:'black'}}>Client : {client?`${client.first_name} ${client.last_name}`:"pas de client"}</td>

</tr>
<tr>

<td style={{color:'black'}}>Contractor : Machinery services experts</td>

</tr>
<tr>

<td style={{color:'black'}}>Contract : {tache}</td>

</tr>



</tbody>

</table>
</div>
<div style={{height:50,backgroundColor:'white'}}></div>

<div style={{height:'500px',color:'black'}} className="container">

<table className="unstyledTable">
<tbody>
<tr>
<td><span style={styles.span}>Date : </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{date}</td>
<td colSpan={2}><span style={styles.span}>Technicien on duty :</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {technicien}</td>

</tr>
<tr>
<td colSpan={3}><span style={styles.span}>Location :</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{locationField}</td>

</tr>
<tr>
<td colSpan={3}><span style={styles.span}>Engine :</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {engine}</td>

</tr>
  <tr>
<td colSpan={3}><span style={styles.span}>Status :</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {status}</td>

</tr>
  
<tr>
<td style={{textAlign:'center',width:'30%'}}><span style={styles.span}>RH since Last PM</span></td>
<td style={{textAlign:'center',width:'30%'}}><span style={styles.span}>Running Hours</span></td>
<td style={{textAlign:'center',width:'30%'}}><span style={styles.span}>Last PM</span></td>
</tr>
<tr>
<td style={{textAlign:'center',width:'30%'}}>{running_Hours-last_PM_Hours}</td>
<td style={{textAlign:'center',width:'30%'}}>{running_Hours}</td>
<td style={{textAlign:'center',width:'30%'}}>{last_PM_Hours}</td>
</tr>
<tr>
<td colSpan={3}><span style={styles.span}>Failure and Observations</span> <br></br>{failures_and_Observations}</td>

</tr>
<tr>
<td colSpan={3}><span style={styles.span}>Intervention</span> <br></br>{intervention}</td>

</tr>
</tbody>
</table>
</div>
</body>
<div style={{height:50,backgroundColor:'white'}}></div>



  
  </div>

  </div>

  </Box>
  );
};
export default PdfComponent;