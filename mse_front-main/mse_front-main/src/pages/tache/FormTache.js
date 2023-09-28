import React from "react";
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";

function FormTache() {
  const [dateValue, setDateValue] = useState("");
  const [datefinValue, setDatefinValue] = useState("");
  const[dataProjet,setDataProjet]=useState();
  const[isLoading,setisLoading]=useState(true);

  
  async function getData(){
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/projet`);
      setDataProjet(res.data.data); 
      setisLoading(false)
  }
  useEffect(() => {
      getData();
  
    return () => {
      
    }
  }, [])
  


  const isNonMobile = useMediaQuery("(min-width:600px)");
 
  const handleFormSubmit = async (values,{resetForm,setFieldValue}) => {
    values.date_debut=dateValue;
    values.date_fin=datefinValue
   

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/tache`, values)
      .then((response) =>
       { Swal.fire("Success", `Tache a ete ajouter avec succes`, "success")
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
  };
  const initialValues = {
    nom_tache: "",
    num_tache: "",
    date_debut: "",
    date_fin: "",
    duration:"",
    id_projet:""
  };
  const handleChangeDate =(e) => {
    console.log(e)
    var mois = "";
    
    if (parseInt(e.$M,10) < 10){
      mois = "0"+e.$M;
    }
   var date = e.$y+"-"+mois +"-"+e.$D;
    setDateValue(date);
  }
  const handleChangeDateFin =(e) => {
    console.log(e)
    var mois = "";
    
    if (parseInt(e.$M,10) < 10){
      mois = "0"+e.$M;
    }
   var date = e.$y+"-"+mois +"-"+e.$D;
   setDatefinValue(date);
  }
  const checkoutSchema = yup.object().shape({
    nom_tache: yup.string().required("Required"),
    num_tache: yup.string().required("Required"),

  });
  return (
    <Box m="20px">
    <Header
      title="CREATE Tasks"
      subtitle="Create New Task"
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
{    isLoading?<CircularProgress/>:           <FormControl sx={{ gridColumn: "span 4" }}>
  <InputLabel id="demo-simple-select-label">Projet</InputLabel>
  <Select
    onChange={(event) => {
      setFieldValue('id_projet', event.target.value);
    }}
    label="Project"
    variant="filled"
    name="id_projet"
    error={!!touched.id_projet && !!errors.id_projet}
    helperText={touched.id_projet && errors.id_projet}
  >
    {
      dataProjet.map(e=>{
          return(<MenuItem value={e._id}>{e.nom_projet}</MenuItem>)
      })
    }
    
 
  </Select>
  </FormControl>}
         
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Task Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.nom_tache}
              name="nom_tache"
              error={!!touched.nom_tache && !!errors.nom_tache}
              helperText={touched.nom_tache && errors.nom_tache}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Task Number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.num_tache}
              name="num_tache"
              error={!!touched.num_tache && !!errors.num_tache}
              helperText={touched.num_tache && errors.num_tache}
              sx={{ gridColumn: "span 2" }}
            />
           <Box sx={{ gridColumn: "span 2" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      variant="filled"
                      sx={{ width: "100%" }}
                      label="Start Date"
                      name="date_debut"
                      error={!!touched.date_debut && !!errors.date_debut}
                      helperText={touched.date_debut && errors.date_debut}
                      onChange={(e) => handleChangeDate(e)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
              <Box sx={{ gridColumn: "span 2" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      variant="filled"
                      sx={{ width: "100%" }}
                      label="Finish Date"
                      name="date_fin"
                      error={!!touched.date_fin && !!errors.date_fin}
                      helperText={touched.date_fin && errors.date_fin}
                      onChange={(e) => handleChangeDateFin(e)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            <TextField
              fullWidth
              variant="filled"
              type="Number"
              label="Estimated Hours"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.duration}
              name="duration"
              error={!!touched.duration && !!errors.duration}
              helperText={touched.duration && errors.duration}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Create New Tache
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  </Box>
  )
}

export default FormTache
