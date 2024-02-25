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


const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [dataUser, setDataUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const navigate = useNavigate()

    const [old_password, setOld_password] = useState("");
    const [new_password, setNew_password] = useState("");
    const [message, setMessage] = useState("");
    const [isChange, setIsChange] = useState(false);

    const userId = localStorage.getItem("userId");
    const user = JSON.parse(localStorage.getItem("user"));
    const urlChangePassword = `http://localhost:8000/changePassword/${userId}`;
    const urlProfileById = `http://localhost:8000/profile/${userId}`;


    const handleChange = (event) => {
        switch (event.target.name) {
            case "old_password":
                setOld_password(event.target.value);
                setIsChange(true)
                break;
            case "new_password":
                setNew_password(event.target.value);
                setIsChange(true)
                break;
        }
    };

    const handleSave = (event) => {
        event.preventDefault()
        const newData = {
            old_password,
            new_password,
        };

        fetch(urlChangePassword, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setMessage(json.message);
            });
    }

    useEffect(() => {
        if (message == "Updated successfully") {
            const timer = setTimeout(() => {
                navigate("/profile");
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

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

    return (
        <>
            <Box
                sx={{
                    my: { xs: 8, md: 16 },
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
                    Change Password
                </Typography>
                {loading ? (
                    <Alert severity="info">A moment please...</Alert>
                ) : (
                    <>
                        <Stack direction="column" spacing={2}>
                            <FormControl variant="outlined" onChange={handleChange}>
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Old Password
                                </InputLabel>
                                <OutlinedInput
                                    name="old_password"
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
                                />
                            </FormControl>
                            <FormControl
                                sx={{}}
                                variant="outlined"
                                onChange={handleChange}
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    New Password
                                </InputLabel>
                                <OutlinedInput
                                    name="new_password"
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm Password"
                                />
                            </FormControl>
                        </Stack>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                fontSize: "18px",
                                lineHeight: "16px",
                                letterSpacing: "1px",
                                paddingTop: "1rem",
                                paddingBottom: "1rem",
                                marginTop: 3,
                                color: "#ffffff",
                                backgroundColor: (isChange == true) ? "#FE7860" : "",
                                textTransform: "capitalize",
                                width: "14.5rem",
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
                    <Alert onClose={handleCloseAlert} severity="success">New password is updated successfully</Alert>
                </Snackbar>)}
            </Box>
        </>
    );
};

export default ChangePassword;
