import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExerciseScorePass from "./ExerciseScorePass";
import ExerciseScoreFail from "./ExerciseScoreFail";

const ExerciseSubmitModal = ({
  closeModal,
  handleSubmitModal
}) => {

  return (
    <>
      {/* {console.log(userScore, "score")} */}
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
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
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
          Are you sure want to submit?
        </Typography>
        <Stack sx={{ my: 2, display: "flex", flexDirection: "row", gap: 2 }}>
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
            onClick={closeModal}
          >
            Preview
          </Button>
          <Button
            onClick={handleSubmitModal}
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
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default ExerciseSubmitModal;
