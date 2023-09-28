import React from 'react'
import Header from '../../../components/Header'
import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import projetImage from '../../../assests/images/projet.jpg';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate,Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import ProtectedRouteHook from '../../../pages/login/protected-route-hook';
import { tokens } from '../../../theme';
function CardTacheTechnicien() {
    const[dataProjet,setDataProjet]=useState([]);
    const[isLoading,setisLoading]=useState(true);
    const navigate=useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const location = useLocation();
    const { idProjet, nomProjet,client } = location.state;
    const [isClient, isAdmin,isSuperviseur,isTechnicien, userData] = ProtectedRouteHook()

    async function deleteTache(idTache){

         await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/tache/${idTache}`).then((response) =>
         { Swal.fire("Success", `Tache a ete supprimer avec succes`, "success")
      
         getData();
        }
        )
        .catch((e) =>
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${e.response.data.errors[0].msg}`,
          })
        );



    }
    function addTache(){
      isAdmin ?   navigate("/admin/formtachebyprject", { state: { idProjet: idProjet, nomProjet:nomProjet } })
:navigate("/superviseur/formtachebyprject", { state: { idProjet: idProjet, nomProjet:nomProjet } });
      
    }
    function goToFormulaire(e){
      isAdmin ?  navigate("/admin/cardformulaire", { state: { idProjet: idProjet, nomProjet:nomProjet,idTache:e._id,client:client } })
      :isSuperviseur? navigate("/superviseur/cardformulaire", { state: { idProjet: idProjet, nomProjet:nomProjet,idTache:e._id,client:client } }): navigate("/technicien/cardformulaire", { state: { idProjet: idProjet, nomProjet:nomProjet,idTache:e._id,client:client } }); 
    }


    async function getData(){
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/tache/project/${idProjet}`);
        setDataProjet(res.data.data); 
        setisLoading(false)
    }
    useEffect(() => {
        getData();
    
      return () => {
        
      }
    }, [])
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

  return (
    <Box m="20px">
      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title={ `Tasks du projet ${nomProjet}`} subtitle="Welcome to your Tasks" />

       
      </Box>
    <Box
    
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(6, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
              }}
            >
    {isLoading?<CircularProgress/>:dataProjet.length===0 ?<Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  minHeight="70vh"
  width={'100%'}
  sx={{gridColumn: "span 6"}}
  
>
<Typography textAlign={'center'} width={'100%'} component="div" variant="h2">
No Taks availble for {nomProjet}
      </Typography>
</Box>:
   dataProjet.map((e,i)=> 
   <Card key={i}   sx={{ backgroundColor:`${colors.primary[400]}`,gridColumn: "span 2" }}>
        <CardContent>
      <Typography component="div" variant="h5">
      Nom du tache : {e.nom_tache}
      </Typography>
      <Typography  sx={{ fontSize: 14 }} color="text.secondary" gutterBottom >
      Numero du tache : {e.num_tache}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
      Duration : {e.duration}
      </Typography>
      <Typography variant="body2">
      Date debut : {new Date(e.date_debut).toLocaleDateString(undefined, options)}
        <br />
      Date fin : {new Date(e.date_fin).toLocaleDateString(undefined, options)}
      </Typography>
    </CardContent>
      <CardActions>

        <Button onClick={()=>goToFormulaire(e)} variant='contained' color='secondary' size="small">View formulaire</Button>

      </CardActions>
    </Card>)
    
    }

</Box>
  </Box>
  )
}

export default CardTacheTechnicien
