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
import { useLocation,useParams,useNavigate } from 'react-router-dom';

function UpdateDemandeAchat() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const location = useLocation();
    const{id}=useParams();
    const navigate=useNavigate()
    // const { idProduit,quantite,nomProduit } = location.state;
    const handleFormSubmit = async (values) => {
        console.log(values);
        axios
        .put(`${process.env.REACT_APP_BASE_URL}/api/demandedachat/${id}`, {
            "description":values.description,
        
        })
        .then(async (response) =>
         { 
          
            
            Swal.fire("Success", `demandande a éte envoyer avec succes`, "success")
       navigate('/admin/listdemandeachat')
         
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
        const[produit,setProduit]=useState();
        const[isLoading,setisLoading]=useState(true);
        async function getData(){
          const resbyid = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/demandedachat/${id}`);
          setProduit(resbyid.data.data)
          setisLoading(false)
      }

      useEffect(() => {
          getData();
  
      }, [])

    
    const initialValues = {
        description:produit?.description,
        produit:produit?.id_produit,
        quantiteDisponible:produit?.quantite
      
    };
    const checkoutSchema = yup.object().shape({

    })

  return (
  !isLoading &&  <Box m="20px">
    <Header title="Update Demande d'achat du produit" subtitle="Update Demande d'achat du produit" />

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
              
              value={values.produit}
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
              value={values.quantiteDisponible}
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
             Update Demande d'achat produit
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  </Box>
  )
}

export default UpdateDemandeAchat
