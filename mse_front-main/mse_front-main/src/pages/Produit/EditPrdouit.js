import React from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { fetchfournisseur, insertfournisseur } from '../../redux/fournisseurSlice';
import { getSingleproduit} from '../../redux/produitSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { json,useParams,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ProtectedRouteHook from '../login/protected-route-hook';

const EditProduit = () => {
  const [isClient, isAdmin,isSuperviseur,isTechnicien, userData] = ProtectedRouteHook()
  const dispatch =useDispatch();
  const navigate=useNavigate();
  const fournisseur = useSelector(state=>state.fournisseur)
  const {getalldata} = useSelector(state=>state.fournisseur)
  const {data} = useSelector(state=>state.produit)
  const {id}=useParams();
  console.log(data)
  const [produit,setProduit]=useState();
  const [loading,setLoading]=useState(true);
useEffect(()=>{
  async function getall()
  {
    dispatch(fetchfournisseur())
dispatch(getSingleproduit(id))
const res=await axios.get(`${process.env.REACT_APP_BASE_URL}/api/produit/${id}`)
setProduit(res.data.data)
setLoading(false)
  }

  getall()
  },[dispatch])
  useEffect(()=>{

  
  },[getalldata])
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values) => {
      // create a new FormData object and append the file to it
      const formData = new FormData();
      // formData.append("image", values.image);
      formData.append("id_fournisseur", values.id_fournisseur);

      formData.append("quantite", values.quantite);

      formData.append("prix", values.prix);

      formData.append("nom_produit", values.nom_produit);
     console.log(formData,values);
      // make a POST request to the File Upload API with the FormData object and Rapid API headers
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/api/produit/${id}`, {
          id_fournisseur:values.id_fournisseur,
          quantite:values.quantite,
          prix:values.prix,
          nom_produit:values.nom_produit
        })
        .then((response) => {
          Swal.fire("Success", `produit a ete ajouter avec succes`, "success")
          isAdmin ?  navigate('/admin/listproduit') :navigate('/superviseur/listproduit')
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.response.data.errors[0].msg}`,
          })
        });
      
    };
    const initialValues = {
      nom_produit: produit?.nom_produit,
      quantite: produit?.quantite,
      prix: produit?.prix,
      image: produit?.image,
      id_fournisseur: produit?.id_fournisseur,
    };
    const checkoutSchema = yup.object().shape({
      nom_produit:yup.string().required("Required"),
      quantite:yup.number("must be Number").required("Required"),
      prix:yup.number("must be Number").required("Required"),
      id_fournisseur:yup.string().required("Required"),
     


    })

console.log(data?.id_fournisseur)
   
return (   !loading  && <Box m="20px">
          <Header title="UPDATE PRODUCT" subtitle="UPDATE PRODUCT" />
    
          <Formik enableReinitialize={true}  onSubmit={handleFormSubmit}  initialValues={initialValues} validationSchema={checkoutSchema}>
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
                  {/* <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              setFieldValue('image', event.currentTarget.files[0]);
            }}
          /> */}
           <FormControl sx={{ gridColumn: "span 4" }}>
  <InputLabel id="demo-simple-select-label">Fournisseur</InputLabel>
  <Select
    onChange={(event) => {
      setFieldValue('id_fournisseur', event.target.value);
    }}
    label="Fournisseur "
    variant="filled"
    name="id_fournisseur"
    defaultValue={values?.id_fournisseur}
    error={!!touched.id_fournisseur && !!errors.id_fournisseur}
    helperText={touched.id_fournisseur && errors.id_fournisseur}
  >
    {
      getalldata?.map(e=>{
          return(<MenuItem value={e?._id}>{e?.nom_fournisseur}</MenuItem>)
      })
    }
    
 
  </Select>
  </FormControl>
         
         
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nom produit"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nom_produit}
                    helperText={touched.nom_produit && errors.nom_produit}
                    name="nom_produit"
                    error={!!touched.nom_produit && !!errors.nom_produit}
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
                    helperText={touched.quantite && errors.quantite}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="prix"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.prix}
                    name="prix"
                    error={!!touched.prix && !!errors.prix}
                    helperText={touched.prix && errors.prix}
                    sx={{ gridColumn: "span 4" }}
                  />
                
                 
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Update Produit
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      );
}

export default EditProduit