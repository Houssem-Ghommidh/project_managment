import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import DeleteIcon from '@mui/icons-material/Delete';
import logo from './assests/images/logo.png'
import { tokens } from './theme';
import { useLocation } from 'react-router-dom';


const ProfilePage = () => {
  const location = useLocation();
  const {image,role,firstName,lastName } = location.state;
  const [profileInfo, setProfileInfo] = useState({image,role,firstName,lastName});
  console.log(profileInfo)
  const [imagePreview, setImagePreview] = useState(null);



  const handleInputChange = (e) => {
    setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileInfo({ ...profileInfo, image: reader.result });
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setProfileInfo({ ...profileInfo, image: null });
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., update the user profile
    console.log(profileInfo);
  };
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);

  return (
    <Box m='20px' >
    <Card sx={{    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing(4),backgroundColor:colors.primary[400]}}>
      <CardContent>
        {/* <CardHeader title="Edit Profile" /> */}
        <Avatar
        sx={{
            width: theme.spacing(10),
            height: theme.spacing(10),
            margin: 'auto',
            marginBottom: theme.spacing(5),
            marginTop: theme.spacing(3),
        }}
          alt="Profile Image"
          src={imagePreview ||`${process.env.REACT_APP_BASE_URL}/api/userImages/${profileInfo.image}`}
        />
              {/* <Grid item xs={12} >
                <Box mb={2} display={'flex'}  justifyContent={'center'} justifySelf={'center'} justifyItems={'center'} alignContent={'center'} alignItems={'center'} alignSelf={'center'} >
              <input
                type="file"
                accept="image/*"
                id="profile-image-input"
                style={{ display: 'none',}}
                onChange={handleImageUpload}
              />
              <label htmlFor="profile-image-input">
                <Button
                  variant="contained"
                  component="span"
                  color='secondary'
                  sx={{marginTop: theme.spacing(2),
                    marginLeft: theme.spacing(1),'& svg': {
                        marginRight: theme.spacing(1),
                      },}}
                >
                    <CloudUploadIcon />
                  Choose File
                </Button>
              </label>
              {profileInfo.image && (
            
                <IconButton
                  aria-label="delete image"
                  onClick={handleImageDelete}
                  sx={{    color: theme.palette.error.main,
                    marginTop: theme.spacing(2),
                    marginLeft: theme.spacing(1)
                  }}
                >
                  <DeleteIcon />
                </IconButton>
            )}
              </Box>
            </Grid> */}
           
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
              disabled
                fullWidth
                label="First Name"
                name="first_name"
                value={profileInfo.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              disabled
                fullWidth
                label="Last Name"
                name="last_name"
                value={profileInfo.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              disabled
                fullWidth
                label="Role"
                name="role"
                value={profileInfo.role}
                onChange={handleInputChange}
              />
            </Grid>
           
            <Grid item xs={12} sx={{    marginTop: theme.spacing(2),
    textAlign: 'center',}}>
              {/* <Button type="submit" variant="contained" color="secondary">
                Save Changes
              </Button> */}
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
    </Box>
  );
};

export default ProfilePage;
