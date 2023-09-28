import React from 'react'
import Header from '../../components/Header'
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
import projetImage from '../../assests/images/projet.jpg';
import { tokens } from '../../theme';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate,Navigate } from 'react-router-dom';
import FormTacheByProject from '../tache/FormTacheByProject';
import Swal from "sweetalert2";
import ProtectedRouteHook from '../login/protected-route-hook';
function CardProjet() {
    const [isClient, isAdmin,isSuperviseur,isTechnicien, userData] = ProtectedRouteHook()
    const[dataProjet,setDataProjet]=useState([]);
    const[isLoading,setisLoading]=useState(true);
    const navigate=useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    function addProject(){
      isAdmin ?navigate("/admin/formprojet"):navigate("/superviseur/formprojet")
    }
    function addTache(e){
      // if()
      isAdmin ? navigate(`/admin/formprojet/${e._id}`, { state: { idProjet: e._id, nomProjet:e.nom_projet } }) :navigate(`/superviseur/formprojet/${e._id}`, { state: { idProjet: e._id, nomProjet:e.nom_projet } })

        // <Navigate to={<FormTacheByProject idProjet={e._id} nomProjet={e.nom_projet} />}/>
      
    }
    function goToTache(e){
      isAdmin ? navigate("/admin/cardtache", { state: { idProjet: e._id, nomProjet:e.nom_projet,client:e.id_client } } ):navigate("/superviseur/cardtache", { state: { idProjet: e._id, nomProjet:e.nom_projet,client:e.id_client } } )

        // <Navigate to={<FormTacheByProject idProjet={e._id} nomProjet={e.nom_projet} />}/>
      
    }


    async function getData(){
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/projet`);
        setDataProjet(res.data.data); 
        setisLoading(false)
    }
    async function getDataTechnicien(){
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/projet/${localStorage.getItem('id_project')}`);
      setDataProjet(res.data.data); 
      setisLoading(false)
  }
    useEffect(() => {
      getData();
    
      return () => {
        
      }
    }, [dataProjet])
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
        <Header title="Project" subtitle="Welcome to your Project" />

        <Box>
         {isAdmin&& <Button
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
            Add Project
          </Button>}
        </Box>
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
   dataProjet.map((e,i)=> <Card key={i}   sx={{ backgroundColor:`${colors.primary[400]}`,gridColumn: "span 2" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={e.id_client ? `${process.env.REACT_APP_BASE_URL}/api/userImages/${e.id_client.image}` :projetImage}
        title="green iguana"
      />
      <CardContent >
        <Typography gutterBottom variant="h5" component="div">
          {e.nom_projet}
        </Typography>
        <Typography mb={1} mt={1} variant="body2" color="text.secondary">
          DeadLine : {new Date(e.deadLine).toLocaleDateString(undefined, options)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status : {e.status}
        </Typography>
      </CardContent>
      <CardActions>
 <Button onClick={()=>addTache(e)} variant='contained' color='warning' size="small">Update</Button>
<Button color='error' variant='contained' size="small" onClick={async()=>{
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
      axios.delete(`${process.env.REACT_APP_BASE_URL}/api/projet/${e._id}`)
      .then((response) => {
        Swal.fire("Success", `projet a ete supprimer  avec succes`, "success");
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
        }}>Delete</Button>
        
        <Button onClick={()=>goToTache(e)} variant='contained' color='secondary' size="small">View Tache</Button>
      </CardActions>
    </Card>)
    
    }

</Box>
  </Box>
  )
}

export default CardProjet
