import React, {useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme, Avatar, Button } from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'

import Header from "../../../components/Header";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import ProtectedRouteHook from "../../../pages/login/protected-route-hook";
function ListDemandeProdduit() {
  const [isClient, isAdmin,isSuperviseur,isTechnicien, userData] = ProtectedRouteHook()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    let navigate = useNavigate();

    const[dataTache,setDataTache]=useState([]);
    const[isLoading,setisLoading]=useState(true);
  
    
    async function getData(){
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/affecterproduit`);
        setDataTache(res.data.data); 
        setisLoading(false)
    }
    useEffect(() => {
        getData();
    
      return () => {
        
      }
    }, [dataTache])
    




         const flattenData =isLoading?[]: dataTache.map((tache) => ({
            id: tache._id,

          nom_produit: tache.id_produit? tache.id_produit.nom_produit : 'none',
          quantite: tache.quantite,
          nom_technicien: tache.id_technicien? tache.id_technicien.first_name : 'none',
          nom_superviseur: tache.id_superviseur? tache.id_superviseur.first_name : 'none',

        }));
 
  const columns = isAdmin ? [
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
            onClick={() =>{navigate(`/admin/demandeproduit/${params.id}`)}}
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
                      axios.delete(`${process.env.REACT_APP_BASE_URL}/api/affecterproduit/${params.id}`)
                  }
                })
                
              }}

            />,
          ]
    },
  
    { headerName: 'Nom Produit', field: 'nom_produit',minWidth:"150" },
    { headerName: 'Quantite', field: 'quantite',minWidth:50 },
    { headerName: 'Nom technicien', field: 'nom_technicien', width: 150 },
    { headerName: 'Nom superviseur', field: 'nom_superviseur',minWidth:"150" },
  ]:[ { headerName: 'Nom Produit', field: 'nom_produit',minWidth:"150" },
  { headerName: 'Quantite', field: 'quantite',minWidth:50 },
  { headerName: 'Nom technicien', field: 'nom_technicien', width: 150 },
  { headerName: 'Nom superviseur', field: 'nom_superviseur',minWidth:"150" },];

  return (
    <Box m="20px">
    { isLoading?<CircularProgress/>:
    <Box> 
    <Box display="flex" justifyContent="space-between" alignItems="center">


<Header title="List des Affectation de produit" subtitle="Bienvenue a ton liste des affectation des produits" />
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

export default ListDemandeProdduit