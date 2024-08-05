import * as React from "react";
import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaRegHospital } from "react-icons/fa";
import { GrTest } from "react-icons/gr";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import "../Assets/style.css";
import "../Assets/style/color.css";

import NavDropdown from "react-bootstrap/NavDropdown";
import { BsPersonCircle } from "react-icons/bs";

import { AiTwotoneHome } from "react-icons/ai";
import { FaBed } from "react-icons/fa";
import { TbPhysotherapist } from "react-icons/tb";

import { FaUserDoctor } from "react-icons/fa6";

import { IoSettingsOutline } from "react-icons/io5";

import { TbReportMedical } from "react-icons/tb";

import { navigate, useNavigate } from "react-router-dom";
import { TbBuildingHospital } from "react-icons/tb";
import hp_rm from "../Assets/images/hp_rm.png";
import { Link, Outlet } from "react-router-dom";
import { FaRegCalendarCheck } from "react-icons/fa6";
import axios from "axios";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Dashboard() {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const data = React.useContext(userContext)

  // console.log(data)

  //-----------------authentiate--------

  const [role, setRole] = useState("");
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
    
      .get("http://localhost:8080/api/user/verify/getUserdata")
      .then((res) => {
        console.log(res, "dashboard");
        if (res.data.Status === "success") {
          setRole(res.data.role);
          setAuth(true);
          setName(res.data.email);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleDelete = () => {
    axios
      .get("http://localhost:8081/hptl/user/logout")
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ backgroundColor: "#89bec5" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div"></Typography>
          <BsPersonCircle className="person" size={30} />

          <NavDropdown
            className="profile"
            id=""
            title="Admin"
            style={{ color: "white" }}
          >
            <NavDropdown.Item href="#action/3.1">
              Welcome..{name}
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>
            <NavDropdown.Item>
              <button className="btn btn-danger" onClick={handleDelete}>
                Logout
              </button>
            </NavDropdown.Item>
          </NavDropdown>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} style={{}}>
        <DrawerHeader
          style={{
            backgroundColor: "#89bec5",
            color: "white",
            overflow: "hidden",
            position: "relative",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontWeight: "bold" }}>
            <img
              src={hp_rm}
              alt="hospital Img"
              size={35}
              style={{ height: "7rem" }}
            />
          </span>
          <IconButton
            onClick={handleDrawerClose}
            style={{ background: "#89bec5", overflow: "hidden" }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {["Dashboard"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 1 === 0 ? (
                    <AiTwotoneHome size={25} style={{ color: "#89bec5" }} />
                  ) : (
                    <AiTwotoneHome size={25} style={{ color: "#89bec5" }} />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {["Room"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/rooms");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 1 === 0 ? (
                    <FaRegHospital size={25} style={{ color: "#89bec5" }} />
                  ) : (
                    <FaRegHospital size={25} style={{ color: "#89bec5" }} />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          {["Department"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/department");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 1 === 0 ? (
                    <TbBuildingHospital size={25} className="icoColr" />
                  ) : (
                    <TbBuildingHospital size={25} className="icoColr" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          {["Roles"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/role");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 1 === 0 ? (
                    <FaPeopleGroup size={25} className="icoColr" />
                  ) : (
                    <FaPeopleGroup size={25} className="icoColr" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          {["Labs"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/lab");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 1 === 0 ? (
                    <GrTest size={25} className="icoColr" />
                  ) : (
                    <GrTest size={25} className="icoColr" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          {["Lab-test Price"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/patient");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 1 === 0 ? (
                    <HiOutlineCurrencyRupee size={25} className="icoColr" />
                  ) : (
                    <HiOutlineCurrencyRupee size={25} className="icoColr" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          {["Employee"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/employee");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 1 === 0 ? (
                    <FaUserDoctor size={25} className="icoColr" />
                  ) : (
                    <FaUserDoctor size={25} className="icoColr" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          {["Role Assign"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/patient");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 1 === 0 ? (
                    <FaBed size={25} className="icoColr" />
                  ) : (
                    <FaBed size={25} className="icoColr" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
       {/* <List>
          {["Emp Profile"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/empProfile");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 1 === 0 ? (
                    <CgProfile size={25} className="icoColr" />
                  ) : (
                    <CgProfile size={25} className="icoColr" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />*/}
        <List>
          {["Patient"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/patient");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 1 === 0 ? (
                    <FaBed size={25} className="icoColr" />
                  ) : (
                    <FaBed size={25} className="icoColr" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          {["Treatment"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/patient");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 1 === 0 ? (
                    <TbPhysotherapist size={25} className="icoColr" />
                  ) : (
                    <TbPhysotherapist size={25} className="icoColr" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {["Appointments"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}  onClick={() => {
              navigate("/appointment");
            }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 1 === 0 ? (
                    
                    <FaRegCalendarCheck size={25} className="icoColr" />
                  ) : (
                    <FaRegCalendarCheck size={25} className="icoColr" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Test Report"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 1 === 0 ? (
                    <TbReportMedical size={25} className="icoColr" />
                  ) : (
                    <TbReportMedical size={25} className="icoColr" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />

        <Divider />

        <List>
          {["Setting"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 1 === 0 ? (
                    <IoSettingsOutline size={25} className="icoColr" />
                  ) : (
                    <IoSettingsOutline size={25} className="icoColr" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" style={{ marginTop: "5%" }}>
        <DrawerHeader />
      </Box>
      <div>
        <Outlet />
      </div>
    </Box>
  );
}
