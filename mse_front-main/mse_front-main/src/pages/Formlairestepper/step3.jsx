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


const Step3=({data,setData,activeStep,handleBack,isStepOptional,handleSkip,handleNext,steps})=>{
    const {id} = useParams();
    const[dataTechnicien,setDataTechnicien]=useState([]);
    const[isLoading,setisLoading]=useState(true);
    const location = useLocation();
    const [selectedOption, setSelectedOption] = useState('');
    const [showAdditionalTextField, setShowAdditionalTextField] = useState(false);
  console.log(steps)
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
     
     Fuel_Day_Tank_Fuel_Level : data?.Fuel_Day_Tank_Fuel_Level || "" ,
     Air_Cleaner_Filter_Condition:  data?.Air_Cleaner_Filter_Condition ||"" ,
     Turbocharger_Check : data?.Turbocharger_Check || "" ,
     Inspect_Battery_Cables_and_Battery_Connections : data?.Inspect_Battery_Cables_and_Battery_Connections || "" ,
     Starter_Motors :  data?.Starter_Motors ||"" ,
     Alternator_Pulleys_Belts_Tensioner :  data?.Alternator_Pulleys_Belts_Tensioner ||"" ,
     Meters_Gauges :  data?.Meters_Gauges ||"" ,
     Control_Panel : data?.Control_Panel || "" ,
     Electrical_Connections : data?.Electrical_Connections || "" ,
  
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const checkoutSchema = yup.object().shape({
    Fuel_Day_Tank_Fuel_Level:yup.string().required("Required") ,
    Air_Cleaner_Filter_Condition : yup.string().required("Required")  ,
    Turbocharger_Check:   yup.string().required("Required") ,
    Inspect_Battery_Cables_and_Battery_Connections :  yup.string().required("Required") ,
    Starter_Motors : yup.string().required("Required") ,
    Alternator_Pulleys_Belts_Tensioner :  yup.string().required("Required") ,
    Meters_Gauges :  yup.string().required("Required") ,
    Control_Panel :  yup.string().required("Required"),
    Electrical_Connections :  yup.string().required("Required"),
     
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
                  Fuel Day Tank/Fuel Level
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Fuel Day Tank/Fuel Level"
                  variant="filled"
                  name="Fuel_Day_Tank_Fuel_Level"
                  value={values.Fuel_Day_Tank_Fuel_Level}
                  error={
                    !!touched.Fuel_Day_Tank_Fuel_Level &&
                    !!errors.Fuel_Day_Tank_Fuel_Level
                  }
                  helperText={
                    touched.Fuel_Day_Tank_Fuel_Level &&
                    errors.Fuel_Day_Tank_Fuel_Level
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Air Cleaner/Filter Condition
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Air Cleaner/Filter Condition"
                  variant="filled"
                  name="Air_Cleaner_Filter_Condition"
                  value={values.Air_Cleaner_Filter_Condition}
                  error={
                    !!touched.Air_Cleaner_Filter_Condition &&
                    !!errors.Air_Cleaner_Filter_Condition
                  }
                  helperText={
                    touched.Air_Cleaner_Filter_Condition &&
                    errors.Air_Cleaner_Filter_Condition
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Turbocharger Check
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Turbocharger Check"
                  variant="filled"
                  name="Turbocharger_Check"
                  value={values.Turbocharger_Check}
                  error={
                    !!touched.Turbocharger_Check && !!errors.Turbocharger_Check
                  }
                  helperText={
                    touched.Turbocharger_Check && errors.Turbocharger_Check
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Inspect Battery Cables and Battery Connections
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Inspect Battery Cables and Battery Connections"
                  variant="filled"
                  name="Inspect_Battery_Cables_and_Battery_Connections"
                  value={values.Inspect_Battery_Cables_and_Battery_Connections}
                  error={
                    !!touched.Inspect_Battery_Cables_and_Battery_Connections &&
                    !!errors.Inspect_Battery_Cables_and_Battery_Connections
                  }
                  helperText={
                    touched.Inspect_Battery_Cables_and_Battery_Connections &&
                    errors.Inspect_Battery_Cables_and_Battery_Connections
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Starter Motors
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Starter Motors"
                  value={values.Starter_Motors}
                  variant="filled"
                  name="Starter_Motors"
                  error={!!touched.Starter_Motors && !!errors.Starter_Motors}
                  helperText={touched.Starter_Motors && errors.Starter_Motors}
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Alternator/Pulleys/Belts/Tensioner
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Alternator/Pulleys/Belts/Tensioner"
                  variant="filled"
                  name="Alternator_Pulleys_Belts_Tensioner"
                  value={values.Alternator_Pulleys_Belts_Tensioner}
                  error={
                    !!touched.Alternator_Pulleys_Belts_Tensioner &&
                    !!errors.Alternator_Pulleys_Belts_Tensioner
                  }
                  helperText={
                    touched.Alternator_Pulleys_Belts_Tensioner &&
                    errors.Alternator_Pulleys_Belts_Tensioner
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Meters Gauges
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Meters Gauges"
                  variant="filled"
                  name="Meters_Gauges"
                  value={values.Meters_Gauges}
                  error={!!touched.Meters_Gauges && !!errors.Meters_Gauges}
                  helperText={touched.Meters_Gauges && errors.Meters_Gauges}
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Control Panel
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Control Panel"
                  variant="filled"
                  name="Control_Panel"
                  value={values.Control_Panel}
                  error={!!touched.Control_Panel && !!errors.Control_Panel}
                  helperText={touched.Control_Panel && errors.Control_Panel}
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Electrical Connections
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Electrical Connections"
                  variant="filled"
                  name="Electrical_Connections"
                  value={values.Electrical_Connections}
                  error={
                    !!touched.Electrical_Connections &&
                    !!errors.Electrical_Connections
                  }
                  helperText={
                    touched.Electrical_Connections &&
                    errors.Electrical_Connections
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
                          {activeStep === steps?.length - 1 ? 'Finish' : 'Next'}
                        </Button>
            </Box>
    </form>
  )}
</Formik>
</Box>

    </>)
}

export default Step3;