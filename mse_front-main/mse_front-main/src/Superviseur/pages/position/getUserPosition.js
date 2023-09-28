
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import Header from '../../../components/Header';
import { tokens } from '../../../theme';
import { mockTransactions } from '../../../data/mockData';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const MyComponent = () => {
  const [currentAddress, setCurrentAddress] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  let navigate = useNavigate();

  const[dataTache,setDataTache]=useState([]);
  const[isLoading,setisLoading]=useState(true);

  
  async function getData(){
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/pointage/byuserid/${localStorage.getItem('id')}`);
      setDataTache(res.data.data); 
      setisLoading(false)
  }
  useEffect(() => {
      getData();
  
    return () => {
      
    }
  }, [])

  const handleClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          const API_KEY = '9401e8c9883546b68eb0bc36928a7b3a';
          const url = `https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=${latitude}+${longitude}`;
  
          try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results.length > 0) {
              const address = data.results[0].components.country;
              const details = data.results[0].components.county;
              const city = data.results[0].components.residential;
  
              const currentPosition = address + ' ' + details + ', ' + city;
              setCurrentAddress(currentPosition);
              setCurrentDate(new Date().toLocaleString());
  
              await sendPosition(currentPosition);
            }
          } catch (error) {
            console.log('Error:', error);
          }
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };
  
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  const sendPosition = async (position) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/pointage`, {
        role: localStorage.getItem('role'),
        userId: localStorage.getItem('id'),
        position: position,
      });
      // Handle successful response
      Swal.fire("Success", "Pointage a été ajouté avec succès", "success");
      getData();
  
    } catch (error) {
      // Handle error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.errors[0].msg}`,
      });
    }
  };

  return (
    <Box m='20px'>

<Header title="Pointage" subtitle="Bienvenue a ton liste des Pointage" />
<Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
<Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleClick}
          >
            <FingerprintIcon sx={{ mr: "10px" }} />
            Faire pointage
          </Button>
        </Box>
        </Box>


    <Box
            backgroundColor={colors.primary[400]}
            maxHeight="100vh"
            overflow="auto"
            m="25px 0 0 0"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              color={colors.grey[100]}
              p="15px"
            >
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                last 5 pointage 
              </Typography>
            </Box>
            {dataTache.slice(-5).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((transaction, i) => {
              
              const date = new Date(transaction.createdAt);
              
              const options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              };
              
              const convertedDateString = date.toLocaleString(undefined, options);
              return (
                <Box
                  key={`${transaction}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.greenAccent[100]}
                    >
                      {transaction.userId.first_name } {transaction.userId.last_name}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.role}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.position}</Box>
                  <Box
                    color={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    { convertedDateString  } 
                  </Box>
                </Box>
              );
            })}
          </Box>
    </Box>
  );
};

export default MyComponent;
