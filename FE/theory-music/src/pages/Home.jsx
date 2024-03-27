import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  Input,
  TextField,
  Tabs,
  Tab,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";

import carouselPict1 from "../assets/carouselpict1.png";
import carouselPict2 from "../assets/carouselpict2.png";
import backgroundHero from "../assets/backgroundHero.png";
import logoBottom from "../assets/logoBottom.png";

import "@fontsource/nunito/800.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useOutletContext } from "react-router-dom";

const themeStyled = createTheme({
  palette: {
    primary: {
      main: "#506CF0",
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

function GradeText(text) {
  return (
    <Typography
      color={themeStyled.palette.secondary.main}
      sx={{
        // color: "#506CF0",
        fontFamily: "Lora",
        fontSize: { xs: "1.2rem", sm: "1.7rem" },
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "normal",
        mb: "1.25rem",
        textTransform: "capitalize",
      }}
    >
      {text}
    </Typography>
  );
}

function GradeModules(text) {
  return (
    <Typography
      sx={{
        color: "#313131",
        fontFamily: "Roboto",
        fontSize: { xs: "0.8rem", sm: "1rem" },
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "normal",
      }}
    >
      {text}
    </Typography>
  );
}

function TopicTitle(text) {
  return (
    <Typography
      sx={{
        color: "#313131",
        fontFamily: "Roboto",
        fontSize: { xs: "0.9rem", sm: "1.25rem" },
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "normal",
        mb: 0.8
      }}
    >
      {text}
    </Typography>
  );
}

function TopicDescription(text) {
  return (
    <Typography
      sx={{
        color: "#313131",
        fontFamily: "Roboto",
        fontSize: { xs: "0.9rem", sm: "1.125rem" },
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: { xs: "1rem", sm: "2.25rem" },
        mb: { xs: "0.8rem", sm: "1rem" },
      }}
    >
      {text}
    </Typography>
  );
}

const Home = () => {
  // const [materialGrade1, setMaterialGrade1] = useState(false);
  // const handleClickGrade1 = () => {
  //   setMaterialGrade1(true);
  // };
  // const [materialGrade2, setMaterialGrade2] = useState(false);
  // const handleClickGrade2 = () => {
  //   setMaterialGrade2(true);
  // };

  const [userlogin, setUserlogin, tabValue, setTabValue] = useOutletContext();

  const [clickTabMaterial, setClickTabMaterial] = useState("grade1");

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const navigate = useNavigate()

  const smallScreen = useMediaQuery("(max-width: 820px)");

  return (
    <ThemeProvider theme={themeStyled}>
      <Box
        sx={{
          paddingTop: { xs: 5, md: 20 },
        }}

      >
        {/* HERO */}
        <Box sx={{ position: "relative" }} className="hero">
          <Typography
            color="#FE7860"
            fontFamily="Nunito"
            sx={{
              fontSize: { xs: "2.5rem", md: "5rem" },
              marginBottom: { xs: "2rem", md: "3.25rem" },
              px: { xs: 3, md: 0 }
            }}
            fontWeight="900"
            lineHeight="normal"
            textAlign="center"
          >
            Basic Theory of Music
          </Typography>
          <Typography
            color="#313131"
            textAlign="center"
            fontFamily="Roboto"
            sx={{
              fontSize: { xs: "1rem", md: "1.5rem" },
              lineHeight: { xs: "1.5rem", md: "1rem" },
              px: { xs: 6, md: 0 },
              marginBottom: { xs: "2rem", md: "3.25rem" }
            }}
            fontWeight="500"
            letterSpacing="0.09375rem"
            textTransform="uppercase"
          >
            Learn the concept of music faster and better
          </Typography>
          <Typography
            color="#506CF0"
            textAlign="center"
            fontFamily="Roboto"
            fontSize="1.375rem"
            fontWeight="500"
            sx={{
              fontSize: { xs: "1.1rem", md: "1.375rem" },
              px: { xs: 3, md: 0 }
            }}
          >
            Discover the Melody of Knowledge:
          </Typography>
          <Typography
            color="#313131"
            fontFamily="Roboto"
            fontSize="1.375rem"
            fontWeight="400"
            textAlign="center"
            marginBottom="2rem"
            sx={{
              fontSize: { xs: "0.9rem", md: "1.375rem" },
              pt: { xs: 0.8 },
              px: { xs: 3, md: 0 }
            }}
          >
            Elevate Your Musicality with Learning Theory!
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: { xs: 4, md: 10 },
            }}
          >
            <Button
              variant="contained"
              sx={{
                color: "#F9F9F9",
                fontFamily: "Roboto",
                fontSize: "1rem",
                fontWeight: 400,
                textTransform: "uppercase",
              }}
              onClick={() => { setTabValue("learning"); navigate("/learning") }}
            >
              Learn Now
            </Button>
          </Box>
          <img
            style={{ position: "absolute", top: 0, right: 0, zIndex: -1 }}
            src={backgroundHero}
            alt="Background"
          />
          {/* <Divider sx={{ marginTop: 8 }} /> */}
        </Box>

        {/* CAROUSEL */}
        <Box sx={{ px: { xs: 3, md: 8, lg: 9, xl: 20 }, py: { xs: 5, md: 15 }, bgcolor: "#EDF4F7" }}>
          <Carousel
            stopAutoPlayOnHover={true}
            animation="slide"
            swipe={true}
            indicators={true}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }} className="boxSlider">
              <img src={carouselPict1} alt="Carousel Pict 1" square={false} />
              <Paper
                elevation={0}
                sx={{ marginLeft: { xs: 0, md: "3.75rem" }, bgcolor: "#EDF4F7" }}
              >
                <Typography
                  sx={{
                    color: "#FE7860",
                    fontFamily: "Nunito",
                    fontSize: { xs: "1.5rem", md: "2.25rem" },
                    fontWeight: 900,
                    marginBottom: { xs: "1.5rem", md: "2.5rem" },
                    textAlign: { xs: "center", md: "left" }

                  }}
                >
                  Who is this course for?
                </Typography>
                <Typography
                  align="justify"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: { xs: "0.8rem", md: "1.125rem" },
                    fontWeight: 400,
                    lineHeight: "1.75rem",
                  }}
                >
                  This course is designed for musicians of all levels and
                  background who are eager to deepen their understanding of
                  music and improve their musical skills.
                  <br />
                  Whether you’re a beginner just starting your musical journey
                  or an experienced musician looking to refine tour craft or
                  anyone with a passion for music, this course is tailored to
                  meet your needs.
                  <br />
                  No matter your background or musical goals, this course aims
                  to provide a comprehensive and engaging learning experience,
                  helping you unlock the full potential of your musical talents
                  through the lens of learning theory of music.
                </Typography>
              </Paper>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }} className="boxSlider">
              <Paper
                elevation={0}
                sx={{ marginRight: { xs: 0, md: "3.75rem" }, bgcolor: "#EDF4F7" }}
              >
                <Typography
                  sx={{
                    color: "#FE7860",
                    fontFamily: "Nunito",
                    fontSize: { xs: "1.5rem", md: "2.25rem" },
                    fontWeight: 900,
                    marginBottom: { xs: "1.5rem", md: "2.5rem" },
                    textAlign: { xs: "center", md: "left" }
                  }}
                >
                  What’s in this course?
                </Typography>
                <Typography
                  paragraph={true}
                  align="justify"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: { xs: "0.8rem", md: "1.125rem" },
                    fontWeight: 400,
                    lineHeight: "1.75rem",
                  }}
                >
                  In this comprehensive learning theory music course, learners
                  can expect to enhance their musical understanding and
                  abilities by learning fundamentals of music theory.
                  <br />
                  The course starts with the basics, learning about musical
                  notation, rhythm, pitch,scales, and intervals. The course may
                  include a mix of written materials, interactive exercises, and
                  quizzes to cater to different learning styles.
                  <br />
                  By the end of the course, participants should have a
                  significantly enriched understanding of music theory and a
                  heightened ability to express themselves musically
                </Typography>
              </Paper>
              <img src={carouselPict2} alt="Carousel Pict 2" />
            </Box>
          </Carousel>
        </Box>
        <Divider />

        {/* LEARNING GRADE TOPIC */}
        <Box sx={{ mt: 10, mb: 10 }}>
          <Box sx={{ mb: { xs: 4, md: 8 } }} >
            <Typography
              sx={{
                color: "#FE7860",
                fontFamily: "Nunito",
                fontSize: { xs: "1.5rem", md: "2.75rem" },
                fontWeight: 900,
                textAlign: "center",
                mb: 1.5,
              }}
            >
              What You’ll Learn
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "Roboto",
                fontSize: { xs: "0.8rem", md: "1rem" },
                fontWeight: 400,
                lineHeight: "1rem",
                letterSpacing: "0.09375rem",
                textTransform: "uppercase",
              }}
            >
              Based on the grade
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              justifyContent: "center",
              alignItems: "center",
              mx: { xs: 3, md: 20, xl: 50 },
            }}
          >
            <Box>
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                orientation={smallScreen ? "horizonal" : "vertical"}
                inkbarstyle={{ background: "black" }}
                backgroundColor="secondary"
              >
                <Tab
                  label={
                    <>
                      {GradeText("Grade 1")}
                      {GradeModules("4 Modules")}
                    </>
                  }
                  sx={{
                    width: { xs: "7.1rem", sm: "15rem", md: "18rem" },
                    height: { xs: "6rem", sm: "9rem", md: "12.5rem" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: (clickTabMaterial == "grade1") ? "#EDF4F7" : "#F9F9F9",
                    border: 0.8,
                    borderColor: "#313131",
                    borderRadius: { xs: "1rem 0rem 0rem 0rem", md: "1.75rem 0rem 0rem 1.75rem" },
                  }}
                  onClick={() => {
                    setClickTabMaterial("grade1");
                  }}
                />

                <Tab
                  label={
                    <>
                      {GradeText("Grade 2")}
                      {GradeModules("5 Modules")}
                    </>
                  }
                  sx={{
                    width: { xs: "7.1rem", sm: "15rem", md: "18rem" },
                    height: { xs: "6rem", sm: "9rem", md: "12.5rem" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: (clickTabMaterial == "grade2") ? "#EDF4F7" : "#F9F9F9",
                    border: 1,
                    borderColor: "#313131",
                    borderRadius: { xs: "0rem", md: "1.75rem 0rem 0rem 1.75rem" },
                  }}
                  onClick={() => {
                    setClickTabMaterial("grade2");
                  }}
                />

                <Tab
                  label={
                    <>
                      {GradeText("Grade 3")}
                      {GradeModules("6 Modules")}
                    </>
                  }
                  sx={{
                    width: { xs: "7.1rem", sm: "15rem", md: "18rem" },
                    height: { xs: "6rem", sm: "9rem", md: "12.5rem" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: (clickTabMaterial == "grade3") ? "#EDF4F7" : "#F9F9F9",
                    border: 1,
                    borderColor: "#313131",
                    borderRadius: { xs: "0rem 1rem 0rem 0rem", md: "1.75rem 0rem 0rem 0rem" },
                  }}
                  onClick={() => {
                    setClickTabMaterial("grade3");
                  }}
                />
              </Tabs>
            </Box>
            <Box
              sx={{
                bgcolor: "#F9F9F9",
                px: { xs: 2, lg: 5 },
                pt: { xs: 4, md: 7 },
                width: { xs: "19.2rem", sm: "42.9rem", md: "58.125rem" },
                height: { xs: "20rem", sm: "25rem", md: "33.8rem" },
                overflowX: "hidden",
                overflowY: "scroll",
                borderTop: { md: 1 },
                borderBottom: 1,
                borderLeft: { xs: 1, md: 0 },
                borderRight: 1
              }}
              aria-label="topic"
            >
              {tabIndex === 0 && (
                <>
                  {TopicTitle(
                    "TOPIC 1 - Basics of Notation in Treble and Bass Clef"
                  )}
                  {TopicDescription(
                    <ul style={{
                      margin: 0, paddingInlineStart: "20px"
                    }}>
                      <li>
                        Note values of semibreve, minim, crotchet, quaver and
                        semiquaver, and their equivalent rests (candidates may
                        use the terms ‘whole note’, ‘half note’, etc.). Tied
                        notes. Single dotted notes.
                      </li>
                      <li>
                        The stave. Treble (G) and bass (F) clefs. Names of notes
                        on the stave, including middle C in both clefs. Sharp,
                        flat and natural signs, and their cancellation.
                      </li>
                    </ul>
                  )}

                  {TopicTitle("TOPIC 2 - Simple Time Signatures")}
                  {TopicDescription(
                    "Simple time signatures, bar-lines and the grouping of the notes listed above within these times."
                  )}

                  {TopicTitle("TOPIC 3 - Major Keys and Scales")}
                  {TopicDescription(
                    "Construction of the major scale, including the position of the tones and semitones. Scales and key signatures of the major keys of C, G, D and F in both clefs, with their tonic triads (root position), degrees (number only), and intervals above the tonic (by number only)."
                  )}

                  {TopicTitle("TOPIC 4 - Terms and Signs")}
                  {TopicDescription(
                    "Some frequently used terms and signs concerning tempo, dynamics, performance directions and articulation marks. Simple questions will be asked about a melody written in either treble or bass clef."
                  )}
                </>
              )}
              {tabIndex === 1 && (
                <>
                  {TopicTitle(
                    "TOPIC 1 - Basics of Notation Including Triplets and Triplets Notes Groups"
                  )}
                  {TopicDescription(
                    "Triplets, and triplet note groups with rests."
                  )}

                  {TopicTitle(
                    "TOPIC 2 - Simple Time Signatures and Grouping of Notes and Rests"
                  )}
                  {TopicDescription(
                    "Simple time signatures and the grouping of notes and rests within these times."
                  )}

                  {TopicTitle(
                    "TOPIC 3 - Extension of the Stave Up to Two Leger Lines"
                  )}
                  {TopicDescription(
                    "Extension of the stave to include two ledger lines below and above each stave."
                  )}

                  {TopicTitle("TOPIC 4 - Relative Major and Minor Keys")}
                  {TopicDescription(
                    "Relative major and minor keys. Construction of the minor scale (harmonic only). Scales and key signatures of the major keys of A, B b and E b, and the minor keys of A, E and D, with their tonic triads (root position), degrees (number only), and intervals above the tonic (by number only)."
                  )}
                  {TopicTitle("TOPIC 5 - More Terms and Signs")}
                  {TopicDescription("More terms and signs in common use.")}
                </>
              )}
              {tabIndex === 2 && (
                <>
                  {TopicTitle(
                    "TOPIC 1 - Compound Time Signatures and The Grouping of Notes and Rests"
                  )}
                  {TopicDescription(
                    "Compound time signatures and the grouping of notes and rests within these times."
                  )}

                  {TopicTitle(
                    "TOPIC 2 - The Demisemiquaver (32nd Note) and Its Equivalent Rest"
                  )}
                  {TopicDescription(
                    "The demisemiquaver (32nd note) and its equivalent rest."
                  )}

                  {TopicTitle(
                    "TOPIC 3 - Extension of The Stave Up to Three Ledge Lines"
                  )}
                  {TopicDescription(
                    "Extension of the stave beyond two ledger lines."
                  )}

                  {TopicTitle(
                    "TOPIC 4 - Transposition at the Octave Between Treble and Bass Clefs"
                  )}
                  {TopicDescription(
                    "Transposition at the octave from the treble clef to the bass clef, and vice versa."
                  )}

                  {TopicTitle(
                    "TOPIC 5 - Scales, Key Signatures, and Intervals"
                  )}
                  {TopicDescription(
                    "Scales and key signatures of all major and minor keys up to and including four sharps and flats, including both harmonic and melodic forms of minor scales, with their tonic triads (root position), degrees (number only), and intervals above the tonic (number and type)."
                  )}
                  {TopicTitle("TOPIC 6 - Further Terms and Signs")}
                  {TopicDescription("More terms and signs.")}
                </>
              )}
            </Box>
          </Box>
        </Box>

        {/* Unlock */}
        <Divider />
        <Box
          sx={{
            py: { xs: 5, md: 15 },
            px: { xs: 3, md: 8 },
            bgcolor: "#EDF4F7",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" }
          }}
          className="unlockSection"
        >
          <Paper elevation={0} sx={{ bgcolor: "#EDF4F7", marginRight: { xs: 0, md: 2, xl: 18 } }}>
            <Typography
              sx={{
                color: "#506CF0",
                fontFamily: "Lora",
                fontSize: { xs: "1.3rem", md: "2.5rem" },
                fontWeight: 700,
                marginBottom: { xs: "1rem", md: "2rem" },
                textAlign: "center"
              }}
            >
              Unlock The Secrets of Musical Mastery:
            </Typography>
            <Typography
              display="block"
              sx={{
                color: "#A7C0CD",
                fontFamily: "Lora",
                fontSize: { xs: "1rem", md: "2rem" },
                fontStyle: "normal",
                fontWeight: 100,
                textAlign: "center",
                mb: { xs: 2 }
              }}
            >
              Journey through learning theory and find your rhythm
            </Typography>
          </Paper>
          <img src={logoBottom} alt="Logo" />
        </Box>

        {/* Register */}
        {userlogin ? (
          <></>
        ) : (
          <Box sx={{ my: { xs: 6, md: 10 }, mx: { xs: 3, md: 0 } }}>
            <Box>
              <Typography
                sx={{
                  color: "#313131",
                  fontFamily: "Roboto",
                  fontSize: { xs: "1.5rem", md: "2.5rem" },
                  fontStyle: "normal",
                  fontWeight: 500,
                  textAlign: "center",
                  mb: "1.5rem",
                }}
              >
                Register to learn more
              </Typography>
              <Typography
                sx={{
                  color: "#313131",
                  fontFamily: "Roboto",
                  fontSize: { xs: "0.8rem", md: "1.375rem" },
                  fontWeight: 400,
                  textAlign: "center",
                  mb: { xs: "2rem", md: "4rem" },
                }}
              >
                Enter your email address to take part in our learning journey today.
              </Typography>
            </Box>
            <Box display="flex" sx={{ flexDirection: { xs: "column", sm: "row" } }} justifyContent="center" gap={2}>
              <TextField
                size="small"
                id="outlined-basic"
                placeholder="Input your email"
                variant="outlined"
              />
              <Button
                variant="contained"
                sx={{
                  color: "#F9F9F9",
                  fontFamily: "Roboto",
                  fontSize: "1rem",
                  fontWeight: 400,
                  textTransform: "uppercase",
                }}
                onClick={() => navigate("/register")}
              >
                Learn Now
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Home;
