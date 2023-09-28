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


const Step2=({data,setData,activeStep,handleBack,isStepOptional,handleSkip,handleNext,steps})=>{
    const {id} = useParams();
    const[dataTechnicien,setDataTechnicien]=useState([]);
    const[isLoading,setisLoading]=useState(true);

    const [selectedOption, setSelectedOption] = useState('');
    const [showAdditionalTextField, setShowAdditionalTextField] = useState(false);
  
    const handleSelectChange = (event) => {
      const { value } = event.target;
      setSelectedOption(value);
  
      // Show the additional TextField when a specific option is selected
      if (value === 'Other') {
        setShowAdditionalTextField(true);
      } else {
        setShowAdditionalTextField(false);
      }
    };
  
  
    async function getTechniecien(){
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/techniciens/${id}`);
        setDataTechnicien(res.data.data); 
        setisLoading(false)
    }
    useEffect(() => {
      getTechniecien();
    
    }, [])
  
  
    const [dateValue, setDateValue] = useState("");
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = async (values) => {
      console.log(values);
      setData({...data,...values})
      handleNext();
    };
    
    const initialValues = {          
     Oil_System_Check : data?.Oil_System_Check || "" ,
     Oil_Level : data?.Oil_Level || "" ,
     Oil_Pressure : data?.Oil_Pressure || "" ,
     Oil_Temperature : data?.Oil_Temperature || "" ,
     Cooling_Water_System_Check :  data?.Cooling_Water_System_Check ||"" ,
     Cooling_Water_Temperature : data?.Cooling_Water_Temperature || "" ,
     Radiator_Water_Level : data?.Radiator_Water_Level || "" ,
     Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases : data?.Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases || "" ,
     Fuel_Water_Separator_Check : data?.Fuel_Water_Separator_Check ||"" ,
  };
  const checkoutSchema = yup.object().shape({             
    Oil_System_Check:yup.string().required("Required") ,
    Oil_Level : yup.string().required("Required")  ,
    Oil_Pressure:   yup.string().required("Required") ,
    Oil_Temperature :  yup.string().required("Required") ,
    Cooling_Water_System_Check : yup.string().required("Required") ,
    Cooling_Water_Temperature :  yup.string().required("Required") ,
    Radiator_Water_Level :  yup.string().required("Required") ,
    Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases :  yup.string().required("Required"),
    Fuel_Water_Separator_Check :  yup.string().required("Required"),
  });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
<Header title="CREATE FORM" subtitle="Create a New Form" />

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
      <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Oil System Check
                </InputLabel>
                <Select
                  label="Oil System Check"
                  variant="filled"
                  value={values.Oil_System_Check}
                  name="Oil_System_Check"
                  onChange={handleChange}
                  error={
                    !!touched.Oil_System_Check && !!errors.Oil_System_Check
                  }
                  helperText={
                    touched.Oil_System_Check && errors.Oil_System_Check
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl> <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">Oil Level</InputLabel>
                <Select
                  onChange={handleChange}
                  value={values.Oil_Level}
                  label="Oil Level"
                  variant="filled"
                  name="Oil_Level"
                  error={!!touched.Oil_Level && !!errors.Oil_Level}
                  helperText={touched.Oil_Level && errors.Oil_Level}
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Oil Pressure
                </InputLabel>
                <Select
                  onChange={handleChange}
                  value={values.Oil_Pressure}
                  label="Oil Pressure"
                  variant="filled"
                  name="Oil_Pressure"
                  error={!!touched.Oil_Pressure && !!errors.Oil_Pressure}
                  helperText={touched.Oil_Pressure && errors.Oil_Pressure}
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Oil Temperature
                </InputLabel>
                <Select
                  onChange={handleChange}
                  value={values.Oil_Temperature}
                  label="Oil Temperature"
                  variant="filled"
                  name="Oil_Temperature"
                  error={!!touched.Oil_Temperature && !!errors.Oil_Temperature}
                  helperText={touched.Oil_Temperature && errors.Oil_Temperature}
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Cooling Water System Check
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Cooling Water System Check"
                  variant="filled"
                  value={values.Cooling_Water_System_Check}
                  name="Cooling_Water_System_Check"
                  error={
                    !!touched.Cooling_Water_System_Check &&
                    !!errors.Cooling_Water_System_Check
                  }
                  helperText={
                    touched.Cooling_Water_System_Check &&
                    errors.Cooling_Water_System_Check
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Cooling Water Temperature
                </InputLabel>
                <Select
                  onChange={handleChange}
                  value={values.Cooling_Water_Temperature}
                  label="Cooling Water Temperature"
                  variant="filled"
                  name="Cooling_Water_Temperature"
                  error={
                    !!touched.Cooling_Water_Temperature &&
                    !!errors.Cooling_Water_Temperature
                  }
                  helperText={
                    touched.Cooling_Water_Temperature &&
                    errors.Cooling_Water_Temperature
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Radiator Water Level
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Radiator Water Level"
                  variant="filled"
                  name="Radiator_Water_Level"
                  value={values.Radiator_Water_Level}
                  error={
                    !!touched.Radiator_Water_Level &&
                    !!errors.Radiator_Water_Level
                  }
                  helperText={
                    touched.Radiator_Water_Level && errors.Radiator_Water_Level
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Fuel Filters/Fuel Lines/Pumps /Filter Bases
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Fuel Filters/Fuel Lines/Pumps /Filter Bases"
                  variant="filled"
                  name="Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases"
                  value={values.Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases}
                  error={
                    !!touched.Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases &&
                    !!errors.Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases
                  }
                  helperText={
                    touched.Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases &&
                    errors.Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Fuel Water Separator Check
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Fuel Water Separator Check"
                  variant="filled"
                  name="Fuel_Water_Separator_Check"
                  value={values.Fuel_Water_Separator_Check}
                  error={
                    !!touched.Fuel_Water_Separator_Check &&
                    !!errors.Fuel_Water_Separator_Check
                  }
                  helperText={
                    touched.Fuel_Water_Separator_Check &&
                    errors.Fuel_Water_Separator_Check
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

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
  )}
</Formik>
</Box>

    </>)
}

export default Step2;