import React, {useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme, Avatar } from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux';
import {fetchproduit,deleteproduit} from '../../redux/produitSlice'
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import ProtectedRouteHook from "../login/protected-route-hook";
function ListProduit() {
  const [isClient, isAdmin,isSuperviseur,isTechnicien, userData] = ProtectedRouteHook()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const produit = useSelector(state=>state.produit)
    const {error} = useSelector(state=>state.produit)
    const {status} = useSelector(state=>state.produit)
    const {getalldata} = useSelector(state=>state.produit)
    let navigate = useNavigate();

const dispatch = useDispatch();

useEffect(()=>{
 dispatch(fetchproduit())

    },[dispatch])

    useEffect(()=>{

     console.log('produit : ', produit)
         },[produit])
 
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
onClick={() =>{isAdmin ? navigate(`/admin/formproduit/${params.id}`) :navigate(`/superviseur/formproduit/${params.id}`) }}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              color="error"
              onClick={(produit)=> {
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

                    dispatch(deleteproduit(params.id))
                  }
                })
                
              }}

            />,
          ]
        

     
      
    },
      {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Avatar src={`${process.env.REACT_APP_BASE_URL}/api/produitsImages/${params.formattedValue}`} />
          </>
        );
      }
    },
    { headerName: 'Name produit', field: 'nom_produit',felx:1,minWidth:"150" },
    { headerName: 'Quantite', field: 'quantite',felx:1,minWidth:"200" },
    { headerName: 'Prix', field: 'prix',felx:1,minWidth:"200" },
    { headerName: 'Nom fournisseur',  renderCell: (params) => {
      if(params.row.id_fournisseur==null){
        return (
          <>
          {"none"}
          </>
        );
      }else{
        return (
          <>
          {params.row.id_fournisseur.nom_fournisseur}
          </>
        );
      }
     
    }},

   
 
  ];
  return (
    <Box m="20px">
    { error!==null ?  <Alert severity="error">{error}</Alert>
    : 
    
    status ==="loading"? <Box style={{position: 'relative'}}>
    <CircularProgress size={40}
     left={-20}
     top={10}
     
     style={{marginLeft: '50%'}} color="secondary" /></Box>
    :produit.getalldata.length===0? "there is no data found":
    <Box> 
    <Box display="flex" justifyContent="space-between" alignItems="center">


<Header title="List des Produits" subtitle="Bienvenue a ton liste des Produits" />
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
rows={getalldata}
 getRowId={(row) => row._id}
columns={columns}
components={{ Toolbar: GridToolbar }}
/>
</Box></Box> }
 
 </Box>
  )
}

export default ListProduit