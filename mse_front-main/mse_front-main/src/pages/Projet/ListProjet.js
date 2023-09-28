import React, {useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme, Avatar, Button } from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux';
import {fetchprojet,deleteprojet} from '../../redux/projetSlice'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
function ListProjet() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const projet = useSelector(state=>state.projet)
    const {error} = useSelector(state=>state.projet)
    const {status} = useSelector(state=>state.projet)
    const {getalldata} = useSelector(state=>state.projet)
    let navigate = useNavigate();

const dispatch = useDispatch();

useEffect(()=>{
 dispatch(fetchprojet())

    },[dispatch])

    useEffect(()=>{

     console.log('projet : ', projet)
         },[projet])



         const flattenData = getalldata.map((project) => ({
          id: project._id,
          nom_projet: project.nom_projet,
          deadLine: project.deadLine,
          status: project.status,
          cout: project.cout,
          client: project.id_client ? project.id_client.first_name : 'none',
          superviseur: project.id_superviseur ? project.id_superviseur.first_name : 'none',

        }));
 
  const columns = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ( params ) => 

        
           [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
            onClick={() =>{navigate(`/gestionnaire/formprojet/${params.id}`)}}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              color="error"
              onClick={(projet)=> {
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

                    dispatch(deleteprojet(params.id))
                  }
                })
                
              }}

            />,
          ]
    },
    { headerName: 'Name projet', field: 'nom_projet',minWidth:"150" },
    { headerName: 'Deadline', field: 'deadLine',minWidth:"150" },
    { headerName: 'cout', field: 'cout',minWidth:50 },
    { headerName: 'Status', field: 'status',minWidth:"150" },
    { field: 'client', headerName: 'Client', width: 150 },
  { field: 'superviseur', headerName: 'Superviseur', width: 150 },
  { field: 'superviseur', headerName: 'Superviseur', width: 150 },
  {
    field: 'technicien',
    headerName: 'Techniciens',
    width: 150,
    renderCell: (params) => {
      const projectId = params.row.id;
      return (
        <Button variant="contained" color="secondary" onClick={() => handleButtonClick(projectId)}>
          View
        </Button>
      );
    },
  },



  
   
 
  ];
  const handleButtonClick = (projectId) => {
navigate(`/admin/listtechnicienbyprojet/${projectId}`)
    console.log(`Button clicked for project with ID: ${projectId}`);
  };
  
  return (
    <Box m="20px">
    { error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading"? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :projet.getalldata.length===0? "there is no data found":
    <Box> 
    <Box display="flex" justifyContent="space-between" alignItems="center">


<Header title="List des Projets" subtitle="Bienvenue a ton liste des Projets" />
</Box>
<Box
m="8px 0 0 0"
width="100%"
height="80vh"
sx={{
"& .MuiDataGrid-root": {
  border: "none",
},
"& .MuiDataGrid-cell": {
  borderBottom: "none",
},
"& .name-column--cell": {
  color: colors.greenAccent[300],
},
"& .MuiDataGrid-columnHeaders": {
  backgroundColor: colors.blueAccent[700],
  borderBottom: "none",
},
"& .MuiDataGrid-virtualScroller": {
  backgroundColor: colors.primary[400],
},
"& .MuiDataGrid-footerContainer": {
  borderTop: "none",
  backgroundColor: colors.blueAccent[700],
},
"& .MuiCheckbox-root": {
  color: `${colors.greenAccent[200]} !important`,
},
"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
  color: `${colors.grey[100]} !important`,
},
}}
>
<DataGrid
rows={flattenData}
 getRowId={(row) => row.id}
columns={columns}
components={{ Toolbar: GridToolbar }}
/>
</Box></Box> }
 
 </Box>
  )
}

export default ListProjet