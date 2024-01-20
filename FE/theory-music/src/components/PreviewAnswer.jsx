import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import logoBottom from "../assets/logoBottom.png";

const PreviewAnswer = ({ questionNumber, questionExercisePerNumber, exerciseCorrectAnswer, userAnswer, wrongAnswer }) => {
  return (
    <>
      <Box
        sx={{
          border: "1px solid #313131",
          borderRadius: 1.5,
          py: "2.5rem",
          px: "1.5rem ",
          my: 2,
          width: "45rem",
        }}
      >
        <Stack
          direction="row" justifyContent="space-between" alignItems="center">
          <Typography
            sx={{
              color: " #313131",
              textAlign: "left",
              fontSize: "1.25rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "1rem",
              letterSpacing: "0.09375rem",
              textTransform: "capitalize",
              mb: 3,
            }}
          >
            Question {questionNumber}:
          </Typography>
          <Typography sx={{
            color: " #313131",
            textAlign: "left",
            fontSize: "1.25rem",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "1rem",
            letterSpacing: "0.09375rem",
            textTransform: "capitalize",
            mb: 3,
          }}>{wrongAnswer}</Typography>
        </Stack>
        {questionExercisePerNumber}
        <Typography sx={{ mb: 2 }}>
          Correct Answer: <span>{exerciseCorrectAnswer}</span>
        </Typography>
        <Typography>
          Your Answer: <span>{userAnswer}</span>
        </Typography>
      </Box>
    </>
  );
};

export default PreviewAnswer;
