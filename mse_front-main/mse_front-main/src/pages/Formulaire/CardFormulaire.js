import React from 'react'
import Header from '../../components/Header'
import { Box, CircularProgress, IconButton, Modal, useMediaQuery, useTheme } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import projetImage from '../../assests/images/projet.jpg';
import { tokens } from '../../theme';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate,Navigate, useLocation } from 'react-router-dom';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Swal from 'sweetalert2';
import PdfComponent from '../../reactPdf';
import ProtectedRouteHook from '../login/protected-route-hook';
function CardFormulaire() {
  const [isClient, isAdmin,isSuperviseur,isTechnicien, userData] = ProtectedRouteHook()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const location = useLocation();
    const { idProjet, nomProjet,idTache ,client} = location.state;
    const[dataRapport,setDataRapport]=useState([]);
    const[isLoading,setisLoading]=useState(true);
    const navigate=useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    function addProject(){
      isAdmin ?    navigate(`/admin/formformulaire/${idProjet}`, { state: { idProjet: idProjet, nomProjet:nomProjet,idTache:idTache } })

      :  navigate(`/superviseur/formformulaire/${idProjet}`, { state: { idProjet: idProjet, nomProjet:nomProjet,idTache:idTache } });

    }
    function addTache(e){
      isAdmin ?   navigate("/admin/formtachebyprject", { state: { idProjet: e._id, nomProjet:e.nom_projet } })
: navigate("/superviseur/formtachebyprject", { state: { idProjet: e._id, nomProjet:e.nom_projet } });
      
    }
    function goToformulaire(){
      isAdmin ?  navigate(`/admin/formformulaire/${idProjet}`, { state: { idProjet: idProjet, nomProjet:nomProjet,idTache:idTache } })
: navigate(`/superviseur/formformulaire/${idProjet}`, { state: { idProjet: idProjet, nomProjet:nomProjet,idTache:idTache } });
    
    }
    function goToPdf(e){
      isClient ?   navigate(`/client/generatepdf`, { state: {client:client,tache:e.id_tache ?e.id_tache.nom_tache:"pas de tache",intervention:e.Intervention,failures_and_Observations:e.Failures_and_Observations, last_PM_Hours:e.Last_PM_Hours,running_Hours:e.Running_Hours, status:e.Status, engine :e.Engine,date:e.Date, technicien:`${e.Technician_on_duty.first_name} ${e.Technician_on_duty.last_name}`,locationField:e.Location }})
      :     isAdmin ?   navigate(`/admin/generatepdf`, { state: {client:client,tache:e.id_tache ?e.id_tache.nom_tache:"pas de tache",intervention:e.Intervention,failures_and_Observations:e.Failures_and_Observations, last_PM_Hours:e.Last_PM_Hours,running_Hours:e.Running_Hours, status:e.Status, engine :e.Engine,date:e.Date, technicien:`${e.Technician_on_duty.first_name} ${e.Technician_on_duty.last_name}`,locationField:e.Location }})
 : navigate(`/superviseur/generatepdf`, { state: {client:client,tache:e.id_tache ?e.id_tache.nom_tache:"pas de tache",intervention:e.Intervention,failures_and_Observations:e.Failures_and_Observations, last_PM_Hours:e.Last_PM_Hours,running_Hours:e.Running_Hours, status:e.Status, engine :e.Engine,date:e.Date, technicien:`${e.Technician_on_duty.first_name} ${e.Technician_on_duty.last_name}`,locationField:e.Location }});
  
  }


    async function getData(){
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/rapport`);
        setDataRapport(res.data.data); 
        setisLoading(false)
    }
    useEffect(() => {
        getData();
    
      return () => {
        
      }
    }, [dataRapport])
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
 

  return (
    <Box m="20px">
      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="Rapport" subtitle="Welcome to your Rapport" />
      

     {isAdmin||isSuperviseur&&   <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={addProject}
          >
            <AddCircleIcon sx={{ mr: "10px" }} />
            Add Raport
          </Button>
        </Box>}
      </Box>
    <Box
    
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(6, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
              }}
            >
    {isLoading?<CircularProgress/>:
   dataRapport.map((e,i)=>
   <Card key={i}   sx={{ backgroundColor:`${colors.primary[400]}`,gridColumn: "span 2" }}>
   <CardContent>
   <Box
                mt="2px"
             
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
                    Telecharger Rapport a PDF
                  </Typography>
                
                </Box>
                <Box>
                  <IconButton onClick={()=>goToPdf(e)}>
                    <DownloadOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
 <Typography component="div" variant="h5">
 Date : {e.Date}
 </Typography>
 <Typography  sx={{ fontSize: 14 }} color="text.secondary" gutterBottom >
 Technician on duty :  {`${e.Technician_on_duty.first_name} ${e.Technician_on_duty.last_name}` } 
 </Typography>
 <Typography sx={{ mb: 1.5 }} color="text.secondary">
 Location : {e.Location}
 </Typography>
 <Typography variant="body2">
 Engine : {e.Engine}
   <br />
   Status : {e.Status}
   <br />
   Last PM Hours : {e.Last_PM_Hours}
   <br />
   Running Hours : {e.Running_Hours}
   <br />
   Electric Power P : {e.Electric_Power_P}
   <br />
   Apparent Power S : {e.Apparent_Power_S}
   <br />
   Oil System Check : {e.Oil_System_Check}
   <br />
   Oil Level : {e.Oil_Level}
   <br />
   Oil Pressure : {e.Oil_Pressure}
   <br />
   Oil Temperature : {e.Oil_Temperature}
   <br />
   Cooling Water System_Check : {e.Cooling_Water_System_Check}
   <br />
   Cooling Water Temperature : {e.Cooling_Water_Temperature}
   <br />
   Radiator Water Level : {e.Radiator_Water_Level}
   <br />
   Fuel Filters Fuel Lines Pumps Filter Bases : {e.Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases}
   <br />
   Fuel Water Separator Check : {e.Fuel_Water_Separator_Check}
   <br />
   Fuel Day Tank Fuel Level : {e.Fuel_Day_Tank_Fuel_Level}
   <br />
   Air Cleaner Filter Condition : {e.Air_Cleaner_Filter_Condition}
   <br />
   Turbocharger Check : {e.Turbocharger_Check}
   <br />
   Inspect Battery Cables and Battery Connections : {e.Inspect_Battery_Cables_and_Battery_Connections}
   <br />
   Starter Motors : {e.Starter_Motors}
   <br />
   Alternator Pulleys Belts Tensioner : {e.Alternator_Pulleys_Belts_Tensioner}
   <br />
   Meters Gauges : {e.Meters_Gauges}
   <br />
   Control Panel : {e.Control_Panel}
   <br />
   Electrical Connections : {e.Electrical_Connections}
   <br />
   Indication Lamps Function Check : {e.Indication_Lamps_Function_Check}
   <br />
   Selector Switches Meters Function Check : {e.Selector_Switches_Meters_Function_Check}
   <br />
   Body Earthing of Alternator and Panel Check : {e.Body_Earthing_of_Alternator_and_Panel_Check}
   <br />
   Anti vibration mounting is effective : {e.Anti_vibration_mounting_is_effective}
   <br />
   Engine Exhaust System Installation and Condition : {e.Engine_Exhaust_System_Installation_and_Condition}
   <br />
   Intake Manifold Aftercooler JWAC SCAC air cooler : {e.Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler}
   <br />
   Failures and Observations : {e.Failures_and_Observations}
   <br />
   Intervention : {e.Intervention}
   <br />
   id_tache : {e.id_tache ?e.id_tache.nom_tache:"pas de tache"}
 </Typography>
</CardContent>
 <CardActions>
   {/* <Button onClick={()=>addTache(e)} variant='contained' color='warning' size="small">Update</Button> */}
{ isAdmin||isSuperviseur&&  <Button color='error'onClick={async()=>{
           Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
      axios.delete(`${process.env.REACT_APP_BASE_URL}/api/rapport/${e._id}`)
      .then((response) => {
        Swal.fire("Success", `Rapport a ete supprimer  avec succes`, "success");
      })
      .catch((error) => {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.errors[0].msg}`,
        });
      });  }
    })
        }} variant='contained' size="small">Delete</Button>}
   {/* <Button onClick={goToformulaire} variant='contained' color='secondary' size="small">View formulaire</Button> */}

 </CardActions>
</Card>)
    
    }

</Box>
  </Box>
  )
}

export default CardFormulaire
