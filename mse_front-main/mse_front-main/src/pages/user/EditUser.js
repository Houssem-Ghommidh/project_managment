import React from 'react'
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getSingleusers} from '../../redux/userSlice';
import{useParams,useNavigate} from "react-router-dom"


const UpdateUser = () => {
const dispatch =useDispatch();
const navigate=useNavigate()
const [showPass,setShowPass]=useState(false)
const [showPass2,setShowPass2]=useState(false)
const {data} = useSelector(state=>state.users)
const {status} = useSelector(state=>state.users)
const {id}=useParams()
useEffect(()=>{
    dispatch(getSingleusers(id))
    
    
      },[dispatch])
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values) => {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("first_name", values.first_name);

      formData.append("last_name", values.last_name);

      formData.append("email", values.email);
      formData.append("role", values.role);

      axios
        .put(`${process.env.REACT_APP_BASE_URL}/api/users/${id}`,{
          first_name:values.first_name,
          last_name:values.last_name,
          email: values.email,
          role:values.role,
          _id:data?._id
        })
        .then((response) => {
          Swal.fire("Success", `User has been successfully updated`, "success")
          navigate('/admin/listuser')

        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.response.data.errors[0].msg}`,
          })
        });
      
    };
    const initialValues = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      email: data?.email,
      image: data?.image,
      role: data?.role,
    };
    const checkoutSchema = yup.object().shape({
      first_name:yup.string().required("Required"),
      last_name:yup.string().required("Required"),
      email:yup.string().email("Invalid email!").required("Required"),
      role:yup.string().required("Required"),
})


    return (
      status!="loading" && <Box m="20px">
          <Header title="UPDATE USERS" subtitle="Update a New user" />
    
          <Formik enableReinitialize={true}  onSubmit={handleFormSubmit}  initialValues={initialValues} validationSchema={checkoutSchema}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit,setFieldValue}) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                    <Box sx={{ gridColumn: "span 4" }}>

{/*                     
                  <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              setFieldValue('image', event.currentTarget.files[0]);
            }}
          /> */}
 
 </Box>
         
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.first_name}
                    helperText={touched.first_name && errors.first_name}
                    name="first_name"
                    error={!!touched.first_name && !!errors.first_name}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.last_name}
                    name="last_name"
                    error={!!touched.last_name && !!errors.last_name}
                    helperText={touched.last_name && errors.last_name}
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
                            <FormControl sx={{ gridColumn: "span 4" }}>
  <InputLabel id="demo-simple-select-label">Role</InputLabel>
  <Select
    onChange={(event) => {
      setFieldValue('role', event.target.value);
    }}
    label="Role"
    variant="filled"
    name="role"
    defaultValue={data?.role}
    error={!!touched.role && !!errors.role}
    helperText={touched.role && errors.role}
  >
     <MenuItem value="admin">admin</MenuItem>
     <MenuItem value="superviseur">superviseur</MenuItem>
     <MenuItem value="technicien">technicien</MenuItem>
     <MenuItem value="client">client</MenuItem>

    
 
  </Select>
  </FormControl>
                 
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Update User
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      );
}

export default UpdateUser