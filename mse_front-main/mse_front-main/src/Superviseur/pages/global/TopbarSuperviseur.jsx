import React from "react";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import { useTheme, Box, IconButton, InputBase } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useProSidebar } from "react-pro-sidebar";
import ProtectedRouteHook from "../../../pages/login/protected-route-hook";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
const TopbarSuperviseur = () => {
const navigate = useNavigate();
const logOut = () => {
  localStorage.removeItem("last_name")
  localStorage.removeItem("id_project")
  localStorage.removeItem("user")

  localStorage.removeItem("role")

  localStorage.removeItem("id")
  localStorage.removeItem("image")

  localStorage.removeItem("first_name")

  localStorage.removeItem("token")
}
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { toggleSidebar, broken, rtl } = useProSidebar();

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex">
        {broken && !rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
     
      </Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            
           <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        
        <IconButton >
          <PersonOutlinedIcon onClick={()=>{
          navigate('/superviseur/profilepage', { state: { image: localStorage.getItem('image'), firstName:localStorage.getItem('first_name'),lastName:localStorage.getItem('last_name'),role:localStorage.getItem('role') }});
        }} />
        </IconButton>
        <IconButton onClick={()=>{
          logOut();
          navigate('/login');
        }}>
          <LogoutIcon />
        </IconButton>
        {broken && rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default TopbarSuperviseur;
