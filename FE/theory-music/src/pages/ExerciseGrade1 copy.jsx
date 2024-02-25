import { Alert, Box, Button, Divider, FormControl, FormControlLabel, Modal, Radio, RadioGroup, Skeleton, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExerciseScoreFail from "../components/ExerciseScoreFail";
import ExerciseScorePass from "../components/ExerciseScorePass";
import ExerciseSubmitModal from "../components/ExerciseSubmitModal";
import PreviewAnswer from "../components/PreviewAnswer";

const steps = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"];

const ExerciseGrade1 = () => {
  const { gradeExercise } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showExerciseScoreComponent, setShowExerciseScoreComponent] = useState(false);

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

  const handleOptionChange = (event, activeStep) => {
    event.preventDefault();
    const newdata = event.target.value;
    selectedOption[activeStep] = newdata;
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

  // useEffect(() => {}, [handleSubmitModal]);

  const stepperMapping = () => {
    return (
      <>
        <Stepper
          sx={{ mb: 5 }}
          activeStep={activeStep}
        // bgColor={themeStyled.palette.secondary}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step
                key={label}
                {...stepProps}
              //   bgcolor={themeStyled.palette.secondary}
              >
                <StepLabel
                  {...labelProps}
                // bgcolor={themeStyled.palette.secondary}
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

  const arrayDataExerciseQuestionLength = data?.data?.filter(
    (questionGrade) => questionGrade.grade_exercise === gradeExercise
  ).length;
  const dataExerciseAnswer = data?.data?.filter(
    (questionGrade) => questionGrade.grade_exercise === gradeExercise
  )[activeStep]?.exercise_answer;

  const arrayDataExerciseQuestion = data?.data?.filter(
    (questionGrade) => questionGrade.grade_exercise === gradeExercise
  );

  const exerciseQuestionAndOptionsButton = () => {
    return (
      <>
        {activeStep < arrayDataExerciseQuestionLength ? (
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
              />
            )}

            {/* </Suspense> */}
            <FormControl>
              <RadioGroup
                aria-labelledby="option"
                name="option"
                id={`radioGroup${arrayDataExerciseQuestion[activeStep].id}`}
                value={selectedOption[activeStep]}
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

  const [showPreviewAnswer, setShowPreviewAnswer] = useState(false)

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
  const handleSubmitModal = () => {
    // mapping exercise, cocokkan sama selectedOption
    const arrayDataExerciseCorrectAnswer = data?.data
      ?.filter(
        (questionGrade1) => questionGrade1.grade_exercise === gradeExercise
      )
      .map((exerciseId) => exerciseId.exercise_answer);

    let score = 0;
    selectedOption.forEach((val, idx) => {
      if (val === arrayDataExerciseCorrectAnswer[idx]) {
        score = score + 1;
      }
    });
    setUserScore(score);
   
    closeModal();
    setShowExerciseScoreComponent(true);
    afterSubmit(score);
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

  const questionExercisePerNumber = (index) => {
    return <div
      dangerouslySetInnerHTML={{
        __html: data.data[index].exercise_question,
      }}
      style={{
        fontFamily: "Roboto",
        lineHeight: "24px",
        fontSize: "1.1rem",
        color: "#313131",
      }}
    />
  }

  const exerciseCorrectAnswer = (index) => {
    const dataExerciseCorrectAnswer = data?.data?.filter(
      (questionGrade1) => questionGrade1.grade_exercise === gradeExercise
    )[index]?.exercise_answer;
    const correctOption = data?.data[index]?.ExerciseOptions.filter((option) => (
      option.id.toString() === dataExerciseCorrectAnswer))[0]
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

  const exerciseUserAnswer = (index) => {
    const userSelectedOption = data?.data[index]?.ExerciseOptions.filter((option) => (
      option.id.toString() === selectedOption[index]))[0]
    const userSelectedOptionText = userSelectedOption?.option_text
    const userSelectedOptionImage = userSelectedOption?.option_image
    return <>
      {
        userSelectedOptionText === "testOption" ? (
          <div>
            <img
              src={userSelectedOptionImage}
              alt={`Option${userSelectedOption?.id}`}
            />
          </div>
        ) : (
          <Typography>{userSelectedOptionText}</Typography>
        )
      }
    </>
  }

  const [wrongAnswer, setWrongAnswer] = useState(true)

  const checkAnswer = (index) => {
    const dataExerciseCorrectAnswer = data?.data?.filter(
      (questionGrade1) => questionGrade1.grade_exercise === gradeExercise
    )[index]?.exercise_answer;
    const userSelectedOption = data?.data[index]?.ExerciseOptions.filter((option) => (
      option.id.toString() === selectedOption[index]))[0]?.id

    if (dataExerciseCorrectAnswer.toString() === userSelectedOption.toString()) {
      setWrongAnswer(false)
      return <p style={{ color: "#22bb33" }}>Correct</p>
    } else {
      setWrongAnswer(true)
      return <p style={{ color: "#bb2124" }}>Wrong</p>
    }
  }


  const previewAnswerHandle = () => {
    return <>
      {Array.from({ length: arrayDataExerciseQuestionLength }, (_, i) => (
        <PreviewAnswer key={i} questionNumber={`${i + 1}`} questionExercisePerNumber={questionExercisePerNumber(i)} exerciseCorrectAnswer={exerciseCorrectAnswer(i)} userAnswer={exerciseUserAnswer(i)}
        // wrongAnswer={checkAnswer(i)} 
        />
      ))}
    </>
  }

  return (
    <>
      <Stack sx={{ my: 15, mx: 4 }}>
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
        <Box sx={{ px: 4, m: 4 }}>
          {stepperMapping()}
          {showExerciseScoreComponent
            ? exerciseScoring()
            : exerciseQuestionAndOptionsButton()}
        </Box>
        {showPreviewAnswer === true ?
          <>
            <Divider />
            <Box sx={{ px: 4, mt: 4 }}>
              <Typography>Preview Answer</Typography>
              {previewAnswerHandle()}
            </Box>
          </>
          :
          <></>}
      </Stack>
    </>
  );
};

export default ExerciseGrade1;
