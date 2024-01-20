// import React, { useEffect, useState } from "react";
// import {
//   Alert,
//   Box,
//   Button,
//   Divider,
//   FormControl,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";

// import GoogleIcon from "@mui/icons-material/Google";
// import loginImg from "../assets/login.png";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import env from "react-dotenv";

// const initialValues = {
//   name: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// };

// const validate = (values) => {
//   let errors = {};
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

//   if (!values.email) {
//     errors.email = "Email is required";
//   } else if (!regex.test(values.email)) {
//     errors.email = "Invalid Email";
//   }

//   if (!values.password) {
//     errors.password = "Password is required";
//   } else if (values.password.length < 8) {
//     errors.password = "Password too short";
//   }
//   return errors;
// };

// const submitForm = (values) => {
//   console.log(values);
// };

// const signInSchema = Yup.object().shape({
//   email: Yup.string().email().required("Email is required"),

//   password: Yup.string()
//     .required("Password is required")
//     .min(8, "Password is too short - should be 8 chars minimum"),
// });

// <Formik
//   initialValues={initialValues}
//   validationSchema={signInSchema}
//   onSubmit={(values) => {
//     console.log(values);
//   }}
// >
//   {(formik) => {
//     const { errors, touched, isValid, dirty } = formik;
//     return (
//       <>
//         <Typography
//           sx={{
//             color: "#313131",
//             fontFamily: "Roboto",
//             fontSize: "2.5rem",
//             fontStyle: "normal",
//             fontWeight: 500,
//             lineHeight: "normal",
//             mb: 3,
//           }}
//         >
//           Sign Up
//         </Typography>
//         {console.log(message)}
//         <Form>
//           <TextField
//             id="outlined-basic"
//             // onChange={(e) => handleOnChange(e, setName)}
//             label="Name"
//             variant="outlined"
//             placeholder="Input your name"
//             sx={{ width: "26.375rem", mb: "1.75rem" }}
//           />
//           <Field
//             as={TextField}
//             label="Email"
//             variant="outlined"
//             placeholder="Input your email"
//             sx={{ width: "26.375rem", mb: "1.75rem" }}
//             id="email"
//             type="email"
//             name="email"
//             className={errors.email && touched.email ? "input-error" : null}
//             // onChange={(e) => handleOnChange(e, setEmail)}
//           />
//           <ErrorMessage name="email" component="span" className="error" />

//           {/* <Field
//                       type="password"
//                       name="password"
//                       id="password"
//                       className={
//                         errors.password && touched.password
//                           ? "input-error"
//                           : null
//                       }
//                     > */}

//           <Field
//             as={TextField}
//             name="password"
//             label="Password"
//             type={showPassword ? "text" : "password"}
//             variant="outlined"
//             fullWidth
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? <Visibility /> : <VisibilityOff />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <FormControl
//             sx={{ width: "26.375rem", mb: "1.75rem" }}
//             variant="outlined"
//             type="password"
//             name="password"
//             id="password"
//             className={
//               errors.password && touched.password ? "input-error" : null
//             }
//             // onChange={(e) => handleOnChange(e, setPassword)}
//           >
//             <InputLabel htmlFor="outlined-adornment-password">
//               Password
//             </InputLabel>
//             <OutlinedInput
//               id="outlined-adornment-password"
//               type={showPassword ? "text" : "password"}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//               label="Password"
//               placeholder="Input your password"
//             />
//           </FormControl>
//           <ErrorMessage name="password" component="span" className="error" />
//           <FormControl
//             sx={{ width: "26.375rem", mb: "1.75rem" }}
//             variant="outlined"
//             // onChange={(e) => handleOnChange(e, setConfirmPassword)}
//           >
//             <InputLabel htmlFor="outlined-adornment-password">
//               Confirm Password
//             </InputLabel>
//             <OutlinedInput
//               id="outlined-adornment-password"
//               type={showConfirmPassword ? "text" : "password"}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowConfirmPassword}
//                     onMouseDown={handleMouseDownConfirmPassword}
//                     edge="end"
//                   >
//                     {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//               label="Confirm Password"
//               placeholder="Input your password"
//             />
//           </FormControl>
//           <button
//             type="submit"
//             className={!(dirty && isValid) ? "disabled-btn" : ""}
//             disabled={!(dirty && isValid)}
//           >
//             <Button
//               variant="contained"
//               size="large"
//               // onClick={(e) => handleSubmit(e)}
//               sx={{
//                 fontSize: "18px",
//                 lineHeight: "16px",
//                 letterSpacing: "1px",
//                 bgcolor: "#FE7860",
//                 color: "#fff",
//                 mb: 1.5,
//                 py: "1rem",
//                 textTransform: "capitalize",
//               }}
//               type="submit"
//             >
//               Sign Up
//             </Button>
//           </button>
//         </Form>
//       </>
//     );
//   }}
// </Formik>;

{
  /* <Accordion sx={{ mb: 4 }}>
<AccordionSummary
  expandIcon={<ExpandMoreIcon sx={{ color: "#FFF" }} />}
  aria-controls="panel1a-content"
  id="panel1a-header"
  sx={{ bgcolor: "#A7C0CD", borderRadius: "0.5rem" }}
>
  <Typography
    sx={{
      color: "#FFF",
      fontSize: "1.1rem",
      fontWeight: "500",
      lineHeight: "1rem",
      letterSpacing: "0.09375rem",
      textTransform: "uppercase",
    }}
  >
    Grade 1
  </Typography>
</AccordionSummary>
<AccordionDetails>
  <Stack direction="row" spacing={2}>
    <Box
      sx={{
        bgcolor: "#EDF4F7",
        width: "19.375rem",
        height: "24rem",
        borderRadius: "0.5rem",
        border: "1px solid  #313131",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 3,
          mb: 1,
          background: "#fff",
          borderRadius: "0.5rem 0.5rem 0 0",
        }}
      >
        <img style={{ height: "10rem" }} src={logo} />
      </Stack>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "left",
          px: 2,
        }}
      >
        <Typography sx={{ fontSize: "1.25rem" }}>Topic 1</Typography>
        <Typography
          sx={{
            mt: 0.25,
            fontFamily: "Roboto",
            fontSize: "0.875rem",
          }}
        >
          Basics of Notation in Treble and Bass Clef
        </Typography>
        <Typography
          sx={{ mt: 1, mb: 2, color: "#666", fontSize: "0.875rem " }}
        >
          Tempo, dynamics, performance directions and articulation
          marks
        </Typography>
        <Button
          variant="outlined"
          size="small"
          href="#"
          sx={{
            textTransform: "capitalize",
            fontFamily: "Roboto",
            fontSize: "1rem",
            lineHeight: "1.8rem",
          }}
        >
          Learn
        </Button>
      </Stack>
    </Box>
    <Box
      sx={{
        bgcolor: "#EDF4F7",
        width: "19.375rem",
        height: "24rem",
        borderRadius: "0.5rem",
        border: "1px solid  #313131",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 3,
          mb: 1,
          background: "#fff",
          borderRadius: "0.5rem 0.5rem 0 0",
        }}
      >
        <img style={{ height: "10rem" }} src={logo} />
      </Stack>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "left",
          px: 2,
        }}
      >
        <Typography sx={{ fontSize: "1.25rem" }}>Topic 1</Typography>
        <Typography
          sx={{
            mt: 0.25,
            fontFamily: "Roboto",
            fontSize: "0.875rem",
          }}
        >
          Basics of Notation in Treble and Bass Clef
        </Typography>
        <Typography
          sx={{ mt: 1, mb: 2, color: "#666", fontSize: "0.875rem " }}
        >
          Note Values and Staves
        </Typography>
        <Button
          variant="outlined"
          size="small"
          href="#"
          sx={{
            textTransform: "capitalize",
            fontFamily: "Roboto",
            fontSize: "1rem",
            lineHeight: "1.8rem",
          }}
        >
          Learn
        </Button>
      </Stack>
    </Box>
    <Box
      sx={{
        bgcolor: "#EDF4F7",
        width: "19.375rem",
        height: "24rem",
        borderRadius: "0.5rem",
        border: "1px solid  #313131",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 3,
          mb: 1,
          background: "#fff",
          borderRadius: "0.5rem 0.5rem 0 0",
        }}
      >
        <img style={{ height: "10rem" }} src={logo} />
      </Stack>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "left",
          px: 2,
        }}
      >
        <Typography sx={{ fontSize: "1.25rem" }}>Topic 1</Typography>
        <Typography
          sx={{
            mt: 0.25,
            fontFamily: "Roboto",
            fontSize: "0.875rem",
          }}
        >
          Basics of Notation in Treble and Bass Clef
        </Typography>
        <Typography
          sx={{ mt: 1, mb: 2, color: "#666", fontSize: "0.875rem " }}
        >
          Note Values and Staves
        </Typography>
        <Button
          variant="outlined"
          size="small"
          href="#"
          sx={{
            textTransform: "capitalize",
            fontFamily: "Roboto",
            fontSize: "1rem",
            lineHeight: "1.8rem",
          }}
        >
          Learn
        </Button>
      </Stack>
    </Box>
    <Box
      sx={{
        bgcolor: "#EDF4F7",
        width: "19.375rem",
        height: "24rem",
        borderRadius: "0.5rem",
        border: "1px solid  #313131",
        bottom: 0,
      }}
    >
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 3,
          mb: 1,
          background: "#fff",
          borderRadius: "0.5rem 0.5rem 0 0",
        }}
      >
        <img style={{ height: "10rem" }} src={logo} />
      </Stack>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "left",
          px: 2,
        }}
      >
        <Typography sx={{ fontSize: "1.25rem" }}>Topic 1</Typography>
        <Typography
          sx={{
            mt: 0.25,
            fontFamily: "Roboto",
            fontSize: "0.875rem",
          }}
        >
          Transposition at the Octave Between Clefs
        </Typography>
        <Typography
          sx={{ mt: 1, mb: 2, color: "#666", fontSize: "0.875rem " }}
        >
          Both harmonic and melodic of minor scales
        </Typography>
        <Button
          variant="outlined"
          size="small"
          href="#"
          sx={{
            textTransform: "capitalize",
            fontFamily: "Roboto",
            fontSize: "1rem",
            lineHeight: "1.8rem",
          }}
        >
          Learn
        </Button>
      </Stack>
    </Box>
  </Stack>
</AccordionDetails>
</Accordion>
<Accordion sx={{ mb: 4 }}>
<AccordionSummary
  expandIcon={<ExpandMoreIcon sx={{ color: "#FFF" }} />}
  aria-controls="panel2a-content"
  id="panel2a-header"
  sx={{ bgcolor: "#A7C0CD", borderRadius: "0.5rem" }}
>
  <Typography
    sx={{
      color: "#FFF",
      fontSize: "1.1rem",
      fontWeight: "500",
      lineHeight: "1rem",
      letterSpacing: "0.09375rem",
      textTransform: "uppercase",
    }}
  >
    Grade 2
  </Typography>
</AccordionSummary>
<AccordionDetails>
  <Typography>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
    eget.
  </Typography>
</AccordionDetails>
</Accordion>
<Accordion>
<AccordionSummary
  expandIcon={<ExpandMoreIcon sx={{ color: "#FFF" }} />}
  aria-controls="panel2a-content"
  id="panel2a-header"
  sx={{ bgcolor: "#A7C0CD", borderRadius: "0.5rem" }}
>
  <Typography
    sx={{
      color: "#FFF",
      fontSize: "1.1rem",
      fontWeight: "500",
      lineHeight: "1rem",
      letterSpacing: "0.09375rem",
      textTransform: "uppercase",
    }}
  >
    Grade 3
  </Typography>
</AccordionSummary>
<AccordionDetails>
  <Typography>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
    eget.
  </Typography>
</AccordionDetails>
</Accordion> */
}


// import React, { useEffect, useState } from "react";
// import {
//   Alert,
//   Box,
//   Button,
//   Divider,
//   FormControl,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import GoogleIcon from "@mui/icons-material/Google";
// import loginImg from "../assets/login.png";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import env from "react-dotenv";

// function Login(props) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleOnChange = (input, stateName) => {
//     stateName(input.target.value);
//   };

//   const url = `${env.BASE_URL_BACKEND}login`;
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = {
//       email: email,
//       password: password,
//     };
//     console.log(data);
//     await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         console.log(response.status);
//         return response.json();
//       })
//       .then((json) => {
//         setMessage(json.message);
//         // if (json.message === "Logged in Succesfully") {
//         //   localStorage.setItem('email', data.email);
//         // }
//       });
//   };

//   useEffect(() => {
//     if (message == "Logged in Succesfully") {
//       const timer = setTimeout(() => navigate("/"), 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   const [showPassword, setShowPassword] = useState(false);
//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           pt: 15,
//           mb: 5,
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         {message == "Logged in Succesfully" && (
//           <Alert severity="success">Logged in succesfully!</Alert>
//         )}
//         {message == "Invalid email or password." && (
//           <Alert severity="error">Failure to Authenticate! Wrong ID Details.</Alert>
//         )}
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "center",
//           gap: 5,
//           mb: 10,
//         }}
//       >
//         <Box>
//           <img src={loginImg} style={{ width: "28rem" }} />
//         </Box>
//         <Box sx={{ display: "flex", flexDirection: "column" }}>
//           <Typography
//             sx={{
//               color: "#313131",
//               fontFamily: "Roboto",
//               fontSize: "2.5rem",
//               fontStyle: "normal",
//               fontWeight: 500,
//               lineHeight: "normal",
//               mb: 3,
//             }}
//           >
//             Login
//           </Typography>
//           <TextField
//             id="outlined-basic"
//             onChange={(e) => handleOnChange(e, setEmail)}
//             label="Email"
//             variant="outlined"
//             placeholder="Input your email"
//             sx={{ width: "26.375rem", mb: "1.75rem" }}
//           />
//           <FormControl
//             sx={{ width: "26.375rem", mb: "1.75rem" }}
//             variant="outlined"
//             onChange={(e) => handleOnChange(e, setPassword)}
//           >
//             <InputLabel htmlFor="outlined-adornment-password">
//               Password
//             </InputLabel>
//             <OutlinedInput
//               id="outlined-adornment-password"
//               type={showPassword ? "text" : "password"}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//               label="password"
//               placeholder="Input your password"
//             />
//           </FormControl>
//           <Button
//             onClick={(e) => handleSubmit(e)}
//             variant="contained"
//             size="large"
//             sx={{
//               fontSize: "18px",
//               lineHeight: "16px",
//               letterSpacing: "1px",
//               bgcolor: "#FE7860",
//               color: "#fff",
//               mb: 1.5,
//               py: "1rem",
//               textTransform: "capitalize",
//             }}
//           >
//             Login
//           </Button>
//           <Divider
//             sx={{
//               color: "#A7C0CD",
//               fontSize: "1.125rem",
//               fontStyle: "normal",
//               fontWeight: 400,
//               lineHeight: "1rem",
//               letterSpacing: "0.09375rem",
//               textTransform: "capitalize",
//               my: 2,
//             }}
//           >
//             or
//           </Divider>
//           <Button
//             startIcon={
//               <GoogleIcon sx={{ fontSize: "large", color: "#506CF0" }} />
//             }
//             variant="outlined"
//             size="large"
//             sx={{
//               fontSize: "18px",
//               lineHeight: "16px",
//               letterSpacing: "1px",
//               color: "#313131",
//               my: 1.5,
//               py: "1rem",
//               textTransform: "capitalize",
//               border: 1.2,
//               borderColor: "#506CF0",
//             }}
//           >
//             Login with Google
//           </Button>
//           <Typography
//             sx={{
//               color: "#313131",
//               textAlign: "center",
//               fontFamily: "Roboto",
//               fontSize: "0.8rem",
//               fontStyle: "normal",
//               fontWeight: 400,
//               lineHeight: "1rem",
//               letterSpacing: "0.09375rem",
//               textTransform: "capitalize",
//             }}
//           >
//             Don’t have an account?
//             <span
//               style={{
//                 color: "#506CF0",
//                 fontFamily: "Roboto",
//                 fontSize: "0.8rem",
//                 fontStyle: "normal",
//                 fontWeight: 700,
//                 lineHeight: "1rem",
//                 letterSpacing: "0.09375rem",
//                 textTransform: "capitalize",
//                 marginLeft: "0.5rem",
//               }}
//             >
//               <a
//                 href="/register"
//                 style={{ textDecoration: "none", color: "#506CF0" }}
//               >
//                 Let's Create Now!
//               </a>
//             </span>
//           </Typography>
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default Login;

// if (json.message && json.message.includes("Email not found.")) {
//   setMsg("Email belum terdaftar");
// }
// if (json.message && json.message.includes("Password was Wrong.")) {
//   setMsg("Password anda salah");
// }
// if (json.email) {
//   localStorage.setItem("user", JSON.stringify(json));
//   setMsg("success");
// }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import env from "react-dotenv";
// import {
//   Alert,
//   Box,
//   Button,
//   Divider,
//   FormControl,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import GoogleIcon from "@mui/icons-material/Google";
// import registerImg from "../assets/signUp.png";
// import {
//   CleaningServices,
//   Visibility,
//   VisibilityOff,
// } from "@mui/icons-material";
// import { ErrorMessage, Formik, Form, Field } from "formik";
// import * as Yup from "yup";

// function Register(props) {
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [email, setEmail] = useState("");

//   const [message, setMessage] = useState("");

//   const url = `${env.BASE_URL_BACKEND}register`;
//   const navigate = useNavigate();
//   const handleOnChange = (input, stateName) => {
//     stateName(input.target.value);
//   };

//   const [showPassword, setShowPassword] = useState(false);
//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const handleClickShowConfirmPassword = () =>
//     setShowConfirmPassword((show) => !show);
//   const handleMouseDownConfirmPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = {
//       name: name,
//       email: email,
//       password: password,
//       role: "student",
//     };
//     console.log(data);
//     await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         console.log(response);
//         return response.json();
//       })
//       .then((json) => {
//         setMessage(json.message);
//       });

//     // const result = await response;
//     // console.log(result);
//     // const res = await result.json();
//     // console.log("Success Resgister", result)
//   };



//   React.useEffect(() => {
//     if (message == "User Created") {
//       const timer = setTimeout(() => navigate("/login"), 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   return (
//     <>
//       <Box
//         sx={{
//           pt: 15,
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "center",
//           gap: 5,
//           mb: 10,
//         }}
//       >
//         <Box sx={{ display: "flex", flexDirection: "column" }}>
//           {message == "Failed to Register" &&  <Alert severity="error">
//               The user already exists.
//             </Alert>}

//           {message == "User Created" && (
//             <Alert severity="success">
//               Thanks for signing up. Your account has been created.
//             </Alert>
//           )}
//           <Typography
//             sx={{
//               color: "#313131",
//               fontFamily: "Roboto",
//               fontSize: "2.5rem",
//               fontStyle: "normal",
//               fontWeight: 500,
//               lineHeight: "normal",
//               mb: 3,
//             }}
//           >
//             Sign Up
//           </Typography>
//           {console.log(message)}

//           <TextField
//             id="name"
//             onChange={(e) => handleOnChange(e, setName)}
//             label="Name"
//             variant="outlined"
//             placeholder="Input your name"
//             sx={{ width: "26.375rem", mb: "1.75rem" }}
//           />
//           <TextField
//             id="email"
//             label="Email"
//             variant="outlined"
//             placeholder="Input your email"
//             sx={{ width: "26.375rem", mb: "1.75rem" }}
//             onChange={(e) => handleOnChange(e, setEmail)}
//           />
//           <FormControl
//             sx={{ width: "26.375rem", mb: "1.75rem" }}
//             variant="outlined"
//             id="password"
//             onChange={(e) => handleOnChange(e, setPassword)}
//           >
//             <InputLabel htmlFor="outlined-adornment-password">
//               Password
//             </InputLabel>
//             <OutlinedInput
//               id="outlined-adornment-password"
//               type={showPassword ? "text" : "password"}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//               label="Password"
//               placeholder="Input your password"
//             />
//           </FormControl>
//           <FormControl
//             sx={{ width: "26.375rem", mb: "1.75rem" }}
//             variant="outlined"
//             onChange={(e) => handleOnChange(e, setConfirmPassword)}
//           >
//             <InputLabel htmlFor="outlined-adornment-password">
//               Confirm Password
//             </InputLabel>
//             <OutlinedInput
//               id="outlined-adornment-password"
//               type={showConfirmPassword ? "text" : "password"}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowConfirmPassword}
//                     onMouseDown={handleMouseDownConfirmPassword}
//                     edge="end"
//                   >
//                     {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//               label="Confirm Password"
//               placeholder="Input your password"
//             />
//           </FormControl>
//           <Button
//             variant="contained"
//             size="large"
//             onClick={(e) => handleSubmit(e)}
//             sx={{
//               fontSize: "18px",
//               lineHeight: "16px",
//               letterSpacing: "1px",
//               bgcolor: "#FE7860",
//               color: "#fff",
//               mb: 1.5,
//               py: "1rem",
//               textTransform: "capitalize",
//             }}
//           >
//             Sign Up
//           </Button>
//           <Divider
//             sx={{
//               color: "#A7C0CD",
//               fontSize: "1.125rem",
//               fontStyle: "normal",
//               fontWeight: 400,
//               lineHeight: "1rem",
//               letterSpacing: "0.09375rem",
//               textTransform: "capitalize",
//               my: 2,
//             }}
//           >
//             or
//           </Divider>
//           <Button
//             startIcon={
//               <GoogleIcon sx={{ fontSize: "large", color: "#506CF0" }} />
//             }
//             variant="outlined"
//             size="large"
//             sx={{
//               fontSize: "18px",
//               lineHeight: "16px",
//               letterSpacing: "1px",
//               color: "#313131",
//               my: 1.5,
//               py: "1rem",
//               textTransform: "capitalize",
//               border: 1.2,
//               borderColor: "#506CF0",
//             }}
//           >
//             Login with Google
//           </Button>
//           <Typography
//             sx={{
//               color: "#313131",
//               textAlign: "center",
//               fontFamily: "Roboto",
//               fontSize: "0.8rem",
//               fontStyle: "normal",
//               fontWeight: 400,
//               lineHeight: "1rem",
//               letterSpacing: "0.09375rem",
//               textTransform: "capitalize",
//             }}
//           >
//             Already have an account?
//             <span
//               style={{
//                 color: "#506CF0",
//                 fontFamily: "Roboto",
//                 fontSize: "0.8rem",
//                 fontStyle: "normal",
//                 fontWeight: 700,
//                 lineHeight: "1rem",
//                 letterSpacing: "0.09375rem",
//                 textTransform: "capitalize",
//                 marginLeft: "0.5rem",
//               }}
//             >
//               <a
//                 href="/login"
//                 style={{ textDecoration: "none", color: "#506CF0" }}
//               >
//                 Let's Log In!
//               </a>
//             </span>
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <img src={registerImg} style={{ width: "35rem" }} />
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default Register;


import React, { useState, useEffect } from 'react';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Cek apakah pengguna sudah memiliki token JWT yang valid
    const token = localStorage.getItem('token'); // Anda harus menyimpan token di local storage setelah login
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav>
      <ul>
        <li><a href="/">Beranda</a></li>
        {isLoggedIn ? (
          <li><a href="/profil">Profil</a></li>
        ) : (
          <li><a href="/login">Login</a></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;


