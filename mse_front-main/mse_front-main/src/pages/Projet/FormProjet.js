import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import {
  fetchfournisseur,
  insertfournisseur,
} from "../../redux/fournisseurSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { json, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import ProtectedRouteHook from "../login/protected-route-hook";
const FormProjet = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isClient, isAdmin,isSuperviseur,isTechnicien, userData] = ProtectedRouteHook()
  const navigate=useNavigate()
  const handleFormSubmit = (values) => {
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("nom_projet", values.nom_projet);
    formData.append("cout", values.cout_projet);

    formData.append("deadLine", values.deadLine);
    formData.append("status", "en cours");
 

    console.log("i m here" + values.deadLine);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/projet`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        Swal.fire("Success", `projet a ete ajouter avec succes`, "success");
        isAdmin ? navigate('/admin/cardprojet') :navigate('/superviseur/cardprojet')
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.errors[0].msg}`,
        });
      });
  };
  const initialValues = {
    nom_projet: "",
    cout_projet: "",
    deadLine: "",
  };
  const checkoutSchema = yup.object().shape({
    nom_projet: yup.string().required("Required"),
    cout_projet: yup.string().required("Required"),
    deadLine: yup.date().required("Required"),
  });

  return (
    <Box m="20px">
      <Header title="CREATE PRODUCT" subtitle="Create a New produit" />

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
          setFieldValue,
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
                label="Nom projet"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nom_projet}
                helperText={touched.nom_projet && errors.nom_projet}
                name="nom_projet"
                error={!!touched.nom_projet && !!errors.nom_projet}
                sx={{ gridColumn: "span 2" }}
              />

              <Box sx={{ gridColumn: "span 2" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      onBlur={handleBlur}
                      onChange={(event) =>
                        setFieldValue(
                          "deadLine",
                          `${event.$y}-${event.$M
                            .toString()
                            .padStart(2, "0")}-${event.$D
                            .toString()
                            .padStart(2, "0")}`
                        )
                      }
                      variant="filled"
                      sx={{ width: "100%" }}
                      label="Date"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Cout de projet"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cout_projet}
                helperText={touched.cout_projet && errors.cout_projet}
                name="cout_projet"
                error={!!touched.cout_projet && !!errors.cout_projet}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Project
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormProjet;
