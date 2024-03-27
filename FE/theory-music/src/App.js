import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Learning from "./pages/Learning";
import Exercise from "./pages/Exercise";
import React from "react";
import Profile from "./pages/Profile";
import LearningTopic from "./pages/LearningTopic";
import "./App.css";
import ExerciseGrade from "./pages/ExerciseGrade";
import { Typography } from "@mui/material";
import ChangePassword from "./pages/ChangePassword";

const Layout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const pathLocationValue = useLocation().pathname.split("/")[1];
  const [userlogin, setUserlogin] = React.useState(user);
  const [tabValue, setTabValue] = React.useState(pathLocationValue);
  // console.log(`layout ${useLocation().pathname.split("/")[1]}`);
  const [profileName, setProfileName] = React.useState("student");

  return (
    <div className="Layout">
      <Navbar
        userlogin={userlogin}
        setUserlogin={setUserlogin}
        tabValue={tabValue}
        setTabValue={setTabValue}
        profileName={profileName}
        setProfileName={setProfileName}
      />
      <Outlet context={[userlogin, setUserlogin, tabValue, setTabValue]} />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/learning",
        element: <Learning />,
      },
      {
        path: "/learning/topic/:topicId",
        element: <LearningTopic />,
      },
      {
        path: "/exercise",
        element: <Exercise />,
      },
      {
        path: `/exercise/grade/:gradeExercise`,
        element: <ExerciseGrade />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/changePassword",
        element: <ChangePassword />
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <Typography sx={{position: "fixed", top: "50%"}}>Not Found</Typography>,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
