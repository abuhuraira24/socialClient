import "./App.css";

import NavBar from "./components/Navbar/NavBar";

import Register from "./components/Register/Register";

import { useState, useEffect, useContext } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";

import Login from "./components/Login/Login";

import PublicRouter from "./hooks/PublicRouter";

import { AuthProvider } from "./context/auth";

import QueryPage from "./components/SearchPage/QueryPage";

import People from "./components/People";

import PostDetails from "./components/PostDetails";

import SmallNavbar from "./components/Navbar/SmallNavbar";

import Profile from "./components/Profile/Profile";

import PrivatRouter from "./hooks/PrivetRouter";

import decoder from "jwt-decode";

import CheckMail from "./components/Email/CheckMail";
import ConfirmAccount from "./components/Email/ConfirmAccount";
import NotFound from "./components/Email/NotFound/NotFound";
import Forgot from "./components/ForgotPassword";
import SuccessMail from "./components/ForgotPassword/SuccessMail";
import SetNewPassword from "./components/ForgotPassword/SetPassword";

import Theme from "./components/Theme/Theme";

import Follower from "./components/Home/Followers";

import Notification from "./components/Notifications";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    let toke = localStorage.getItem("jwtToken");
    if (toke) {
      let decoded = decoder(toke);
      setUser(decoded);
    }
  }, []);

  return (
    <AuthProvider>
      <Theme>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PrivatRouter rediredct="/login">
                  <Home />
                </PrivatRouter>
              }
            />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/search" element={<QueryPage />} />
            <Route path="/search/people" element={<People />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/search/post/:id" element={<PostDetails />} />
            <Route path="/verify/" element={<CheckMail />} />
            <Route path="/confirm/:text" element={<ConfirmAccount />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/successmail" element={<SuccessMail />} />
            <Route path="/friends" element={<Follower />} />
            <Route path="/notifications" element={<Notification />} />
            <Route
              path="/recovery_password/:token"
              element={<SetNewPassword />}
            />
            <Route
              path="/register"
              element={
                <PublicRouter rediredct="/">
                  <Register />
                </PublicRouter>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRouter rediredct="/">
                  <Login />
                </PublicRouter>
              }
            />
          </Routes>
          {/* <MobileMenu /> */}
        </Router>
      </Theme>
    </AuthProvider>
  );
}

export default App;
