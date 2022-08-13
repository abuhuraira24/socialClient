/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";

import "../Sidebar/index.scss";

import { AuthContext } from "../../context/auth";

import Notification from "../Notifications";

import {
  Nav,
  NavbarContainer,
  NavLogo,
  LargeSearch,
  NavLarge,
  SmallAccount,
  Ul,
  Li,
  NavAvatar,
  Avatar,
  UserIconn,
  LeftBar,
  Logo,
  RightMenu,
  Icons,
  Iconn,
  Count,
  HeaderItem,
} from "./NavbarElements";

import { gql, useMutation, useQuery } from "@apollo/client";

// import socket from "../../hooks/socketio";

import SearchPanel from "../SearchBar";

import { socket } from "../../hooks/socketio";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Theme
  const [dark, setDark] = useState("light");

  // Toggler
  const [isToggle, setToggle] = useState(false);

  // Get user Data
  const [userInfo, setUserInfo] = useState([]);

  // Stickey Hader
  const [sticky, setSticky] = useState(false);

  // Toggler Notification
  const [toggleNoti, setToggleNoti] = useState(false);

  const [message, setMessage] = useState(false);

  // Get Notification
  const [notifications, setNotifications] = useState([]);

  const { user, logout, themeMode, isDark, openInbox } =
    useContext(AuthContext);

  useQuery(GET_NOTIFICATIONS, {
    onCompleted: (data) => {
      if (data) {
        setNotifications(...notifications, data.notifications);
      }
    },
  });

  let [seenNotification] = useMutation(SEE_NOTIFICATION);

  // Query User avata or data
  useQuery(GET_AVATAE_BY_ID, {
    onCompleted: (data) => {
      setUserInfo(data.getUserById);
    },
    variables: { userId: user.id },
    onError(err) {
      console.log(err);
    },
  });

  // User account Toggler
  const toggle = () => {
    if (isToggle) {
      setToggle(false);
    } else {
      setToggle(true);
      setToggleNoti(false);
    }
  };

  // Notification Toggler

  const notificationToggler = () => {
    if (toggleNoti) {
      setToggleNoti(false);
    } else {
      setToggleNoti(true);
      setToggle(false);
    }
    seenNotification();
  };

  // Messsage Toggler
  const messageToggler = () => {
    if (message) {
      setMessage(false);
    } else {
      setMessage(true);
    }
  };

  const isHeaderSticky = () => {
    if (window.scrollY >= 1000) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    isHeaderSticky();
  }, []);

  window.addEventListener("scroll", isHeaderSticky);

  const theme = () => {
    setToggleNoti(false);
    setToggle(false);
    if (dark === "dark") {
      localStorage.setItem("theme", "light");
      setDark("light");
      themeMode();
    } else {
      localStorage.setItem("theme", "dark");
      setDark("dark");
      themeMode();
    }
  };

  useEffect(() => {
    setDark(isDark);
  }, []);

  useEffect(() => {
    themeMode();
  }, []);

  useEffect(() => {
    socket.on("getUsers", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <NavLarge>
      <Nav issticky={sticky.toString()}>
        <NavbarContainer>
          <Logo>
            <NavLogo issticky={sticky.toString()} to="/">
              <i className="fa-solid fa-earth-americas"></i>
            </NavLogo>
          </Logo>

          <LeftBar>
            <LargeSearch>
              <SearchPanel />
            </LargeSearch>
          </LeftBar>

          <RightMenu>
            {dark === "dark" ? (
              <Icons onClick={theme}>
                <Iconn className="fa-solid fa-sun"></Iconn>
              </Icons>
            ) : (
              <Icons onClick={theme}>
                <Iconn className="fa-solid fa-moon"></Iconn>
              </Icons>
            )}

            <HeaderItem>
              {/* <Link to="/messanger">
                <Icons>
                  <Iconn className="fa-solid fa-message"></Iconn>
                </Icons>
              </Link> */}

              {/* {message && <Conversations />} */}
            </HeaderItem>

            <HeaderItem>
              <Icons onClick={notificationToggler}>
                <Iconn className="fa-solid fa-bell"></Iconn>
              </Icons>
              {toggleNoti && <Notification />}
            </HeaderItem>

            {user && (
              <>
                <SmallAccount onClick={toggle}>
                  <Avatar>
                    {userInfo.length !== 0 && (
                      <NavAvatar src={userInfo.avatars[0].avatar} alt="user" />
                    )}

                    {/* {!userInfo.avatars[0] && (
                      <UserIconn className="fa-solid fa-user"></UserIconn>
                    )} */}
                  </Avatar>

                  <Ul isToggle={isToggle} className="scrollbar-hidden">
                    <Li mone="1" bbottom="true" to={`/profile/${user.id}`}>
                      {user.username}
                    </Li>
                    {/* <Li to="/dashboard">Dashboard</Li>
                    <Li to="/createpost">Create Post</Li>
                    <Li to="/setting">Setting</Li> */}

                    <Li to="" onClick={logout}>
                      Logout
                    </Li>
                  </Ul>
                </SmallAccount>
              </>
            )}
          </RightMenu>
        </NavbarContainer>
      </Nav>
    </NavLarge>
  );
};

const GET_AVATAE_BY_ID = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      avatars {
        avatar
      }
    }
  }
`;

const GET_NOTIFICATIONS = gql`
  query {
    notifications {
      name
      text
      avatar
      createdAt
    }
  }
`;

const SEE_NOTIFICATION = gql`
  mutation {
    seenNotifications {
      avatar
      readNotification
    }
  }
`;

export default Navbar;
