import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import axios from "axios";
import  {useNavigate} from 'react-router-dom'

const FormFournisseur = () => {
   const navigate	=useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const handleFormSubmit = async (values) => {
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/fournisseur`, values)
      .then((response) =>
       { Swal.fire("Success", `fournisseur a ete ajouter avec succes`, "success")
        navigate('/admin/listfourniseur')}
      )
      .catch((e) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${e.response.data.errors[0].msg}`,
        })
      );
  };
  const initialValues = {
    nom_fournisseur: "",
    adresse: "",
    email: "",
    num_tel: "",
  };
  const checkoutSchema = yup.object().shape({
    nom_fournisseur: yup.string().required("Required"),
    adresse: yup.string().required("Required"),
    email: yup.string().email("Invalid email!").required("Required"),
    num_tel: yup
      .string()
      .matches(phoneRegExp, "phone number is not valid!")
      .required("Required"),
  });

  return (
    <Box m="20px">
      <Header
        title="CREATE Fournisseur"
        subtitle="Create a New Fournisseur Profile"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
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
                variant="filled"
                type="text"
                label="Nom fournisseur"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nom_fournisseur}
                name="nom_fournisseur"
                error={!!touched.nom_fournisseur && !!errors.nom_fournisseur}
                helperText={touched.nom_fournisseur && errors.nom_fournisseur}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Adresse"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.adresse}
                name="adresse"
                error={!!touched.adresse && !!errors.adresse}
                helperText={touched.adresse && errors.adresse}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.num_tel}
                name="num_tel"
                error={!!touched.num_tel && !!errors.num_tel}
                helperText={touched.num_tel && errors.num_tel}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Fournisseur
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormFournisseur;
