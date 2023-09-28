import React, {useState} from "react";


import { useMediaQuery } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Header from "../../components/Header";


const MainStep=()=>{

    const {id} = useParams();
    const[dataTechnicien,setDataTechnicien]=useState([]);
    const[data,setData]=useState({});
    const[isLoading,setisLoading]=useState(true);
    const location = useLocation();
    const [selectedOption, setSelectedOption] = useState('');
    const [showAdditionalTextField, setShowAdditionalTextField] = useState(false);
  console.log("tahani",data)
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
  
   const styleStepper = {
    '& .MuiStepLabel-root .Mui-completed': {
      color: 'secondary.dark', // circle color (COMPLETED)
    },
    '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
      {
        color: 'grey.500', // Just text label (COMPLETED)
      },
    '& .MuiStepLabel-root .Mui-active': {
      color: 'secondary.main', // circle color (ACTIVE)
    },
    '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
      {
        color: 'common.white', // Just text label (ACTIVE)
      },
    '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
      fill: 'black', // circle's number (ACTIVE)
    },
  }
    const [dateValue, setDateValue] = useState("");
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = async (values) => {
      values.date = dateValue;
      console.log(values);
      // await axios
      //   .post(`${process.env.REACT_APP_BASE_URL}/api/rapport`, values)
      //   .then((response) =>
      //     Swal.fire("Success", `rapport a ete ajouter avec succes`, "success")
      //   )
      //   .catch((e) =>
      //     Swal.fire({
      //       icon: "error",
      //       title: "Oops...",
      //       text: `${e.response.data.errors[0].msg}`,
      //     })
      //   );
    };
   
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const handleChangeDate =(e) => {
      console.log(e)
      var mois = "";
      
      if (parseInt(e.$M,10) < 10){
        mois = "0"+e.$M;
      }
     var date = e.$y+"-"+mois +"-"+e.$D;
      setDateValue(date);
      console.log(dateValue);
    }
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
    
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
  
    const isStepOptional = (step) => {
      return step === 1;
    };
  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
    const steps = ['Step1', 'Step2', 'Step3','Step4'];
   
console.log("fffff",activeStep)
    return(<Box m='20px'>
<Header title="CREATE FORM" subtitle="Create a New Form" />

<Stepper sx={styleStepper} activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {
            activeStep ===0 ?  <Step1 data={data} setData={setData} activeStep={activeStep} handleBack={handleBack} isStepOptional={isStepOptional} handleSkip={handleSkip} handleNext={handleNext} steps={steps}/> : 
            activeStep===1 ? <Step2 data={data} setData={setData} activeStep={activeStep} handleBack={handleBack} isStepOptional={isStepOptional} handleSkip={handleSkip} handleNext={handleNext} steps={steps}/> :
            activeStep===2 ? <Step3 data={data} setData={setData} activeStep={activeStep} handleBack={handleBack} isStepOptional={isStepOptional} handleSkip={handleSkip} handleNext={handleNext} steps={steps}/> :
            <Step4 data={data} setData={setData} activeStep={activeStep} handleBack={handleBack} isStepOptional={isStepOptional} handleSkip={handleSkip} handleNext={handleNext} steps={steps}/>
          }
         
        </React.Fragment>
 
   
    </Box>)
}

export default MainStep;