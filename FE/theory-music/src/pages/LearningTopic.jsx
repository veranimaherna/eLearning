import React, { useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import PreviewAnswer from "../components/PreviewAnswer";
import { useState } from "react";
import LearningQuiz from "../components/LearningQuiz";
import {
  Navigate,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

const LearningTopic = () => {
  const { topicId } = useParams();
  const [clickButton, setClickButton] = useState("topic");
  const [loading, setLoading] = useState(true);
  const [dataLearning, setDataLearning] = useState(null);
  const [dataTopic, setDataTopic] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const urlLearning = `http://localhost:8000/learning`;
  const urlTopic = `http://localhost:8000/topic`;
  const user = JSON.parse(localStorage.getItem("user"));
  const pathLocationValue = useLocation().pathname;

  const [_, a, tabValue, setTabValue] = useOutletContext();

  useEffect(() => {
    setClickButton("topic");
  }, [topicId]);

  useEffect(() => {
    if (topicId <= 15) {
      fetch(urlLearning, {
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
          setDataLearning(actualData);
          setError(null);
        })
        .catch((err) => {

          setError(err.message);
          setDataLearning(null);
        })
        .finally(() => {
          setLoading(false);
        });
      fetch(urlTopic, {
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
          console.log(
            "ACTUAL DATA FILTER",
            topicId,
            actualData.data.filter((coba) => coba.id === parseInt(topicId))
          );
          setDataTopic({
            data: actualData.data.filter(
              (coba) => coba.id === parseInt(topicId)
            )[0],
          });
          setError(null);
        })
        .catch((err) => {

          setError(err.message);
          setDataTopic(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setTabValue("learning");
      navigate("/learning", {
        state: {
          isNotfound: true
        }
      })
      // navigate(pathLocationValue + "/not-found");
    }
  }, []);

  const arrayDataLearning = dataLearning?.data[topicId - 1].explanation;
  const arrayDataTopicTitle = dataTopic?.data.topic_title;
  const arrayDataTopicDescription = dataTopic?.data.topic_description;

  const gradeLearningTopic = dataTopic?.data.GradeLearningId;

  const handleTakeQuiz = (event) => {
    event.preventDefault();
    setClickButton("quiz");
  };

  // if(!dataLearning) {
  //   console.log("verani ada disini")
  //   return (
  //     <>
  //       <p>dwqw</p>
  //     </>
  //   )
  // }

  return (
    <>
      <Stack sx={{ my: 5, mx: 4 }}>
        <Box
          sx={{
            pl: 2,
            py: 2,
            mb: 0.2,
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "500",
            lineHeight: "1rem",
            letterSpacing: "0.09375rem",
            textTransform: "uppercase",
            bgcolor: "#A7C0CD",
            borderRadius: "0.5rem",
          }}
        >
          Grade {gradeLearningTopic}
        </Box>
        <Stack sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" } }}>
          <Box
            sx={{ height: { xs: "100px", lg: "400px" }, py: 2, border: 1, borderRadius: "0.2rem" }}
          >
            <Box
              sx={
                clickButton == "topic"
                  ? { py: 2, pl: 2, pr: 20, bgcolor: "#EDF4F7" }
                  : {
                    py: 2,
                    pl: 2,
                    pr: 20,
                    bgcolor: "#fffff",
                    color: "#313131",
                  }
              }
              onClick={() => {
                setClickButton("topic");
              }}
            >
              <Button
                variant="text"
                sx={
                  clickButton == "topic"
                    ? {
                      margin: 0,
                      padding: 0,
                      textAlign: "left",
                      color: "secondary",
                    }
                    : {
                      margin: 0,
                      padding: 0,
                      textAlign: "left",
                      color: "#313131",
                    }
                }
                onClick={() => {
                  setClickButton("topic");
                }}
              >
                Topic {topicId}
              </Button>
            </Box>
            <Box
              sx={
                clickButton == "quiz"
                  ? { py: 2, pl: 2, pr: 20, bgcolor: "#EDF4F7" }
                  : { py: 2, pl: 2, pr: 20, bgcolor: "#ffffff" }
              }
              onClick={() => {
                setClickButton("quiz");
              }}
            >
              <Button
                variant="text"
                sx={
                  clickButton == "quiz"
                    ? {
                      margin: 0,
                      padding: 0,
                      textAlign: "left",
                      color: "secondary",
                    }
                    : {
                      margin: 0,
                      padding: 0,
                      textAlign: "left",
                      color: "#313131",
                    }
                }
                onClick={() => {
                  setClickButton("quiz");
                }}
              >
                Quiz
              </Button>
            </Box>
          </Box>
          <Box sx={{ px: { xs: 0, lg: 8 }, py: 4, width: "100%" }}>
            {clickButton == "quiz" ? (
              <LearningQuiz />
            ) : (
              <>
                <Typography variant="h5" color={"#313131"}>
                  {arrayDataTopicTitle}
                </Typography>
                <div
                  dangerouslySetInnerHTML={{
                    __html: arrayDataLearning,
                  }}
                  style={{
                    fontFamily: "Roboto",
                    lineHeight: "24px",
                    fontSize: "1.1rem",
                    color: "#313131",
                  }}
                  className="learningTopic"
                />
                <Stack
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Button
                    variant="contained"
                    onClick={handleTakeQuiz}
                    sx={{ textTransform: "capitalize" }}
                  >
                    Take Quiz
                  </Button>
                </Stack>
                {clickButton == "quiz" ? <LearningQuiz setClickButton={setClickButton} clickButton={clickButton} /> : <></>}
              </>
            )}
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default LearningTopic;
