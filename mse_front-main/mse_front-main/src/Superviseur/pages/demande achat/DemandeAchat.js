import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import React from 'react'
import Header from '../../../components/Header'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import ProtectedRouteHook from '../../../pages/login/protected-route-hook';

function DemandeAchat() {
  const [isClient, isAdmin,isSuperviseur,isTechnicien, userData] = ProtectedRouteHook()

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const location = useLocation();
    const { idProduit,quantite,nomProduit } = location.state;
    const handleFormSubmit = async (values) => {
        console.log(values);
        isSuperviseur?      axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/demandedachat`,  {
            "quantite":quantite,
            "isConfirmed":false,
            "description":values.description,
            "id_produit":idProduit,
            "id_superviseur":localStorage.getItem('id')
        
        })
        .then(async (response) =>
         { 
          
            
            Swal.fire("Success", `
            request was sent successfully`, "success")
         setTimeout(() => {
          window.location.href = ""
      }, 500);
         
        }
        )
        .catch((e) =>
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${e.response.data.errors[0].msg}`,
          })
        ): axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/demandedachat`,  {
            "quantite":quantite,
            "isConfirmed":false,
            "description":values.description,
            "id_produit":idProduit,
            "id_technicien":localStorage.getItem('id')
        
        })
        .then(async (response) =>
         { 
          
            
            Swal.fire("Success", `
            request was sent successfully`, "success")
         setTimeout(() => {
          window.location.href = ""
      }, 500);
         
        }
        )
        .catch((e) =>
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${e.response.data.errors[0].msg}`,
          })
        )
    

        
        }
        
    

    
    const initialValues = {
        description:""
      
    };
    const checkoutSchema = yup.object().shape({

    })

  return (
    <Box m="20px">
    <Header title="Demande d'achat du produit" subtitle="Demande d'achat du produit" />

    <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit,setFieldValue}) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
             <TextField
              fullWidth
              disabled
              variant="filled"
              type="text"
              label="Produit"
              
              value={nomProduit}
              name="produit"
              error={!!touched.produit && !!errors.produit}
              helpertext={touched.produit && errors.produit}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              fullWidth
              disabled
              variant="filled"
              type="text"
              label="Quantite Disponible"
              onBlur={handleBlur}
              onChange={handleChange}
              value={quantite}
              name="quantiteDisponible"
              error={!!touched.quantiteDisponible && !!errors.quantiteDisponible}
              helpertext={touched.quantiteDisponible && errors.quantiteDisponible}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Déscription"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              multiline
              rows={4}
              error={!!touched.description && !!errors.description}
              helpertext={touched.description && errors.description}
              sx={{ gridColumn: "span 4" }}
            />
          
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Demande d'achat produit
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  </Box>
  )
}

export default DemandeAchat
