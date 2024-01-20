import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + (hash << (5 - hash));
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  let myName = name.split(" ");
  const childrenValue =
    myName.length === 2
      ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
      : `${name.split(" ")[0][0]}`;
  return {
    sx: {
      // bgcolor: stringToColor(name),
      width: 72,
      height: 72,
      fontSize: "2rem",
      textTransform: "capitalize",
    },
    children: childrenValue,
  };
}

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  // const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [new_name, setNew_name] = useState("");
  const [message, setMessage] = useState("");
  const [isChange, setIsChange] = useState(false);

  const userId = localStorage.getItem("userId");
  const user = JSON.parse(localStorage.getItem("user"));
  const urlChangePassword = `http://localhost:8000/changePassword/${userId}`;
  const urlUpdateName = `http://localhost:8000/updateName/${userId}`;
  const urlProfileById = `http://localhost:8000/profile/${userId}`;


  const handleChange = (event) => {
    switch (event.target.name) {
      case "new_name":
        setNew_name(event.target.value);
        console.log(new_name, "new_name");
        setIsChange(true)
        break;
      case "password":
        setPassword(event.target.value);
        console.log(password, "password");
        setIsChange(true)
        break;
    }
  };

  // const handleSavePassword = (event) => {
  //   // event.preventDefault();
  //   const newData = {
  //     old_password,
  //     new_password,
  //   };

  //   fetch(urlChangePassword, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newData),
  //   })
  //     .then((response) => {
  //       console.log(response, "resp");
  //       return response.json();
  //     })
  //     .then((json) => {
  //       setMessage(json.message);
  //     });
  // };
  const handleSaveName = (event) => {

    fetch(urlUpdateName, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        new_name: new_name
      }),
    })
      .then((response) => {
        console.log(response, "resp");
        return response.json();
      })
      .then((json) => {
        setMessage(json.message);
        if (json.message === "Updated successfully") {
          localStorage.setItem("userName", new_name.toLowerCase());
          navigate(0)
        }
      });
  };

  const handleSave = (event) => {
    event.preventDefault()
    handleSaveName()
  }

  const [open, setOpen] = useState(true)

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(true)
  }

  useEffect(() => {
    fetch(urlProfileById, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
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
        console.log(actualData);
        setDataUser(actualData);
        setError(null);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
        setDataUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const userEmail = dataUser?.data?.email;
  const userName = dataUser?.data?.name;
  console.log(userEmail);

  // const userEmail = dataUser?.data?.email;

  const handleUpdatePicture = () => {
    return <input type="file" id="profile-image" style={{ display: "none" }} />
  }

  return (
    <>
      <Stack
        sx={{
          my: 15,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "#313131",
            fontFamily: "Roboto",
            fontSize: "2.5rem",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            mb: 5,
          }}
        >
          Setting Profile
        </Typography>
        {loading ? (
          <Alert severity="info">A moment please...</Alert>
        ) : (
          <>
            <input type="file" id="profile-image" style={{ display: "none" }} />
            <label htmlFor="profile-image">
              <Avatar {...stringAvatar(userName)} />
            </label>
            <Stack sx={{ m: 2 }}>

              <Button variant="outlined">
                Update Picture
              </Button>

              <input type="file" id="update-profile-image" style={{ display: "none" }} />
              <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate("/changePassword")}>Change Password</Button>
            </Stack>
            <table style={{ marginBottom: " 1rem" }}>
              <tbody>
                <tr style={{ height: "80px" }}>
                  <td style={{ width: "150px" }}>
                    <Typography>Name</Typography>
                  </td>
                  <td>
                    <TextField
                      sx={{ width: "25rem", textTransform: "capitalize" }}
                      id="name"
                      name="new_name"
                      variant="outlined"
                      defaultValue={userName}
                      size="small"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr style={{ height: "80px" }}>
                  <td>
                    <Typography>Email</Typography>
                  </td>
                  <td>
                    {loading ? (
                      <p>sabar</p>
                    ) : (
                      <TextField
                        id="email"
                        name="email"
                        variant="outlined"
                        defaultValue={userEmail}
                        size="small"
                        sx={{ width: "25rem" }}
                        disabled={true}
                      />
                    )}
                  </td>
                </tr>
                  <Divider>Enter your current password to proceed with the changes</Divider>
                <tr style={{ height: "140px" }}>
                  <td style={{ verticalAlign: "middle" }}>
                    <Typography>Password</Typography>
                  </td>
                  <td>
                    <FormControl variant="outlined" onChange={handleChange}>
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        name="password"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        sx={{ width: "25rem" }}
                        size="small"
                      />
                    </FormControl>
                  </td>
                </tr>
              </tbody>
            </table>
            <Button
              variant="contained"
              size="large"
              style={isChange == false ? {
                fontSize: "18px",
                lineHeight: "16px",
                letterSpacing: "1px",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                color: "#ffffff",
                textTransform: "capitalize",
                width: "35rem",
              } : {
                fontSize: "18px",
                lineHeight: "16px",
                letterSpacing: "1px",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                color: "#ffffff",
                backgroundColor: "#FE7860",
                textTransform: "capitalize",
                width: "35rem",
              }}
              type="submit"
              onClick={handleSave}
              disabled={isChange == false}
            >
              Save
            </Button>
          </>
        )}
        {message === "Updated successfully" && (<Snackbar open={open} autoHideDuration={3000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="success">Changes is updated successfully</Alert>
        </Snackbar>)}
      </Stack>
    </>
  );
};

export default Profile;
