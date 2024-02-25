import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function stringAvatar(name) {
  let myName = name.split(" ");
  const childrenValue =
    myName.length === 1
      ? `${name.split(" ")[0][0]}`
      : `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
  return {
    sx: {
      bgcolor: "#EDF4F7",
      color: "#A7C0CD",
      width: 72,
      height: 72,
      fontSize: "2rem",
      textTransform: "uppercase",
    },
    children: childrenValue,
  };
}

const Profile = () => {
  const [dataUser, setDataUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userEmail = dataUser?.data?.email;
  const userName = dataUser?.data?.name;

  const [image, setImage] = useState("");
  const [saveImage, setSaveImage] = useState(null)

  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [new_name, setNew_name] = useState("");
  const [message, setMessage] = useState("");
  const [isChange, setIsChange] = useState(false);


  const userId = localStorage.getItem("userId");
  const user = JSON.parse(localStorage.getItem("user"));
  const urlUpdateName = `http://localhost:8000/updateName/${userId}`;
  const urlProfileById = `http://localhost:8000/profile/${userId}`;
  const urlAvatar = `http://localhost:8000/avatar/${userId}`;


  const handleChange = (event) => {
    switch (event.target.name) {
      case "new_name":
        setNew_name(event.target.value);
        setIsChange(true)
        break;
      case "password":
        setPassword(event.target.value);
        setIsChange(true)
        break;
    }
  };

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

  const [openAlert, setOpenAlert] = useState(true)

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(true)
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
  }, []);

  console.log(dataUser, "dataUser")

  // const userEmail = dataUser?.data?.email;

  const handleUpdatePicture = (e) => {
    console.log(e.target.files[0])
    let uploaded = e.target.files[0]
    console.log(URL.createObjectURL(uploaded))
    setImage(URL.createObjectURL(uploaded))
    setSaveImage(uploaded)
  }

  const uploadImage = () => {
    if (saveImage) {
      let formData = new FormData()
      formData.append("profilePicture", saveImage)
      fetch(urlAvatar, {
        method: "PUT",
        headers: {
          Authorization: user.token,
        },
        body: formData
      })
        .then((res) => res.json())
        .then((data) => {
          setMessage(data.message);
          if (data.message === "Profile picture updated successfully") {
            handleCloseEditPicture()
            navigate(0)
          }
        })
    }
    else {
      console.log("gagal")
    }
    // if (!saveImage) {
    //   alert("Upload gambar")
    // } else {
    //   let formData = new FormData()
    //   formData.append("profilePicture", saveImage)
    //   console.log(saveImage, "saveImage")
    //   fetch(urlAvatar, {
    //     method: "PUT",
    //     // headers: {
    //     //   "Content-Type": "application/json"
    //     // },
    //     body: formData
    //   })
    //     .then((res) => res.json())
    //     .then(data => {
    //       if (data.message === "Profile picture updated successfully") {
    //         window.location.href = data.image
    //       }
    //     })
    // }
  }

  const [openEditPictureModal, setOpenEditPictureModal] = useState(false)

  const handleOpenEditPicture = () => setOpenEditPictureModal(true)
  const handleCloseEditPicture = () => setOpenEditPictureModal(false)

  const profileImage = null

  return (
    <>
      {message === "Updated successfully" && (
        <Snackbar
          open={openAlert}
          autoHideDuration={10000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity="success">
            Changes is updated successfully
          </Alert>
        </Snackbar>)}
      <Stack
        sx={{
          mt: { xs: 2, md: 6 },
          mb: { xs: 8, md: 16 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        {message == "Profile picture updated successfully" && (
          <Snackbar
            open={openAlert}
            autoHideDuration={10000}
            onClose={handleCloseAlert}
          >
            <Alert onClose={handleCloseAlert} severity="success">
              Updated succesfully!
            </Alert>
          </Snackbar>
        )}

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
          <Box
            sx={{
              pt: { xs: 1, md: 0 },
              mb: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Alert severity="info">A moment please...</Alert>
          </Box>
        ) : (
          <>
            {dataUser?.data.profile_image ?
              <label htmlFor="profile-image">
                <Avatar
                  src={dataUser?.data.profile_image}
                  sx={{
                    width: 100,
                    height: 100,
                    border: 1
                  }}
                />
              </label>
              :
              <Avatar
                {...stringAvatar(userName)}
              />
            }

            <Stack sx={{ m: 2 }}>
              <Button variant="outlined" onClick={handleOpenEditPicture}>
                Edit Picture
              </Button>
              {openEditPictureModal ?
                <Modal
                  open={openEditPictureModal}
                  onClose={handleCloseEditPicture}
                >
                  <Box sx={{
                    bgcolor: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    py: 5,
                    px: 5,
                    gap: 3,
                    width: "300px",
                    borderRadius: "1rem",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                  }}>
                    {saveImage ?
                      <label htmlFor="profile-image">
                        <Avatar
                          src={image}
                          sx={{
                            width: 100,
                            height: 100,
                            border: 1
                          }}
                        />
                      </label>
                      :
                      <Avatar
                        {...stringAvatar(userName)}
                      />
                    }

                    <input
                      type="file"
                      id="profileImage"
                      onChange={handleUpdatePicture}
                      accept="image/*"
                      style={{ paddingLeft: "10px" }}
                    />
                    <Button variant="outlined" onClick={uploadImage}>
                      Update Picture
                    </Button>
                  </Box>
                </Modal>
                : <></>}

              <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate("/changePassword")}>
                Change Password
              </Button>
            </Stack>

            <table style={{ marginBottom: " 1rem" }}>
              <tbody>
                <tr style={{ height: "80px" }}>
                  <td style={{ width: "60px" }}>
                    <Typography>Name</Typography>
                  </td>
                  <td>
                    <TextField
                      sx={{ width: { xs: "15rem", sm: "25rem" }, textTransform: "capitalize" }}
                      id="name"
                      name="new_name"
                      variant="outlined"
                      defaultValue={userName.toUpperCase()}
                      size="small"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr style={{ height: "60px" }}>
                  <td>
                    <Typography>Email</Typography>
                  </td>
                  <td>
                    {loading ? (
                      <p>wait...</p>
                    ) : (
                      <TextField
                        id="email"
                        name="email"
                        variant="outlined"
                        defaultValue={userEmail}
                        size="small"
                        sx={{ width: { xs: "15rem", sm: "25rem" } }}
                        disabled={true}
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <Button
              variant="contained"
              size="large"
              sx={{
                fontSize: "18px",
                lineHeight: "16px",
                letterSpacing: "1px",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                color: "#ffffff",
                backgroundColor: (isChange == true) ? "#FE7860" : "",
                textTransform: "capitalize",
                width: { xs: "19rem", sm: "30rem" },
              }}
              type="submit"
              onClick={handleSave}
              disabled={isChange == false}
            >
              Save
            </Button>
          </>
        )}



      </Stack>
    </>
  );
};

export default Profile;
