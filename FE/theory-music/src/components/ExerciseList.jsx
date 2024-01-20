import React from 'react'
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import logo from "../assets/logoTreble.png";
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

export default function ExerciseList({ uniquesValues, gradeExerciseList, detailExerciseListArray, userLastScoreGrade1, userLastScoreGrade2, userLastScoreGrade3 }) {
    const { gradeExercise } = useParams()
    const [userLogin, setUserLogin, tabValue, setTabValue] = useOutletContext();
    const navigate = useNavigate();

    return (
        <Grid container>
            <Grid item sm={12} md={6} lg={3}>
                <Box
                    sx={{
                        bgcolor: "none",
                        width: "19.375rem",
                        height: "auto",
                        borderRadius: "0.3rem",
                        border: "1px solid  #313131",
                        ml: 2
                    }}
                >
                    <Stack
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "left",
                            bgcolor: "#EDF4F7",
                            borderRadius: "0.3rem",
                            p: 2
                        }}
                    >
                        <Typography sx={{ fontSize: "1.25rem" }}>
                            Grade {gradeExerciseList}
                        </Typography>
                    </Stack>
                    <Stack sx={{ p: 2 }}>
                        <Typography
                            sx={{ mt: 0.25, fontFamily: "Roboto", fontSize: "0.875rem" }}
                        >
                            {detailExerciseListArray}
                        </Typography>
                        {
                            gradeExerciseList === "1" ?
                                <Typography
                                    sx={{ mt: 1, mb: 2, color: "#666", fontSize: "0.875rem " }}
                                >
                                    Score: {userLastScoreGrade1} / 10
                                </Typography> :
                                gradeExerciseList === "2" ?
                                    <Typography
                                        sx={{ mt: 1, mb: 2, color: "#666", fontSize: "0.875rem " }}
                                    >
                                        Score: {userLastScoreGrade2} / 10
                                    </Typography> :
                                    <Typography
                                        sx={{ mt: 1, mb: 2, color: "#666", fontSize: "0.875rem " }}
                                    >
                                        Score: {userLastScoreGrade3} / 10
                                    </Typography>
                        }
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => {
                                setTabValue("exercise");
                                navigate(`/exercise/grade/${gradeExerciseList}`);
                            }}
                            sx={{
                                textTransform: "capitalize",
                                fontFamily: "Roboto",
                                fontSize: "1rem",
                                lineHeight: "1.8rem",
                            }}
                        >
                            Practice
                        </Button>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    )
}
