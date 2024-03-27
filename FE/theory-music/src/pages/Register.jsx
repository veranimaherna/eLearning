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
import registerImg from "../assets/signUp.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Register() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum"),

    confirmPassword: Yup.string()
      .required("Confrimation password is required")
      .oneOf(
        [Yup.ref("password"), null],
        "Password and Confirmation Password should match"
      ),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [message, setMessage] = useState("");

  const url = `${env.BASE_URL_BACKEND}register`;
  const navigate = useNavigate();

  useEffect(() => {
    if (message == "User Created") {
      const timer = setTimeout(() => navigate("/login"), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      <Box
        sx={{
          pt: { xs: 1, md: 0 },
          mb: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {message == "User Created" && (
          <Alert severity="success">
            Thanks for signing up. Your account has been created.
          </Alert>
        )}
        {message == "Failed to Register" && (
          <Alert severity="error">User account already exists.</Alert>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          mb: 10
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Formik
            isInitialValid={false}
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={(value, { setSubmitting }) => {
              const data = {
                name: value.name,
                email: value.email,
                password: value.password,
                role: "student",
              };
              fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })
                .then((response) => {
                  return response.json();
                })
                .then((json) => {
                  setMessage(json.message);
                });
              setSubmitting(false);
            }}
          >
            {(formik) => {
              const { errors, touched, isValid, dirty } = formik;
              return (
                <Box sx={{ display: "flex", flexDirection: "column" }} className="boxFormRegister">
                  <Typography
                    sx={{
                      color: "#313131",
                      fontFamily: "Roboto",
                      fontSize: "2.5rem",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                      mb: 3,
                      textAlign: { xs: "center", md: "left" }
                    }}
                  >
                    Sign Up
                  </Typography>
                  <Form style={{ display: "flex", flexDirection: "column" }}>
                    <Stack sx={{ mb: 3 }}>
                      <Field
                        as={TextField}
                        id="name"
                        label="Name"
                        variant="outlined"
                        placeholder="Input your name"
                        type="text"
                        name="name"
                        className={
                          errors.name && touched.name ? "input-error" : null
                        }
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Stack>
                    <Stack sx={{ mb: 3 }}>
                      <Field
                        as={TextField}
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
                    </Stack>

                    <Stack sx={{ mb: 3 }}>
                      <Field
                        as={TextField}
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
                    </Stack>
                    <Stack sx={{ mb: 3 }}>
                      <Field
                        as={TextField}
                        label="Confirm Password"
                        placeholder="Input your Password"
                        type={showConfirmPassword ? "text" : "password"}
                        variant="outlined"
                        name="confirmPassword"
                        id="confirmPassword"
                        className={
                          errors.confirmPassword && touched.confirmPassword
                            ? "input-error"
                            : null
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="row">
                              <IconButton
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
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
                        error={
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
                        }
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
                      />
                    </Stack>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        fontSize: "18px",
                        lineHeight: "16px",
                        letterSpacing: "1px",
                        bgcolor: "#FE7860",
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
                      Sign Up
                    </Button>
                  </Form>
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
                    Already have an account?
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
                        onClick={() => navigate("/login")}
                        style={{
                          textDecoration: "none",
                          color: "#506CF0",
                          cursor: "pointer",
                        }}
                      >
                        Let's Log In!
                      </a>
                    </span>
                  </Typography>
                </Box>
              );
            }}
          </Formik>
        </Box>
        <Box className="boxRegisterImage">
          <img src={registerImg} />
        </Box>
      </Box>
    </>
  );
}

export default Register;
