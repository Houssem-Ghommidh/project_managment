// docs https://github.com/azouaoui-med/react-pro-sidebar
import { useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar,SubMenu  } from "react-pro-sidebar";
import { useSidebarContext } from "./sidebarContext";
import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";
import EngineeringIcon from '@mui/icons-material/Engineering';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ExtensionIcon from '@mui/icons-material/Extension';
import SellIcon from '@mui/icons-material/Sell';
import ForwardIcon from '@mui/icons-material/Forward';
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  
  const theme = useTheme();
  
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: `${colors.primary[400]}`,
        },
        // "& .menu-item:hover ":{
        //    color: `${colors.blueAccent[500]} !important`,
        //   backgroundColor: "transparent !important",
        // },
        "& .menu-anchor:hover": {
          color: `${colors.blueAccent[400]} !important`,
          backgroundColor: `${colors.primary[400]} !important`,
          
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        image={sidebarImage}
      >
        <Menu iconshape="square">
          <MenuItem
            icon={
              collapsed ? (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              ) : sidebarRTL ? (
                <SwitchLeftOutlinedIcon
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              ) : (
                <SwitchRightOutlinedIcon
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              )
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>

{localStorage.getItem('role')}                </Typography>
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& .avater-image": {
                    backgroundColor: colors.primary[500],
                  },
                }}
              >
                <img
                  className="avater-image"
                  alt="profile user"
                  width="100px"
                  height="100px"
                  src={`${process.env.REACT_APP_BASE_URL}/api/userImages/${localStorage.getItem('image')}`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
{`${localStorage.getItem('first_name')} ${localStorage.getItem('last_name')}`}                   </Typography>
              </Box>
            </Box>
          )}
           <Box paddingLeft={collapsed ? undefined : "10%"}>
           {localStorage.getItem("role") == "admin" && <Item
              title="Dashboard"
              to="/admin/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> }
                        <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
            </Typography>
            {localStorage.getItem("role") == "admin" && <SubMenu  icon={<EngineeringIcon />}  label="Fournisseur">
            <Item
              title="Ajouter fournisseur"
              to="/admin/formfournisseur"
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="List Fournisseur"
              to="/admin/listfourniseur"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            </SubMenu>}
            <SubMenu  icon={<Inventory2Icon />}  label="Product">
            {localStorage.getItem("role") == "admin" &&<Item
              title="Ajouter Product"
              to="/admin/formproduit"
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />}
              <Item
              title="List Product"
              to="/admin/listproduit"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            </SubMenu>

            {localStorage.getItem("role") == "admin" && <SubMenu  icon={<ManageAccountsIcon />}  label="Gestion des comptes">
            <Item
              title="Ajouter Users"
              to="/admin/formuser"
              icon={<AddCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="List Users"
              to="/admin/listuser"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            </SubMenu>}
             
            <SubMenu  icon={<BusinessCenterIcon />}  label="Projet">
     
              {/* <Item
              title="List Projet"
              to="/admin/listprojet"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="view Projet"
              to="/admin/cardprojet"
              icon={<BusinessCenterIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Affecter superviseur"
              to="/admin/affectersupperviseur"
              icon={<ForwardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Affecter client"
              to="/admin/affecterclient"
              icon={<ForwardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
                    <Item
              title="Affecter Technicien"
              to="/admin/affectertechnicien"
              icon={<ForwardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Taches"
              to="/admin/tache"
              icon={<AddTaskIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            </SubMenu>
            <SubMenu  icon={<ExtensionIcon />}  label="Demande de produit">

{/* <Item
title="ajouter demande Product"
to="/admin/demandeproduit"
icon={<AddCircleIcon />}
selected={selected}
setSelected={setSelected}
/> */}
<Item
title="List demande Product"
to="/admin/listdemandeproduit"
icon={<FormatListBulletedIcon />}
selected={selected}
setSelected={setSelected}
/>
</SubMenu>
<SubMenu  icon={<SellIcon />}  label="Demande d'achat">

{/* <Item
title="ajouter demande achat"
to="/admin/demandeachat"
icon={<AddCircleIcon />}
selected={selected}
setSelected={setSelected}
/> */}
<Item
title="List demande achat"
to="/admin/listdemandeachat"
icon={<FormatListBulletedIcon />}
selected={selected}
setSelected={setSelected}
/>
</SubMenu>
<SubMenu  icon={<AccessTimeFilledIcon />}  label="Pointage">

{/* <Item
title="ajouter demande achat"
to="/admin/demandeachat"
icon={<AddCircleIcon />}
selected={selected}
setSelected={setSelected}
/> */}
<Item
title="List Pointage"
to="/admin/listpointage"
icon={<FormatListBulletedIcon />}
selected={selected}
setSelected={setSelected}
/>
</SubMenu>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
