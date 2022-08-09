import "./App.css";

import Register from "./components/Register/Register";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";

import Login from "./components/Login/Login";

import PublicRouter from "./hooks/PublicRouter";

import { AuthProvider } from "./context/auth";

import QueryPage from "./components/SearchPage/QueryPage";

import People from "./components/People";

import PostDetails from "./components/PostDetails";

import Profile from "./components/Profile/Profile";

import PrivatRouter from "./hooks/PrivetRouter";

import CheckMail from "./components/Email/CheckMail";

import ConfirmAccount from "./components/Email/ConfirmAccount";

import NotFound from "./components/Email/NotFound/NotFound";

import Forgot from "./components/ForgotPassword";

import SuccessMail from "./components/ForgotPassword/SuccessMail";

import SetNewPassword from "./components/ForgotPassword/SetPassword";

import Theme from "./components/Theme/Theme";

import Follower from "./components/Home/Followers";

import Notification from "./components/Notifications";

import { socket } from "./hooks/socketio";

import { useEffect } from "react";
import jwtDecode from "jwt-decode";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const user = jwtDecode(token);
      socket.emit("join", { userId: user.id });
    }
  });

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
            <Route
              path="/profile/:id"
              element={
                <PrivatRouter rediredct="/login">
                  <Profile />
                </PrivatRouter>
              }
            />
            <Route path="/search/:text" element={<QueryPage />} />
            <Route path="/search/people" element={<People />} />
            <Route
              path="/post/:id"
              element={
                <PrivatRouter rediredct="/login">
                  <PostDetails />
                </PrivatRouter>
              }
            />
            <Route path="/search/post/:id" element={<PostDetails />} />
            <Route path="/verify/" element={<CheckMail />} />
            <Route path="/confirm/:text" element={<ConfirmAccount />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/successmail" element={<SuccessMail />} />
            <Route
              path="/friends"
              element={
                <PrivatRouter rediredct="/login">
                  <Follower />
                </PrivatRouter>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivatRouter rediredct="/login">
                  <Notification />
                </PrivatRouter>
              }
            />
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
