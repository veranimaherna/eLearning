import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";

const ExerciseScorePass = ({ userScore, setShowPreviewAnswer }) => {
  const [_,_a,tabValue, setTabValue] = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          py: 5,
          px: 5,
          gap: 1.5,
          bgcolor: "#EDF4F7",
          width: "500px",
          borderRadius: "1rem",
        }}
      >
        <Typography
          sx={{
            color: "#FE7860",
            textAlign: "center",
            fontFamily: "Lora",
            fontSize: "1.75rem",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
          }}
        >
          Hooray!
        </Typography>
        <Typography
          sx={{
            color: "#313131",
            fontFamily: "Roboto",
            fontSize: "1.125rem",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            textAlign: "center",
          }}
        >
          Your Score is {userScore}/10
        </Typography>
        <Typography sx={{ textAlign: "center", mt: 1.5 }}>
          Way to Shine. Keep Up the Great Work!
        </Typography>
        <Stack sx={{ my: 2, display: "flex", flexDirection: "row", gap: 4 }}>
          <Button
            variant="outlined"
            sx={{
              mr: 2,
              px: 3,
              py: 1.5,
              fontSize: "1rem",
              letterSpacing: "1px",
              fontFamily: "Roboto",
              fontStyle: "normal",
              textAlign: "center",
              lineHeight: "normal",
              textTransform: "capitalize",
              borderRadius: "0.25rem",
              borderColor: "#A7C0CD",
              bgcolor: "#A7C0CD",
              color: "#FFF",
            }}
            onClick={()=> setShowPreviewAnswer(true)}
          >
            Preview Answers
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              px: 3,
              py: 1.5,
              fontSize: "1rem",
              letterSpacing: "1px",
              fontFamily: "Roboto",
              fontStyle: "normal",
              textAlign: "center",
              lineHeight: "normal",
              textTransform: "capitalize",
              borderRadius: "0.25rem",
              borderColor: "#506CF0",
              bgcolor: "#506CF0",
              color: "#FFF",
            }}
            onClick={() => {
              setTabValue("")
              navigate("/");
            }}
          >
            Go to Home
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default ExerciseScorePass;
