import React, { useState } from "react";
import logo from "../assets/logoTreble.png";
import { UilBars } from "@iconscout/react-unicons";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
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
import { red } from "@mui/material/colors";
import Logout from "@mui/icons-material/Logout";

const pages = ["Home", "Learning", "Exercise"];

function stringAvatar(name) {
  let myName = name.split(" ");
  const childrenValue =
    myName.length === 1
      ? `${name.split(" ")[0][0]}`
      : `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
  return {
    sx: {
      // bgcolor: stringToColor(name),
      bgcolor: "#EDF4F7",
      width: 48,
      height: 48,
      color: "#A7C0CD",
      fontSize: "1.5rem",
      mr: 1,
      textTransform: "uppercase",
    },
    children: childrenValue,
  };
}

function stringAvatarPhone(name) {
  let myName = name.split(" ");
  const childrenValue =
    myName.length === 1
      ? `${name.split(" ")[0][0]}`
      : `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
  return {
    sx: {
      // bgcolor: stringToColor(name),
      bgcolor: "#EDF4F7",
      // width: 24,
      // height: 24,
      color: "#A7C0CD",
      fontSize: "1.2rem",
      mr: 1,
      textTransform: "uppercase",
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

  const [dataUser, setDataUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();

  const handleOpenNavMenu = () => {
    console.log("click Menu")
    setOpenMenu(true);
  };

  const handleCloseNavMenu = () => {
    setOpenMenu(false);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const userAuth = JSON.parse(localStorage.getItem("user"))
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId")
  const urlProfileById = `http://localhost:8000/profile/${userId}`;


  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const user = localStorage.getItem("user");

    if (token) {
      setIsLoggedIn(true);
      // console.log("ini token " + token);
      setUserlogin(user);
      setProfileName(userName);

      fetch(urlProfileById, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userAuth.token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          return response.json();
        })
        .then((actualData) => {
          setDataUser(actualData);
          setError(null);
        })
        .catch((err) => {

          setError(err.message);
          setDataUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
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
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          display: "flex",
          alignItems: "center",
          padding: 1,
          mb: 2
        }}
      >
        <Container maxWidth="xl" >
          <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
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
                  display: { xs: "none", md: "flex" },
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
                      {dataUser?.data.profile_image ?
                        <label htmlFor="profile-image">
                          <Avatar
                            src={dataUser?.data.profile_image}
                            sx={{
                              width: 48,
                              height: 48,
                              border: 1,
                              mr:1
                            }}
                          />
                        </label>
                        :
                        <Avatar
                          {...stringAvatar(userName)}
                        />
                      }
                      {/* <Avatar {...stringAvatar(userName)} /> */}
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
                      href="/"
                      endIcon={<LogoutIcon />}
                      variant="outlined"
                      sx={{
                        ml: 2,
                        fontSize: "1rem",
                        lineHeight: "16px",
                        letterSpacing: "1px",
                        color: "#313131",
                        textTransform: "capitalize",
                      }}
                      onClick={() => { localStorage.clear() }}
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
                // flexGrow: 1,
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

            </Box>
          </Toolbar>
        </Container>

        <Menu
          id="menu-appbar"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            // backgroundColor: "red",
            display: { xs: "block", md: "none" },
            mt: 5
            // width:"40px",
            // height:"20px"
          }}
          open={openMenu}
          onClose={handleCloseNavMenu}

        >
          {isLoggedIn ?
            <>
              <MenuItem onClick={() => { setOpenMenu(false); navigate("/profile") }}>
                <Avatar {...stringAvatarPhone(userName)} />
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
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => { setOpenMenu(false); navigate("/") }}
              >
                Home
              </MenuItem>
              <MenuItem
                onClick={() => { setOpenMenu(false); navigate("/learning") }}
              >
                Learning
              </MenuItem>
              <MenuItem
                onClick={() => { setOpenMenu(false); navigate("/exercise") }}>
                Exercise
              </MenuItem>
              <MenuItem>
                <Button
                  href="/"
                  startIcon={<LogoutIcon />}
                  variant="text"
                  size="small"
                  sx={{
                    fontSize: "1rem",
                    lineHeight: "16px",
                    letterSpacing: "1px",
                    color: "#313131",
                    textTransform: "capitalize",
                    textAlign: "left",
                    padding: 0
                  }}
                  onClick={() => { localStorage.clear() }}
                >
                  Logout
                </Button>
                {/* <Link href="/">
                  <Stack direction="row" spacing={2}>
                    <Logout fontSize="small" />
                    Logout
                  </Stack>
                </Link> */}
              </MenuItem>
            </>
            :
            <>
              <MenuItem
                onClick={() => { setOpenMenu(false); navigate("/login") }}
                autoFocus={true}
              // onClickCapture={() => navigate("/login")}
              >
                Login
              </MenuItem>
              <MenuItem
                onClick={() => { setOpenMenu(false); navigate("/register") }}
              >
                Register
              </MenuItem>
            </>
          }
        </Menu>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
