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


const Step4=({data,setData,activeStep,handleBack,isStepOptional,handleSkip,handleNext,steps})=>{
    const {id} = useParams();
    const[dataTechnicien,setDataTechnicien]=useState([]);
    const[isLoading,setisLoading]=useState(true);
    const location = useLocation();
    const [selectedOption, setSelectedOption] = useState('');
    const [showAdditionalTextField, setShowAdditionalTextField] = useState(false);
    const navigate=useNavigate()
  
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
        await axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/rapport`, {...data,...values})
      .then((response) =>
      {  Swal.fire("Success", `rapport a ete ajouter avec succes`, "success")
    navigate('/admin/cardprojet')}
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
     Indication_Lamps_Function_Check :data?.Indication_Lamps_Function_Check ||  "" ,
     Selector_Switches_Meters_Function_Check : data?.Selector_Switches_Meters_Function_Check || "" ,
     Body_Earthing_of_Alternator_and_Panel_Check : data?.Body_Earthing_of_Alternator_and_Panel_Check || "" ,
     Anti_vibration_mounting_is_effective : data?.Anti_vibration_mounting_is_effective || "" ,
     Engine_Exhaust_System_Installation_and_Condition : data?.Engine_Exhaust_System_Installation_and_Condition || "" ,
     Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler:  data?.Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler ||"" ,
     Failures_and_Observations :data?.Failures_and_Observations ||  "" ,
     Intervention : data?.Intervention || "",
     id_tache:id
  };
  const checkoutSchema = yup.object().shape({
    Indication_Lamps_Function_Check : yup.string().required("Required")  ,
    Selector_Switches_Meters_Function_Check:   yup.string().required("Required") ,
    Body_Earthing_of_Alternator_and_Panel_Check :  yup.string().required("Required") ,
    Anti_vibration_mounting_is_effective : yup.string().required("Required") ,
    Engine_Exhaust_System_Installation_and_Condition :  yup.string().required("Required") ,
    Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler :  yup.string().required("Required") ,
    Failures_and_Observations :  yup.string().required("Required"),
    Intervention :  yup.string().required("Required"),
     
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
                  Indication Lamps Function Check
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Indication Lamps Function Check"
                  variant="filled"
                  name="Indication_Lamps_Function_Check"
                  value={values.Indication_Lamps_Function_Check}
                  error={
                    !!touched.Indication_Lamps_Function_Check &&
                    !!errors.Indication_Lamps_Function_Check
                  }
                  helperText={
                    touched.Indication_Lamps_Function_Check &&
                    errors.Indication_Lamps_Function_Check
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Selector Switches Meters Function Check
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Selector Switches Meters Function Check"
                  variant="filled"
                  name="Selector_Switches_Meters_Function_Check"
                  value={values.Selector_Switches_Meters_Function_Check}
                  error={
                    !!touched.Selector_Switches_Meters_Function_Check &&
                    !!errors.Selector_Switches_Meters_Function_Check
                  }
                  helperText={
                    touched.Selector_Switches_Meters_Function_Check &&
                    errors.Selector_Switches_Meters_Function_Check
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Body Earthing of Alternator and Panel Check
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Body Earthing of Alternator and Panel Check"
                  variant="filled"
                  name="Body_Earthing_of_Alternator_and_Panel_Check"
                  value={values.Body_Earthing_of_Alternator_and_Panel_Check}
                  error={
                    !!touched.Body_Earthing_of_Alternator_and_Panel_Check &&
                    !!errors.Body_Earthing_of_Alternator_and_Panel_Check
                  }
                  helperText={
                    touched.Body_Earthing_of_Alternator_and_Panel_Check &&
                    errors.Body_Earthing_of_Alternator_and_Panel_Check
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Anti vibration mounting is effective
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Anti vibration mounting is effective"
                  variant="filled"
                  name="Anti_vibration_mounting_is_effective"
                  value={values.Anti_vibration_mounting_is_effective}
                  error={
                    !!touched.Anti_vibration_mounting_is_effective &&
                    !!errors.Anti_vibration_mounting_is_effective
                  }
                  helperText={
                    touched.Anti_vibration_mounting_is_effective &&
                    errors.Anti_vibration_mounting_is_effective
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Engine Exhaust System Installation and Condition
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Engine Exhaust System Installation and Condition"
                  variant="filled"
                  name="Engine_Exhaust_System_Installation_and_Condition"
                  value={values.Engine_Exhaust_System_Installation_and_Condition}
                  error={
                    !!touched.Engine_Exhaust_System_Installation_and_Condition &&
                    !!errors.Engine_Exhaust_System_Installation_and_Condition
                  }
                  helperText={
                    touched.Engine_Exhaust_System_Installation_and_Condition &&
                    errors.Engine_Exhaust_System_Installation_and_Condition
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Intake Manifold/Aftercooler/JWAC-SCAC air cooler
                </InputLabel>
                <Select
                  onChange={handleChange}
                  label="Intake Manifold/Aftercooler/JWAC-SCAC air cooler"
                  variant="filled"
                  name="Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler"
                  value={values.Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler}
                  error={
                    !!touched.Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler &&
                    !!errors.Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler
                  }
                  helperText={
                    touched.Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler &&
                    errors.Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Failures and Observations"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Failures_and_Observations}
                name="Failures_and_Observations"
                error={
                  !!touched.Failures_and_Observations &&
                  !!errors.Failures_and_Observations
                }
                helpertext={
                  touched.Failures_and_Observations &&
                  errors.Failures_and_Observations
                }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Intervention"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Intervention}
                name="Intervention"
                error={!!touched.Intervention && !!errors.Intervention}
                helpertext={touched.Intervention && errors.Intervention}
                sx={{ gridColumn: "span 2" }}
              />
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

export default Step4;