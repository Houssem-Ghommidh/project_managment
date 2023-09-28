import React from "react";
import {
  Box,
  Button,
  CircularProgress,
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
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

function AffecterSuperviseur() {
  const [dataProjet, setDataProjet] = useState();
  const [dataSuperviseur, setDataSuperviseur] = useState();

  async function getDataProjet() {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/projet/nosuperviseur`
    );
    console.log("data project : " + res.data.data);

    setDataProjet(res.data.data);
  }
  async function getDataSuperviseur() {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/users/superviseur`
    );
    console.log("data superviseur : " + res.data.data);
    setDataSuperviseur(res.data.data);
  }
  useEffect(() => {
    getDataProjet();
    getDataSuperviseur();
  }, []);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = async (values) => {
    console.log(values);
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/api/projet/${values.id_projet}`, {
        id_superviseur: values.id_superviseur,
      })
      .then(() => {
        Swal.fire(
          "Success",
          "Superviseur a éte afffecter avec succes",
          "success"
        );
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${e.response.data.message}`,
        });
      });
  };
  const initialValues = {
    id_projet: "",
    id_superviseur: "",
  };
  const checkoutSchema = yup.object().shape({});

  return (
    <Box m="20px">
      <Header title="Affecter superviseur" subtitle="Affecter superviseur a projet" />

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
              {dataProjet === undefined ? (
                <CircularProgress />
              ) : (
                <FormControl sx={{ gridColumn: "span 4" }}>
                  <InputLabel id="demo-simple-select-label">
                    Projet Without Superviseur
                  </InputLabel>
                  <Select
                    onChange={handleChange}
                    label="Projet"
                    variant="filled"
                    name="id_projet"
                    error={!!touched.id_projet && !!errors.id_projet}
                    helperText={touched.id_projet && errors.id_projet}
                  >
                    {dataProjet.map((e) => {
                      return <MenuItem value={e._id}>{e.nom_projet}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              )}
              {dataSuperviseur === undefined ? (
                <CircularProgress />
              ) : (
                <FormControl sx={{ gridColumn: "span 4" }}>
                  <InputLabel id="supperviseur">Superviseur</InputLabel>
                  <Select
                    onChange={handleChange}
                    label="superviseur"
                    variant="filled"
                    name="id_superviseur"
                    error={!!touched.id_superviseur && !!errors.id_superviseur}
                    helperText={touched.id_superviseur && errors.id_superviseur}
                  >
                    {dataSuperviseur.map((e) => {
                      return (
                        <MenuItem
                          value={e._id}
                        >{`${e.first_name} ${e.last_name}`}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Affecter
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default AffecterSuperviseur;
