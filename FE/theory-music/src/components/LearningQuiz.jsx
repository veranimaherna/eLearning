import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LearningModal from "./LearningModal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import {
  Alert,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Modal,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
} from "@mui/material";

const steps = ["Q1", "Q2", "Q3", "Q4", "Q5"];

export default function LearningQuiz(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [dataQuiz, setDataQuiz] = useState(null);
  const [dataUserExercise, setDataUserExercise] = useState(null);
  const [error, setError] = useState(null);

  const [selectedOption, setSelectedOption] = useState(["", "", "", "", ""]);

  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [validationAnswer, setValidationAnswer] = useState("");

  const { topicId } = useParams();

  const urlQuiz = `http://localhost:8000/quiz`;
  const user = JSON.parse(localStorage.getItem("user"));

  const handleOptionChange = (event, activeStep) => {
    event.preventDefault();
    const newdata = event.target.value;
    selectedOption[activeStep] = newdata;
    setSelectedOption((prevState) => [...prevState]);
    setValidationAnswer("");
    setWrongAnswer(false);
  };

  useEffect(() => {
    fetch(urlQuiz, {
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
        setDataQuiz(actualData);
        setError(null);
      })
      .catch((err) => {

        setError(err.message);
        setDataQuiz(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    if(activeStep === steps.length-1){
      openModal();
    } else {
      if (quizAnswer === selectedOption[activeStep]) {
        setWrongAnswer(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else if (quizAnswer !== selectedOption[activeStep]) {
        setValidationAnswer("Sorry, it's still wrong!");
        setWrongAnswer(true);
      } else {
        setValidationAnswer("Please select your answer.");
        setWrongAnswer(true);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const themeStyled = createTheme({
    palette: {
      primary: {
        main: "#506CF0",
        light: "#EDF4F7",
        dark: "#A7C0CD",
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: "#FE7860",
        light: "#F5EBFF",
        // dark: will be calculated from palette.secondary.main,
        contrastText: "#47008F",
      },
    },
  });

  const stepperMapping = () => {
    return (
      <Stepper activeStep={activeStep} bgColor={themeStyled.palette.secondary}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step
              key={label}
              {...stepProps}
              bgcolor={themeStyled.palette.secondary}
            >
              <StepLabel
                {...labelProps}
                bgcolor={themeStyled.palette.secondary}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    );
  };

  const arrayDataQuizQuestion = dataQuiz?.data?.filter(
    (questionQuiz) => questionQuiz.TopicId === parseInt(topicId)
  ).length;
  const arrayDataQuizQuestionFinal = dataQuiz?.data?.filter(
    (questionQuiz) => questionQuiz.TopicId === parseInt(topicId)
  );
  // console.log("arrayDataQuizQuestionFinal", arrayDataQuizQuestionFinal)
  // const quizAnswer = dataQuiz?.data[activeStep]?.quiz_answer;
  const quizAnswer = dataQuiz?.data?.filter(
    (questionQuiz) => questionQuiz.TopicId === parseInt(topicId))[activeStep]?.quiz_answer
  // const dataQuizTest = arrayDataQuizQuestionFinal[1].id
  // console.log(arrayDataQuizQuestionFinal[activeStep]?.id, "arrayDataQuizQuestionFinal0");
  // console.log(dataQuizTest, "dataQuizTest");
  const quizQuestionAndOptionsButton = () => {
    return (
      <>
        {activeStep < arrayDataQuizQuestion ? (loading ? <Alert severity="info">A moment please...</Alert> :
          <>
            {/* {console.log(data.data[activeStep].id, "test id")} */}
            {/* <Suspense
              fallback={
                <Skeleton 
                  variant="rectangular"
                  width={210}
                  height={400}
                  animation="wave"
                />
              }
            > */}
            <div
              dangerouslySetInnerHTML={{
                __html: arrayDataQuizQuestionFinal[activeStep].quiz_question,
              }}
              style={{
                fontFamily: "Roboto",
                lineHeight: "24px",
                fontSize: "1.1rem",
                color: "#313131",
              }}
              className="learningQuiz"
            />
            {/* </Suspense> */}
            <FormControl error={wrongAnswer}>
              <RadioGroup
                aria-labelledby="option"
                name="option"
                id={`radioGroup${dataQuiz.data[activeStep].id}`}
                value={selectedOption[activeStep]}
                // error={errors.radioGroup}
                // touched={touched.radioGroup}
                onChange={(event) => handleOptionChange(event, activeStep)}
              // value={selectedOption}
              // checked={id === value}
              >
                <Stack direction="column" spacing={2} marginTop={2}>
                  {arrayDataQuizQuestionFinal[activeStep].QuizOptions.map((option) => (
                    <FormControlLabel
                      key={option.id}
                      value={option.id.toString()}
                      control={<Radio />}
                      label={
                        option.option_text === "testOption" ? (
                          <img
                            src={option.option_image}
                            alt={`Option${option.id}`}
                          />
                        ) : (
                          <Typography>{option.option_text}</Typography>
                        )
                      }
                    />
                  ))}
                </Stack>
              </RadioGroup>
              <FormHelperText>{validationAnswer}</FormHelperText>
              {console.log(selectedOption)}
            </FormControl>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                display: "flex",
                justifyContent: "flex-end",
                pt: 2,
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 2, textTransform: "capitalize" }}
                variant="contained"
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ textTransform: "capitalize" }}
              // disabled={wrongAnswer}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
              <Modal open={isModalOpen} onClose={closeModal}>
                <LearningModal
                  closeModal={() => closeModal()}
                />
              </Modal>
            </Box>
          </>
        ) :
          <Alert severity="info">A moment please...</Alert>
        }
      </>
    );
  };

  return (
    <ThemeProvider theme={themeStyled}>
      <Box sx={{ width: "100%" }}>
        {stepperMapping()}
        {activeStep === steps.length ? (
          <React.Fragment>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <LearningModal />
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Quiz {activeStep + 1}</Typography>
            {quizQuestionAndOptionsButton()}
          </React.Fragment>
        )}
      </Box>
    </ThemeProvider>
  );
}
