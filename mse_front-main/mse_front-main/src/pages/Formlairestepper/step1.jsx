import React, {useState} from "react";
import {
  Alert,
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import RapportService from "../../service/RapportService";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import dayjs from 'dayjs';

const Step1=({data,setData,activeStep,handleBack,isStepOptional,handleSkip,handleNext,steps})=>{
    const {id} = useParams();
    const[dataTechnicien,setDataTechnicien]=useState([]);
    const[isLoading,setisLoading]=useState(true);

    async function getTechniecien(){
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/techniciens/${id}`);
        setDataTechnicien(res.data.data); 
        setisLoading(false)
    }
    useEffect(() => {
      getTechniecien();
    
    }, [])
  
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit =  (values) => {
      let mois = "";
      
      if (parseInt(values.Date.$M,10)+1 < 10){
        mois = "0"+(parseInt(values.Date.$M,10)+1);
      }else{
        mois = (parseInt(values.Date.$M,10)+1); 
      }
     let date = values.Date.$y+"-"+mois +"-"+values.Date.$D;
      values.Date=date
      console.log("tttttttttttttttttttttt",values);
      setData(values)
       handleNext();
    };
    const initialValues = {     
      Date:dayjs(data?.Date) ||  dayjs(new Date().toISOString().split('T')[0]),
      Technician_on_duty : data?.Technician_on_duty || "" ,
      Location:  data?.Location || "" ,
      Engine :data?.Engine || "" ,
      Status :data?.Status ||  "" ,
     Last_PM_Hours : data?.Last_PM_Hours ||  null ,
     Running_Hours : data?.Running_Hours ||  null ,
     Electric_Power_P : data?.Electric_Power_P || null ,
     Apparent_Power_S : data?.Apparent_Power_S || "" ,
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    const checkoutSchema = yup.object().shape({
                  
      Date:yup.object().required("Required") ,
      Technician_on_duty : yup.string().required("Required")  ,
      Location:   yup.string().required("Required") ,
      Engine :  yup.string().required("Required") ,
      Status : yup.string().required("Required") ,
     Last_PM_Hours :  yup.number().required("Required") ,
     Running_Hours :  yup.number().required("Required") ,
     Electric_Power_P :  yup.number().required("Required") ,
     Apparent_Power_S :  yup.string().required("Required") ,
     
    });
    const style = {
      "& label.Mui-focused": {
        color: colors.greenAccent[400]
      },
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: colors.greenAccent[400]
        }
      }
    }

    return(<>

<Box m="20px">

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
  }) => {
    console.log(values);
    return(
    <form onSubmit={handleSubmit}>
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <Box sx={{ gridColumn: "span 2",...style }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
              onBlur={handleBlur}
                variant="filled"
                sx={{ width: "100%" }}
                label="Date"
                name="Date"
                value={values.Date }
                error={!!touched.Date && !!errors.Date}
                helperText={touched.Date && errors.Date }
                onChange={(e)=>{
                 setFieldValue("Date",e)
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>

      {isLoading?<CircularProgress/>: dataTechnicien.length===0?<Alert sx={{ gridColumn: "span 2",...style }} color="error" >No Technicien availble for </Alert>: <FormControl sx={{ gridColumn: "span 2",...style }}>
<InputLabel id="demo-simple-select-label">Technicien on duty</InputLabel> 
<Select
onChange={
  handleChange
  // (e)=>{
  //   setData({Technician_on_duty:e.target.value,...data})
  // }
}
value={values.Technician_on_duty}
label="Technician_on_duty"
variant="filled"
name="Technician_on_duty"
error={!!touched.Technician_on_duty && !!errors.Technician_on_duty}
helperText={touched.Technician_on_duty && errors.Technician_on_duty}
>
{
dataTechnicien.map(e=>{
    return(<MenuItem value={e._id}>{`${e.first_name} ${e.last_name}`}</MenuItem>)
})
}


</Select>
</FormControl>}
        <FormControl sx={{ gridColumn: "span 2",...style,style }}>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            onChange={
            //   (e)=>{
            //   console.log("resrrrrrrrrrrrrrr",e.target.value)
            //     setData({Location:e.target.value,...data})
            // }
            handleChange
          }
          value={values.Location}
            label="Location"
            variant="filled"
            name="Location"
            error={!!touched.Location && !!errors.Location}
            helperText={touched.Location && errors.Location}
          >
            <MenuItem value="W.O.S">W.O.S</MenuItem>
            <MenuItem value="JINAN 1">JINAN 1</MenuItem>
            <MenuItem value="AMANI 1">AMANI 1</MenuItem>
            <MenuItem value="JINAN 2">JINAN 2</MenuItem>
            <MenuItem value="MOUNA">MOUNA</MenuItem>
            <MenuItem value="NADA">NADA</MenuItem>
            <MenuItem value="AGP">AGP</MenuItem>
            <MenuItem value="WAHA">WAHA</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ gridColumn: "span 2",...style }}>
          <InputLabel id="demo-simple-select-label">Engine</InputLabel>
          <Select
            onChange={
              handleChange
            //   (e)=>{
            //     setData({Engine:e.target.value,...data})
            // }
          }
          value={values.Engine}
            label="Engine"
            variant="filled"
            name="Engine"
            error={!!touched.Engine && !!errors.Engine}
            helperText={touched.Engine && errors.Engine}
          >
            <MenuItem value="SDMO - Power 250 KVA - OMV REF 800-CEDE-3300">
              SDMO - Power 250 KVA - OMV REF 800-CEDE-3300
            </MenuItem>
            <MenuItem value="CAT C9 - Power 330 KVA - OMV REF 800-CEDE-6000">
              CAT C9 - Power 330 KVA - OMV REF 800-CEDE-6000
            </MenuItem>
            <MenuItem value="FILIPPINI - Power 300 KVA - OMV REF 800-CEDE-3200">
              FILIPPINI - Power 300 KVA - OMV REF 800-CEDE-3200
            </MenuItem>
            <MenuItem value="CAT C9 - Power 330 KVA - OMV REF 800-CEDE-7000">
              CAT C9 - Power 330 KVA - OMV REF 800-CEDE-7000
            </MenuItem>
            <MenuItem value="CAT C3.3 - Power 65 KVA - OMV REF 800-CEDE-3700">
              CAT C3.3 - Power 65 KVA - OMV REF 800-CEDE-3700
            </MenuItem>
            <MenuItem value="CAT C3.3 - Power 65 KVA - OMV REF 800-CEDE-7100">
              CAT C3.3 - Power 65 KVA - OMV REF 800-CEDE-7100
            </MenuItem>
            <MenuItem value="CAT C3.3 - Power 66 KVA - OMV REF 800-CEDE-3800">
              CAT C3.3 - Power 66 KVA - OMV REF 800-CEDE-3800
            </MenuItem>
            <MenuItem value="OLYMPIAN - Power 50 KVA - OMV REF 800-CEDE-2300">
              OLYMPIAN - Power 50 KVA - OMV REF 800-CEDE-2300
            </MenuItem>
            <MenuItem value="SDMO - Power 400 KVA - OMV REF 800-CEDE-5000">
              SDMO - Power 400 KVA - OMV REF 800-CEDE-5000
            </MenuItem>
            <MenuItem value="SDMO - Power 400 KVA - OMV REF 800-CEDE-4000">
              SDMO - Power 400 KVA - OMV REF 800-CEDE-4000
            </MenuItem>
            <MenuItem value="CAT C3.3 - Power 65 KVA - OMV REF 800-CEDE-3600">
              CAT C3.3 - Power 65 KVA - OMV REF 800-CEDE-3600
            </MenuItem>
            <MenuItem value="CAT C3.3 - Power 65 KVA - OMV REF 800-CEDE-3900">
              CAT C3.3 - Power 65 KVA - OMV REF 800-CEDE-3900
            </MenuItem>
            <MenuItem value="CAT C18 - Power 618 KVA - OMV REF 800-EGMD-5041">
              CAT C18 - Power 618 KVA - OMV REF 800-EGMD-5041
            </MenuItem>
            <MenuItem value="CAT GAZ - Power 900 KVA - OMV REF 800-EGMD-5040">
              CAT GAZ - Power 900 KVA - OMV REF 800-EGMD-5040
            </MenuItem>
            <MenuItem value="SDMO - Power 500 KVA - OMV REF 800-CEDE-8000">
              SDMO - Power 500 KVA - OMV REF 800-CEDE-8000
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ gridColumn: "span 2",...style }}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            onChange={
            //   (e)=>{
            //     setData({Status:e.target.value,...data})
            // }
            handleChange
          }
          value={values.Status}
            label="Status"
            variant="filled"
            name="Status"
            error={!!touched.Status && !!errors.Status}
            helperText={touched.Status && errors.Status}
          >
            <MenuItem value="Running">Running</MenuItem>
            <MenuItem value="Standby">Standby</MenuItem>
            <MenuItem value="Disconnected">Disconnected</MenuItem>
          </Select>
        </FormControl>
        <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Last PM Hours"
                onBlur={handleBlur}
                value={values.Last_PM_Hours}
                onChange={handleChange
                //   (e)=>{
                //     setData({Last_PM_Hours:e.target.value,...data})
                // }
              }
                name="Last_PM_Hours"
                error={!!touched.Last_PM_Hours && !!errors.Last_PM_Hours}
                helpertext={touched.Last_PM_Hours && errors.Last_PM_Hours}
                sx={{ gridColumn: "span 2",...style,...style }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Running Hours"
                onBlur={handleBlur}
                value={values.Running_Hours}
                onChange={handleChange
                //   (e)=>{
                //     setData({Running_Hours:e.target.value,...data})
                // }
              }
                name="Running_Hours"
                error={!!touched.Running_Hours && !!errors.Running_Hours}
                helpertext={touched.Running_Hours && errors.Running_Hours}
                sx={{ gridColumn: "span 2",...style }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Electric Power P"
                onBlur={handleBlur}
                value={values.Electric_Power_P}
                onChange={handleChange
                //   (e)=>{
                //     setData({Electric_Power_P:e.target.value,...data})
                // }
              }
                name="Electric_Power_P"
                error={!!touched.Electric_Power_P && !!errors.Electric_Power_P}
                helpertext={touched.Electric_Power_P && errors.Electric_Power_P}
                sx={{ gridColumn: "span 2",...style }}
              />

              <FormControl sx={{ gridColumn: "span 2",...style }}>
                <InputLabel id="demo-simple-select-label">
                  Apparent Power S
                </InputLabel>
                <Select
            onChange={
              handleChange
            //   (e)=>{



             
            //     const { value } = e.target;
            //     setSelectedOption(value);
            
            //     if (value === 'Other') {
            //       setShowAdditionalTextField(true);
            //     } else {
            //       setShowAdditionalTextField(false);
            //     }
            


            //     setData({Apparent_Power_S:e.target.value,...data})
            // }
          }
          value={values.Apparent_Power_S}
            label="Apparent_Power_S"
            variant="filled"
            name="Apparent_Power_S"
            error={!!touched.Apparent_Power_S && !!errors.Apparent_Power_S}
            helperText={touched.Apparent_Power_S && errors.Apparent_Power_S}
          >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                  
                </Select>
              </FormControl>
              {/* {showAdditionalTextField && (
        <TextField
        fullWidth
        variant="outlined"
        type="text"
        label="Other options for Apparent_Power_S"
        value={values.Apparent_Power_S}
        onChange={
          handleChange
      //     (e)=>{



      //     console.log("------------------------------------------------");
      //     console.log(data)

      //     console.log("------------------------------------------------");
      
          
      //     setData({Apparent_Power_S:e.target.value,...data})
         
      // }
    }
        name="Apparent_Power_S"
        error={!!touched.Apparent_Power_S && !!errors.Apparent_Power_S}
        helpertext={touched.Apparent_Power_S && errors.Apparent_Power_S}
        sx={{ gridColumn: "span 2",...style }}
      />
      )} */}

     </Box>
     <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color='secondary'
              variant='contained'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button color='secondary' variant='contained'  type="submite">
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
    </form>
  )}}
</Formik>
</Box>

    </>)
}

export default Step1;