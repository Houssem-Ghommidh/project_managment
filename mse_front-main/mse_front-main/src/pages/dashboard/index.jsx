import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

import StatBox from "../../components/StatBox";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Person4Icon from '@mui/icons-material/Person4';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BadgeIcon from '@mui/icons-material/Badge';

import EngineeringIcon from '@mui/icons-material/Engineering';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  const[dataTache,setDataTache]=useState();
  const[dataPointage,setDataPointage]=useState();
  const[isLoading,setisLoading]=useState(true);
  const[isLoadingPointage,setisLoadingPointage]=useState(true);
  async function getDataPointage(){
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/dashboard/pointage`);
    setDataPointage(res.data.data); 
    setisLoadingPointage(false)
}
  
  async function getData(){
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/dashboard`);
      setDataTache(res.data.data); 
      setisLoading(false)
  }
  useEffect(() => {
      getData();
      getDataPointage()
    return () => {
      
    }
  }, [])
  return (
    <Box m="20px">
      {/* HEADER */}

      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      { isLoading || isLoadingPointage ? <CircularProgress color="secondary"/>:<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="431,225"
              subtitle="Chiffre d'affaire"
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
       
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={dataTache.produit}
              subtitle="Nombre de produits"
              icon={
                <Inventory2Icon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
            
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={dataTache.projet}
              subtitle="Nombre de projet"
              icon={
                <BusinessCenterIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
            
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={dataTache.tache}
              subtitle="Nombres des Taches"
              icon={
                <AssignmentIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={dataTache.client}
              subtitle="Nombre des clients"
              icon={
                <Person4Icon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
            
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={dataTache.superviseur}
              subtitle="Nombre des superviseurs"
              icon={
                <AssignmentIndIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
            
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={dataTache.technicien}
              subtitle="Nombre des techniciens"
              icon={
                <BadgeIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
            
          </Box>
        </Grid>
       
     
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={dataTache.fournisseur}
              subtitle="Nombre des fournisseurs"
              icon={
                <EngineeringIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
            
          </Box>
        </Grid>
   
        <Grid
          xs={12}
          sm={12}
          md={8}
          lg={8}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12}>
            <Box backgroundColor={colors.primary[400]}>
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Chiffre d'affaire par années
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.greenAccent[500]}
                  >
                    58,373,698
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
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
                Last five pointage
              </Typography>
            </Box>
            {dataPointage.map((transaction, i) => {
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
                    {convertedDateString} 
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>}
    </Box>
  );
};

export default Dashboard;
