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
import { useNavigate } from 'react-router-dom';
import ProtectedRouteHook from '../../../pages/login/protected-route-hook';

function DemandeProduit() {
  const [isClient, isAdmin,isSuperviseur,isTechnicien, userData] = ProtectedRouteHook()
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate=useNavigate();

    const handleFormSubmit = async (values) => {
        console.log(values);
        if(quantite<values.quantite){
        

              Swal.fire({
                title: "Oops...",
                text: `${values.quantite-quantite} pieces manquante vous devez envoyer demande d'achat?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, send it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  isSuperviseur?  navigate("/superviseur/demandeachat", { state: { idProduit: values.id_produit, quantite:values.quantite-quantite,nomProduit:nomProduit } }):navigate("/technicien/demandeachat", { state: { idProduit: values.id_produit, quantite:values.quantite-quantite,nomProduit:nomProduit } });

                }
              })
              
            }else{
                await axios
                .post(`${process.env.REACT_APP_BASE_URL}/api/affecterproduit`,isSuperviseur? {
                    "id_superviseur":localStorage.getItem('id'),
                    "quantite":values.quantite,
                    "id_produit":values.id_produit
                }:{
                  "id_technicien":localStorage.getItem('id'),
                  "quantite":values.quantite,
                  "id_produit":values.id_produit
              })
                .then(async (response) =>
                 { 
                    await axios
                .put(`${process.env.REACT_APP_BASE_URL}/api/produit/${values.id_produit}`, {
                    "quantite":(quantite-values.quantite),
                    
                })
                    
                    Swal.fire("Success", `produit a éte affecter avec succes`, "success")
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
                );
            }
        
        
        }
        
    

    const[dataProduit,setDataProduit]=useState([]);
    const[isLoading,setisLoading]=useState(true);
    const[quantite,setquantite]=useState(0);
    const[nomProduit,setnomProduit]=useState("");
    
    async function getData(){
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/produit`);
        setDataProduit(res.data.data); 
        setisLoading(false)
    }
    useEffect(() => {
        getData();

    }, [])
    
    const initialValues = {
        quantite: "",
        id_produit:""
      
    };
    const checkoutSchema = yup.object().shape({

    })

  return (
    <Box m="20px">
    <Header title="Demande de produit" subtitle="Demande de produit" />

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
{  isLoading?<CircularProgress color='secondary'/>:         <FormControl sx={{ gridColumn: "span 2" }}>
  <InputLabel key={1} id="demo-simple-select-label">Produit</InputLabel>
  <Select
    onChange={(e)=>{
        setnomProduit(e.target.value.nom_produit)
        setquantite(e.target.value.quantite);
        setFieldValue('id_produit', e.target.value._id)}}
    label="Produit "
    variant="filled"
    name="id_produit"
    error={!!touched.id_produit && !!errors.id_produit}
    helperText={touched.id_produit && errors.id_produit}
  >
    {
      dataProduit.map(e=>{
        
          return(<MenuItem key={e._id} value={e}>{e.nom_produit}</MenuItem>)
      })
    }
    
 
  </Select>
  </FormControl>}
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
              label="Quantite"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.quantite}
              name="quantite"
              error={!!touched.quantite && !!errors.quantite}
              helpertext={touched.quantite && errors.quantite}
              sx={{ gridColumn: "span 4" }}
            />
          
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Demande produit
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  </Box>
  )
}

export default DemandeProduit
