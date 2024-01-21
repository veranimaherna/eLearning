import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import logo from "../assets/logoTreble.png";
import env from "react-dotenv";
import { Login } from "@mui/icons-material";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const Learning = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // const url = `${env.BASE_URL_BACKEND}gradeLearning`;
  const url = `http://localhost:8000/gradeLearning`;
  const user = JSON.parse(localStorage.getItem("user"));

  const [userLogin, setUserLogin, tabValue, setTabValue] = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();

  const isNotFoundFromState = location.state?.isNotfound;

  // if(location.state?.isNotfound) {
  //   alert("topic gaada bossss")
  // }

  useEffect(() => {
    if (userLogin) {
      fetch(url, {
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
          setData(actualData);
          setError(null);
        })
        .catch((err) => {
          
          setError(err.message);
          setData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate("/login");
    }
  }, []);

  // useEffect(() => {
  //   const loadData = async () => {
  //     setLoading(true)
  //     const response = await axios.get(url)
  //     setData(response.data)
  //     setLoading(false)
  //   }
  //   loadData()
  //   // await fetch(url, {
  //   //   method: "GET",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   body: JSON.stringify(data),
  //   // })
  //   //   .then((response) => {
  //   //     console.log(response);
  //   //     return response.json();
  //   //   })
  //   //   .then((json) => {
  //   //     setData(json.data);
  //   //   });
  //   // setData(data)
  // }, []);

  const arrayDataGradeLearning = data?.data?.map((grade) => (
    <div key={grade.id}>
      <Accordion sx={{ mb: 4 }}>
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
            {grade.grade_name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" spacing={2}>
            <Grid container>
              {grade.Topics.map((topic) => (
                <Grid item sm={12} md={6} lg={3}>
                  <Box
                    key={topic.id}
                    sx={{
                      bgcolor: "none",
                      // width: "19.375rem",
                      height: "auto",
                      borderRadius: "0.3rem",
                      border: "1px solid  #313131",
                      mr:1,
                      mb:3
                    }}
                  >
                    {/* <Stack
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
                    </Stack> */}
                    <Stack
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "left",
                        bgcolor: "#EDF4F7",
                        p: 2,
                        borderRadius: "0.3rem"
                      }}
                    >
                      <Typography sx={{ fontSize: "1.25rem" }}>
                        Topic {topic.id}
                      </Typography>
                    </Stack>
                    <Stack sx={{ p: 2 }}>
                      <Typography
                        sx={{
                          mt: 0.25,
                          fontFamily: "Roboto",
                          fontSize: "0.875rem",
                          // fontWeight: 600
                        }}
                      >
                        {topic.topic_title}
                      </Typography>
                      <Typography
                        sx={{
                          mt: 1,
                          mb: 2,
                          color: "#666",
                          fontSize: "0.875rem ",
                        }}
                      >
                        {topic.topic_description}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          textTransform: "capitalize",
                          fontFamily: "Roboto",
                          fontSize: "1rem",
                          lineHeight: "1.8rem",
                        }}
                        onClick={() => {
                          setTabValue("learning");
                          navigate("/learning/topic/" + topic.id);
                        }}
                      >
                        Learn
                      </Button>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </div>
  ));

  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Box sx={{ my: 15, px: 4 }}>
        <Snackbar
          open={isNotFoundFromState && open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
            There is no topic learning huy!
          </Alert>
        </Snackbar>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {loading && <Alert severity="info">A moment please...</Alert>}
          {error && (
            <Alert severity="warning">
              There is a problem fetching the data
            </Alert>
          )}
        </Box>
        {data && arrayDataGradeLearning}
      </Box>
    </>
  );
};

export default Learning;
