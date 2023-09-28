import React, { useEffect } from "react";
import { Box, Alert, CircularProgress, useTheme, Avatar } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
function ListTechnicienByProjet() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {id} = useParams();
const [dataTechnicienByProjet,setTechnicienByProjet]=useState([])
const [isLoading,setisLoading]=useState(true)

  async function getTechnicienByProjet(){

 const res=   await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/techniciens/${id}`);
 setTechnicienByProjet(res.data.data);
 setisLoading(false);
  }

  let navigate = useNavigate();


  useEffect(() => {
    getTechnicienByProjet();
  }, []);



  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => {
            navigate(`/admin/formusers/${params.id}`);
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          color="error"
          onClick={(users) => {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
              }
            });
          }}
        />,
      ],
    },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Avatar
              src={`${process.env.REACT_APP_BASE_URL}/api/userImages/${params.formattedValue}`}
            />
          </>
        );
      },
    },
    { headerName: "First name", field: "first_name", felx: 1, minWidth: "150" },
    { headerName: "Last name", field: "last_name", felx: 1, minWidth: "200" },
    { headerName: "Email", field: "email", felx: 1, minWidth: "200" },
    { headerName: "Role", field: "role", felx: 1, minWidth: "200" },
  ];
  return (
    <Box m="20px">

      <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header
              title="List of Users"
              subtitle="Welcome to your User List"
            />
          </Box>
          {isLoading?<CircularProgress/>: dataTechnicienByProjet.length===0?<Alert severity="error">Pas de technicien dans ce projet</Alert>: <Box
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
              rows={dataTechnicienByProjet}
              getRowId={(row) => row._id}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>}
     
    </Box>
  );
}

export default ListTechnicienByProjet;
