import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

const LearningModal = ({ closeModal }) => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const nextTopicLearning = parseInt(topicId) + 1;
  const [_, a, tabValue, setTabValue] = useOutletContext();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          py: 5,
          px: { xs: 3, sm: 5 },
          gap: 1.5,
          bgcolor: "#EDF4F7",
          width: {xs:"80%", sm:"50%", lg: "30%"},
          borderRadius: "1rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
          Congratulations!
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
          You’ve now reached the end of the topic.
        </Typography>
        <Typography sx={{ textAlign: "center", mt: 1.5 }}>
          If you would like to, you can go back over any to review the material
          or you could continue to learn next lesson
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
            onClick={closeModal}
          >
            Review
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
              if (nextTopicLearning <= 15) {
                navigate("/learning/topic/" + nextTopicLearning);
                navigate(0)
              } else {
                setTabValue("");
                navigate("/");
              }
            }}
          >
            Continue
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default LearningModal;
