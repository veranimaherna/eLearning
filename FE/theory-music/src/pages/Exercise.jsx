import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import logo from "../assets/logoTreble.png";
import { useOutletContext, useNavigate } from "react-router-dom";
import ExerciseList from "../components/ExerciseList";

const Exercise = () => {
  const [userLogin, setUserLogin, tabValue, setTabValue] = useOutletContext();
  const navigate = useNavigate();

  const [userExerciseByIdCreated, setUserExerciseByIdCreated] = useState(0);
  const [dataUserExercise, setDataUserExercise] = useState(null);
  const [dataExercise, setDataExercise] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [userLastScoreGrade1, setUserLastScoreGrade1] = useState("-")
  const [userLastScoreGrade2, setUserLastScoreGrade2] = useState("-")
  const [userLastScoreGrade3, setUserLastScoreGrade3] = useState("-")

  // const url = `${env.BASE_URL_BACKEND}login`;
  const urlExercise = `http://localhost:8000/exercise`;
  const urlUserExercise = `http://localhost:8000/userExercise`;
  const userId = localStorage.getItem("userId");
  const urlUserExerciseByUserId = `http://localhost:8000/userExerciseByUser/${userId}`;
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (userLogin) {
      setLoading(true)
      fetch(urlUserExerciseByUserId, {
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
        .then((actualDataUserExercise) => {
          setDataUserExercise(actualDataUserExercise);
          setError(null);

          const userScoreByGrade1 = actualDataUserExercise?.data?.filter((gradeExercise) => gradeExercise.ExerciseId === 1)

          const userLastDataGrade1 = userScoreByGrade1.length > 0 ? userScoreByGrade1[userScoreByGrade1.length - 1] : { exercise_score: "-" }

          setUserLastScoreGrade1(userLastDataGrade1.exercise_score)

          const userScoreByGrade2 = actualDataUserExercise?.data?.filter((gradeExercise) => gradeExercise.ExerciseId === 2)

          const userLastDataGrade2 = userScoreByGrade2.length > 0 ? userScoreByGrade2[userScoreByGrade2.length -1] : {exercise_score: "-" }

          setUserLastScoreGrade2(userLastDataGrade2.exercise_score)
          
          const userScoreByGrade3 = actualDataUserExercise?.data?.filter((gradeExercise) => gradeExercise.ExerciseId === 3)
          
          const userLastDataGrade3 = userScoreByGrade3.length > 0 ? userScoreByGrade3[userScoreByGrade3.length -1] : {exercise_score: "-" }

          setUserLastScoreGrade3(userLastDataGrade3.exercise_score)

        })
        .catch((err) => {
          
          setError(err.message);
          setDataUserExercise(null);
        })
        .finally(() => {
          setLoading(false);
        });

      fetch(urlExercise, {
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
        .then((actualDataUserExercise) => {
          setDataExercise(actualDataUserExercise);
          setError(null);
        })
        .catch((err) => {
          
          setError(err.message);
          setDataExercise(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate("/login");
    }
  }, []);


  const arrayDataUserExerciseLength = dataUserExercise?.data.length - 1;

  const gradeExerciseData = dataExercise?.data?.map(
    (data) => data.grade_exercise
  );

  const uniquesValues = [...new Set(gradeExerciseData)];

  const detailExerciseListArray = ["Exercise Topic 1 - Topic 4", " Exercise Topic 5 - Topic 9", "Exercise Topic 10 - Topic 15"]

  const exerciseLists = () => {
    return <>
      {Array.from({ length: uniquesValues.length }, (_, i) => (
        <ExerciseList key={i} uniquesValues={uniquesValues} gradeExerciseList={uniquesValues[`${i}`]} detailExerciseListArray={detailExerciseListArray[`${i}`]} userLastScoreGrade1= {userLastScoreGrade1} userLastScoreGrade2 = {userLastScoreGrade2} userLastScoreGrade3 = {userLastScoreGrade3}/>
      ))}
    </>
  }

  return (
    <>
      <Box sx={{ my: 15, px: 4 }}>
        <Box
          sx={{
            pl: 2,
            py: 2,
            mb: 3,
            color: "#fff",
            fontSize: "1.1rem",
            fontWeight: "500",
            lineHeight: "1rem",
            letterSpacing: "0.09375rem",
            textTransform: "capitalize",
            bgcolor: "#A7C0CD",
            borderRadius: "0.5rem",
            fontFamily: "Roboto",
          }}
        >
          Let’s practice what you’ve learned!
        </Box>
        <Stack direction="row" spacing={4}>
          {exerciseLists()}
        </Stack>
      </Box>
    </>
  );
};

export default Exercise;
