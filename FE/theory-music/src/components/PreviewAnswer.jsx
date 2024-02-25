import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import logoBottom from "../assets/logoBottom.png";
import { convertLength } from "@mui/material/styles/cssUtils";

const PreviewAnswer = ({ questionNumber, questionExercisePerNumber, exerciseCorrectAnswer, exerciseUserAnswer, wrongAnswer, isCorrection }) => {
  return (
    <>
      <Box
        sx={{
          border: `1px solid ${isCorrection? "#313131" : "red" }`,
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
          }}>{isCorrection === false ? "Wrong" : "Correct"}</Typography>
        </Stack>
        {questionExercisePerNumber}
        <Typography sx={{ mb: 2 }}>
          Correct Answer: <span>{exerciseCorrectAnswer}</span>
        </Typography>
        <Typography>
          Your Answer: <span>{exerciseUserAnswer}</span>
        </Typography>
      </Box>
    </>
  );
};

export default PreviewAnswer;
