import { Alert, Box, Button, Divider, FormControl, FormControlLabel, Modal, Radio, RadioGroup, Skeleton, Stack, Step, StepLabel, Stepper, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExerciseScoreFail from "../components/ExerciseScoreFail";
import ExerciseScorePass from "../components/ExerciseScorePass";
import ExerciseSubmitModal from "../components/ExerciseSubmitModal";
import PreviewAnswer from "../components/PreviewAnswer";

const steps = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"];

const ExerciseGrade = () => {
  const { gradeExercise } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showExerciseScoreComponent, setShowExerciseScoreComponent] = useState(false);
  const [showPreviewAnswer, setShowPreviewAnswer] = useState(false)

  const [selectedOption, setSelectedOption] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [userScore, setUserScore] = useState(0);

  const [previewAnswerData, setPreviewAnswerData] = useState([])

  // const url = `${env.BASE_URL_BACKEND}login`;
  const urlExercise = `http://localhost:8000/exercise`;
  const urlUserExercise = `http://localhost:8000/userExercise`;
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = localStorage.getItem("userId");

  useEffect(() => {
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
      .then((actualData) => {
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
  }, []);

  // console.log(data?.data.filter(data => data.grade_exercise === "2"))

  const arrayDataExerciseQuestionLength = data?.data?.filter(
    (questionGrade) => questionGrade.grade_exercise === gradeExercise
  ).length;
  const dataExerciseAnswer = data?.data?.filter(
    (questionGrade) => questionGrade.grade_exercise === gradeExercise
  )[activeStep]?.exercise_answer;

  const arrayDataExerciseQuestion = data?.data?.filter(
    (questionGrade) => questionGrade.grade_exercise === gradeExercise
  );

  const handleOptionChange = (event, activeStep) => {
    event.preventDefault();
    const newValue =
    {
      questionId: arrayDataExerciseQuestion[activeStep].id,
      yourAnswer: event.target.value
    }
      ;
    selectedOption[activeStep] = newValue;
    setSelectedOption((prevState) => [...prevState]);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const handleNext = (event) => {
    event.preventDefault();
    if (activeStep === steps.length - 1) {
      openModal();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = (event) => {
    event.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepperMapping = () => {
    return (
      <>
        <Stepper
          sx={{ mb: 5 }}
          activeStep={activeStep}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step
                key={label}
                {...stepProps}
              >
                <StepLabel
                  {...labelProps}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </>
    );
  };

  const handleSubmitModal = () => {
    // mapping exercise, cocokkan sama selectedOption
    const arrayDataExerciseCorrectAnswer = data?.data
      ?.filter(
        (questionGrade1) => questionGrade1.grade_exercise === gradeExercise
      )
      .map((exerciseId) => exerciseId.exercise_answer);

    let score = 0;
    selectedOption.forEach((val, idx) => {
      if (val.yourAnswer === arrayDataExerciseCorrectAnswer[idx]) {
        score = score + 1;
      }
    });
    setUserScore(score);

    closeModal();
    setShowExerciseScoreComponent(true);
    afterSubmit(score);

    const previewAnswerArray = arrayDataExerciseQuestion.map(data => {
      const checkAnswer = selectedOption.find(data1 => data1?.questionId === data.id)

      return { ...data, ...{ userAnswer: checkAnswer?.yourAnswer, isCorrection: checkAnswer?.yourAnswer === data?.exercise_answer } }
    })

    setPreviewAnswerData(previewAnswerArray)
    console.log(arrayDataExerciseCorrectAnswer, "arrayDataExerciseCorrectAnswer")
  };

  const afterSubmit = (userScore) => {
    fetch(urlUserExercise, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({
        exercise_id_post: parseInt(gradeExercise),
        user_id_post: parseInt(userId),
        exercise_score_post: userScore,
        exercise_status_post: "done",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log(data));
  };

  const exerciseQuestionAndOptionsButton = () => {
    return (
      <>
        {activeStep < arrayDataExerciseQuestionLength ? (
          <>
            {loading ? (
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={"100%"}
                animation="wave"
              />
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: arrayDataExerciseQuestion[activeStep].exercise_question,
                }}
                style={{
                  fontFamily: "Roboto",
                  lineHeight: "24px",
                  fontSize: "1.1rem",
                  color: "#313131",
                }}
                className="exercise"
              />
            )}

            <FormControl>
              <RadioGroup
                aria-labelledby="option"
                name="option"
                id={`radioGroup${arrayDataExerciseQuestion[activeStep].id}`}
                value={selectedOption[activeStep].yourAnswer}
                // error={errors.radioGroup}
                // touched={touched.radioGroup}
                onChange={(event) => handleOptionChange(event, activeStep)}
              // value={selectedOption}
              // checked={id === value}
              >
                <Stack direction="column" spacing={2} marginTop={2}>
                  {arrayDataExerciseQuestion[activeStep].ExerciseOptions.map((option) => (
                    <FormControlLabel
                      key={option.id}
                      value={option.id.toString()}
                      control={<Radio />}
                      label={
                        option.option_text === "testOption" ? (
                          <img
                            src={option.option_image}
                            alt={`Option${option.id}`}
                            style={{ height: "100%", width: "100%" }}
                          />
                        ) : (
                          <Typography>{option.option_text}</Typography>
                        )
                      }
                    />
                  ))}
                </Stack>
              </RadioGroup>
              {/* {console.log(selectedOption)} */}
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
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
              <Modal open={isModalOpen} onClose={closeModal}>
                <ExerciseSubmitModal
                  closeModal={() => closeModal()}
                  handleSubmitModal={() => handleSubmitModal()}
                />
              </Modal>
              {/* {console.log(userScore, "userScoreFinal")} */}
            </Box>
          </>
        ) : activeStep === steps.length ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>test</Box>
        ) : (
          <Alert severity="info">A moment please...</Alert>
        )}
      </>
    );
  };

  // console.log(userScore, "userScore")

  const exerciseScoring = () => {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        {userScore >= 7 ? (
          <ExerciseScorePass userScore={userScore} setShowPreviewAnswer={setShowPreviewAnswer} />
        ) : (
          <ExerciseScoreFail userScore={userScore} />
        )}
      </Box>
    );
  };

  console.log(previewAnswerData, "previewAnswerData")

  const questionExercisePerNumber = (questionData) => {
    return <div
      dangerouslySetInnerHTML={{
        __html: questionData,
      }}
      style={{
        fontFamily: "Roboto",
        lineHeight: "24px",
        fontSize: "1.1rem",
        color: "#313131",
      }}
    />
  }

  const exerciseCorrectAnswer = (optionData) => {
    const correctOption = optionData.ExerciseOptions.filter((option) => (
      option.id.toString() === optionData.exercise_answer))[0]
    const correctOptionText = correctOption?.option_text
    const correctOptionImage = correctOption?.option_image
    return <>
      {
        correctOptionText === "testOption" ? (
          <div>
            <img
              src={correctOptionImage}
              alt={`Option${correctOption?.id}`}
            />
          </div>
        ) : (
          <Typography>{correctOptionText}</Typography>
        )
      }
    </>
  }

  const exerciseUserAnswer = (optionData) => {
    const userAnswer = optionData.ExerciseOptions.filter((option) => (
      option.id.toString() === optionData.userAnswer))[0]
    const userAnswerOptionText = userAnswer === undefined ? "-" : userAnswer?.option_text
    const userAnswerOptionImage = userAnswer === undefined ? "-" : userAnswer?.option_image
    return <>
      {
        userAnswerOptionText === "testOption" ? (
          <div>
            <img
              src={userAnswerOptionImage}
              alt={`Option${userAnswer?.id}`}
            />
          </div>
        ) : (
          <Typography>{userAnswerOptionText}</Typography>
        )
      }
    </>
  }

  const previewAnswerHandle = () => {
    return <>
      {previewAnswerData.map(data => {
        return <PreviewAnswer isCorrection={data.isCorrection} questionExercisePerNumber={questionExercisePerNumber(data.exercise_question)} exerciseCorrectAnswer={exerciseCorrectAnswer(data)} exerciseUserAnswer={exerciseUserAnswer(data)} />
      })}
      {/* {Array.from({length: arrayDataExerciseQuestionLength}, (_,i) => (
        <PreviewAnswer key={i} />
      ))} */}
    </>
  }

  const smallScreen = useMediaQuery("(max-width: 767px)");

  return (
    <>
      <Box sx={{
        width: { xs: "100vw", xl: "2000px" },
        display: { xl: "flex" },
        justifyContent: { xl: "center" },
        alignItems: { xl: "center" },
      }}>
        <Stack sx={{ my: 5, mx: 4, }}>
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
            Grade {gradeExercise}
          </Box>
          <Box sx={{ mt: 2, pl: 1, px: { md: 4 }, m: { md: 4 } }}>
            {smallScreen ?
              <Typography sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                Quiz No.{activeStep + 1}
              </Typography>
              :
              stepperMapping()
            }
            {showExerciseScoreComponent
              ? exerciseScoring()
              : exerciseQuestionAndOptionsButton()}
          </Box>
          {showPreviewAnswer === true ?
            <>
              <Divider />
              <Box sx={{ mt: 4 }}>
                <Typography>Preview Answer</Typography>
                {previewAnswerHandle()}
              </Box>
            </>
            :
            <></>
          }
        </Stack>
      </Box>
    </>
  );
};

export default ExerciseGrade;