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

function AffecterTechnicien() {
  const [dataProjet, setDataProjet] = useState();
  const [dataTechnicienLibre, setDataTechnicienLibre] = useState();
  const [idTechnicien, setidTechnicien] = useState([]);


  async function getDataProjet() {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/projet`
    );
    console.log("data project : " + res.data.data);

    setDataProjet(res.data.data);
  }
  async function getDataTechnicienLibre() {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/users/technicienslibre`
    );
    console.log("data technicienslibre : " + res.data);
    setDataTechnicienLibre(res.data);
  }
  useEffect(() => {
    getDataProjet();
    getDataTechnicienLibre();
  }, []);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = async (values) => {
    console.log(values);
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/api/users/updatemultipetechnicien/${values.id_projet}`, {
        userIds: values.userIds,
      })
      .then(() => {
        Swal.fire(
          "Success",
          "Techniciens a éte afffecter avec succes",
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
    userIds: [],

  };
  const checkoutSchema = yup.object().shape({});

  return (
    <Box m="20px">
      <Header title="Affecter des Techniciens" subtitle="Affecter des technicien a projet" />

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
          setFieldValue
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
                    Projet 
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
              {dataTechnicienLibre === undefined ? (
                <CircularProgress />
              ) : (
                <FormControl sx={{ gridColumn: "span 4" }}>
                  <InputLabel id="supperviseur">Technicien</InputLabel>
                  <Select
                    onChange={(e)=>setFieldValue("userIds",e.target.value)}
                    label="techniciens"
                    variant="filled"
                    name="userIds"
                    value={values.userIds}
                    multiple
                    error={!!touched.userIds && !!errors.userIds}
                    helperText={touched.userIds && errors.userIds}
                  >
                    {dataTechnicienLibre.map((e) => {
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

export default AffecterTechnicien;
