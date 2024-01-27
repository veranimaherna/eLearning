import React, { useState } from "react";
import logo from "../assets/logoTreble.png";
import { UilBars } from "@iconscout/react-unicons";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "@fontsource/mochiy-pop-one";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const pages = ["Home", "Learning", "Exercise"];

function stringAvatar(name) {
  let myName = name.split(" ");
  const childrenValue =
    myName.length === 2
      ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
      : `${name.split(" ")[0][0]}`;
  return {
    sx: {
      // bgcolor: stringToColor(name),
      bgcolor: "#EDF4F7",
      width: 48,
      height: 48,
      color: "#A7C0CD",
      fontSize: "1.5rem",
      mr: 1,
      textTransform: "capitalize",
    },
    children: childrenValue,
  };
}

const Navbar = ({
  userlogin,
  setUserlogin,
  tabValue,
  setTabValue,
  profileName,
  setProfileName,
}) => {
  const pathLocationValue = useLocation().pathname.split("/")[1];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();

  const handleOpenNavMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleCloseNavMenu = () => {
    setOpenMenu(null);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const userName = localStorage.getItem("userName");
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const user = localStorage.getItem("user");

    if (token) {
      setIsLoggedIn(true);
      // console.log("ini token " + token);
      setUserlogin(user);
      setProfileName(userName);
    } else {
      setIsLoggedIn(false);
      console.log("no token");
    }
  }, [userlogin, profileName]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#506CF0",
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: "#FE7860",
        light: "#F5EBFF",
        // dark: will be calculated from palette.secondary.main,
        contrastText: "#47008F",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          padding: 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* logo */}
            <Box
              onClick={() => {
                setTabValue("");
                navigate("/");
              }}
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img src={logo} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                onClick={() => {
                  setTabValue("");
                  navigate("/");
                }}
                sx={{
                  mr: 8,
                  ml: 0.5,
                  display: { xs: "flex", md: "flex" },
                  fontFamily: "Mochiy Pop One",
                  fontWeight: 800,
                  textDecoration: "none",
                  fontSize: "22px",
                  background: "linear-gradient(to right, #FE7860, #FFB9B1)",
                  color: "transparent",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  letterSpacing: ".05rem",
                  cursor: "pointer",
                }}
              >
                Theory Music
              </Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex", xl: "flex" },
                justifyContent: "center",
              }}
            >
              {pathLocationValue === "login" ||
                pathLocationValue === "register" ? (
                <></>
              ) : (
                <Tabs
                  value={tabValue}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                // TabIndicatorProps={{
                //   sx: {
                //     backgroundColor: "#FE7860",
                //     color: "#FE7860"
                //   },
                // }}
                // inkbarstyle={{background: '#FE7860'}}
                // sx={{
                //   ".Mui-selected": {
                //     color: "#FE7860",
                //   },
                // }}
                >
                  <Tab
                    sx={{
                      color: "#313131",
                      textAlign: "center",
                      fontFamily: "Roboto",
                      fontSize: "1rem",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "1rem",
                      letterSpacing: "0.09375rem",
                      textTransform: "uppercase",
                    }}
                    value=""
                    label="Home"
                    component={Link}
                    to="/"
                  />
                  <Tab
                    sx={{
                      color: "#313131",
                      textAlign: "center",
                      fontFamily: "Roboto",
                      fontSize: "1rem",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "1rem",
                      letterSpacing: "0.09375rem",
                      textTransform: "uppercase",
                    }}
                    value="learning"
                    label="Learning"
                    component={Link}
                    to="/learning"
                  />
                  <Tab
                    sx={{
                      color: "#313131",
                      textAlign: "center",
                      fontFamily: "Roboto",
                      fontSize: "1rem",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "1rem",
                      letterSpacing: "0.09375rem",
                      textTransform: "uppercase",
                    }}
                    value="exercise"
                    label="Exercise"
                    component={Link}
                    to="/exercise"
                  />
                </Tabs>
              )}
            </Box>

            {/* <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", xl: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  my: 2,
                  mr: 8,
                  color: "#313131",
                  display: "block",
                  fontFamily: "Roboto",
                  fontSize: "18px",
                  lineHeight: "16px",
                  letterSpacing: "1px",
                }}
              >
                {page}
              </Button>
            ))}
          </Box> */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {isLoggedIn ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center", 
                      alignItems: "center",
                    }}
                  >
                    <Button onClick={() => { setTabValue(); navigate("/profile") }}>
                      <Avatar {...stringAvatar(userName)} />
                      <Typography
                        sx={{
                          color: "#313131",
                          textAlign: "center",
                          fontFamily: "Roboto",
                          fontSize: "1rem",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "1rem",
                          letterSpacing: "0.09375rem",
                          textTransform: "capitalize",
                        }}
                      >
                        {localStorage.getItem("userName").toLowerCase()}
                      </Typography>
                    </Button>
                    <Button
                      endIcon={<LogoutIcon />}
                      href="/"
                      variant="outlined"
                      sx={{
                        ml: 2,
                        fontSize: "1rem",
                        lineHeight: "16px",
                        letterSpacing: "1px",
                        color: "#313131",
                        textTransform: "capitalize",
                      }}
                      onClick={() => localStorage.clear()}
                    >
                      Logout
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Button
                    href="/login"
                    variant="text"
                    sx={{
                      mr: 2,
                      fontSize: "18px",
                      lineHeight: "16px",
                      letterSpacing: "1px",
                      color: "#313131",
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    href="/register"
                    variant="contained"
                    size="large"
                    style={{
                      fontSize: "18px",
                      lineHeight: "16px",
                      letterSpacing: "1px",
                      paddingTop: "1rem",
                      paddingBottom: "1rem",
                      color: "#ffffff",
                      backgroundColor: "#506CF0",
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "space-between",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <UilBars />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                openMenu={openMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => {
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                    <Typography textAlign="center" href="/login">
                      Login
                    </Typography>
                    <Typography textAlign="center" href="/register">
                      Sign In
                    </Typography>
                  </MenuItem>;
                })}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
