import React, {useEffect } from "react";
import { Box,Alert, CircularProgress, useTheme } from "@mui/material";
import { DataGrid, GridToolbar ,GridActionsCellItem} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux';
import {fetchfournisseur,deletefournisseur} from '../../redux/fournisseurSlice'
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
function ListFournisseur() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const fournisseur = useSelector(state=>state.fournisseur)
    const {error} = useSelector(state=>state.fournisseur)
    const {status} = useSelector(state=>state.fournisseur)
    const {getalldata} = useSelector(state=>state.fournisseur)
    let navigate = useNavigate();

const dispatch = useDispatch();

useEffect(()=>{
 dispatch(fetchfournisseur())

    },[dispatch])

    useEffect(()=>{

     console.log('fournisseur : ', fournisseur)
         },[fournisseur])
         
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
onClick={() =>{navigate(`/admin/formfournisseur/${params.id}`)}}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              color="error"
              onClick={(fournisseur)=> {
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

                    dispatch(deletefournisseur(params.id))
                  }
                })
                
              }}

            />,
          ]
        

     
      
    },
    { headerName: 'Name fournisseur', field: 'nom_fournisseur',felx:1,minWidth:"150" },
    { headerName: 'Number Phone', field: 'num_tel',felx:1,minWidth:"200" },
    { headerName: 'Email', field: 'email',felx:1,minWidth:"200" },
    { headerName: 'Adresse', field: 'adresse',felx:1,minWidth:"150" },
   
 
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
    :fournisseur.getalldata.length===0? "there is no data found":
    <Box> 
    <Box display="flex" justifyContent="space-between" alignItems="center">


<Header title="List des Fournisseurs" subtitle="Bienvenue a ton liste des Fournisseurs" />
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

export default ListFournisseur