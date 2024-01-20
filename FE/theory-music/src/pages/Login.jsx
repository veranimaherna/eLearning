import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import loginImg from "../assets/login.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useOutletContext } from "react-router-dom";
import env from "react-dotenv";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Login() {
  const [userlogin, setUserlogin, tabValue, setTabValue] = useOutletContext();

  const initialValues = {
    email: "",
    password: "",
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [message, setMessage] = useState("");

  const url = `${env.BASE_URL_BACKEND}login`;
  const navigate = useNavigate();

  useEffect(() => {
    if (message == "Logged in Succesfully") {
      const timer = setTimeout(() => {
        setUserlogin(JSON.stringify(localStorage.getItem("user")));
        setTabValue("");
        navigate("/");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      <Box
        sx={{
          pt: 15,
          mb: 5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {message == "Logged in Succesfully" && (
          <Alert severity="success">Logged in succesfully!</Alert>
        )}
        {message == "Invalid email or password." && (
          <Alert severity="error">
            Failure to Authenticate! Wrong ID Details.
          </Alert>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 5,
          mb: 10,
        }}
      >
        <Box>
          <img src={loginImg} style={{ width: "28rem" }} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Formik
            isInitialValid={false}
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={(value, { setSubmitting }) => {
              // value.preventDefault();
              const data = {
                email: value.email,
                password: value.password,
              };
              console.log(data);
              fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })
                .then((response) => {
                  console.log(response.status);
                  return response.json();
                })
                .then((json) => {
                  setMessage(json.message);
                  localStorage.setItem("userToken", json.token);
                  localStorage.setItem("userName", json.userName);
                  localStorage.setItem("userId", json.userId);
                  localStorage.setItem("user", JSON.stringify(json));
                });
              setSubmitting(true);
            }}

            // onSubmit={(values) => {
            //   console.log(values);
            // }}
          >
            {(formik) => {
              const { errors, touched, isValid, dirty } = formik;
              return (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {console.log("vv", isValid)}
                  <Typography
                    sx={{
                      color: "#313131",
                      fontFamily: "Roboto",
                      fontSize: "2.5rem",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                      mb: 3,
                    }}
                  >
                    Login
                  </Typography>
                  <Form style={{ display: "flex", flexDirection: "column" }}>
                    <Stack sx={{ mb: 3 }}>
                      <Field
                        as={TextField}
                        sx={{ width: "26.375rem", mb: 0.5 }}
                        label="Email"
                        variant="outlined"
                        placeholder="Input your email"
                        type="email"
                        name="email"
                        id="email"
                        className={
                          errors.email && touched.email ? "input-error" : null
                        }
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                      {/* <ErrorMessage
                        name="email"
                        component="span"
                        className="error"
                      /> */}
                    </Stack>

                    <Stack sx={{ mb: 3 }}>
                      <Field
                        as={TextField}
                        sx={{ width: "26.375rem", mb: 0.5 }}
                        label="Password"
                        placeholder="Input your Password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        name="password"
                        id="password"
                        className={
                          errors.password && touched.password
                            ? "input-error"
                            : null
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="row">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />
                      {/* <ErrorMessage
                        name="password"
                        component="span"
                        className="error"
                      /> */}
                    </Stack>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        fontSize: "18px",
                        lineHeight: "16px",
                        letterSpacing: "1px",
                        // bgcolor: "#FE7860",
                        color: "#fff",
                        mb: 1.5,
                        py: "1rem",
                        textTransform: "capitalize",
                      }}
                      style={{
                        backgroundColor: isValid ? "#FE7860" : "#eaeaea",
                      }}
                      // onMouseEnter={() => setIsFormFilled(true)}
                      type="submit"
                      className={!isValid ? "disabled-btn" : ""}
                      disabled={!isValid}
                    >
                      Login
                    </Button>
                  </Form>
                  <Divider
                    sx={{
                      color: "#A7C0CD",
                      fontSize: "1.125rem",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "1rem",
                      letterSpacing: "0.09375rem",
                      textTransform: "capitalize",
                      my: 2,
                    }}
                  >
                    or
                  </Divider>
                  <Button
                    startIcon={
                      <GoogleIcon
                        sx={{ fontSize: "large", color: "#506CF0" }}
                      />
                    }
                    variant="outlined"
                    size="large"
                    sx={{
                      fontSize: "18px",
                      lineHeight: "16px",
                      letterSpacing: "1px",
                      color: "#313131",
                      my: 1.5,
                      py: "1rem",
                      textTransform: "capitalize",
                      border: 1.2,
                      borderColor: "#506CF0",
                    }}
                  >
                    Login with Google
                  </Button>
                  <Typography
                    sx={{
                      color: "#313131",
                      textAlign: "center",
                      fontFamily: "Roboto",
                      fontSize: "0.8rem",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "1rem",
                      letterSpacing: "0.09375rem",
                      textTransform: "capitalize",
                    }}
                  >
                    Don’t have an account?
                    <span
                      style={{
                        color: "#506CF0",
                        fontFamily: "Roboto",
                        fontSize: "0.8rem",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "1rem",
                        letterSpacing: "0.09375rem",
                        textTransform: "capitalize",
                        marginLeft: "0.5rem",
                      }}
                    >
                      <a
                        onClick={() => navigate("/register")}
                        style={{
                          textDecoration: "none",
                          color: "#506CF0",
                          cursor: "pointer",
                        }}
                      >
                        Let's Create Now!
                      </a>
                    </span>
                  </Typography>
                </Box>
              );
            }}
          </Formik>
        </Box>
      </Box>
    </>
  );
}

export default Login;
