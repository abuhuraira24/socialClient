import React, { useContext, useState, useEffect } from "react";

import "../Sidebar/index.scss";

import { AuthContext } from "../../context/auth";

import { NavLink } from "react-router-dom";

import Notification from "../Notifications";

import {
  Nav,
  NavbarContainer,
  NavbarMenu,
  NavItem,
  NavLogo,
  LargeSearch,
  MenuIcon,
  NavLarge,
  Icon,
  SmallAccount,
  Ul,
  Li,
  NavAvatar,
  Avatar,
  UserIconn,
  LeftBar,
  Logo,
  LogoImg,
  RightMenu,
  Icons,
  Iconn,
  Count,
  HeaderItem,
} from "./NavbarElements";

import { gql, useMutation, useQuery } from "@apollo/client";

import logo from "../Navbar/logo.png";

// import socket from "../../hooks/socketio";

import useAvatar from "../../hooks/useAvatar";

import SearchPanel from "../SearchBar";

const Navbar = () => {
  // Theme
  const [dark, setDark] = useState("light");

  const [open, setOpen] = useState(false);

  // Toggler
  const [isToggle, setToggle] = useState(false);

  // Stickey Hader
  const [sticky, setSticky] = useState(false);

  // Toggler Notification
  const [toggleNoti, setToggleNoti] = useState(false);

  // Smal Device Handle
  const [smallDevice, setSmallDevice] = useState(false);

  // Set Notifications
  const [notificationCount, setNotificationCount] = useState([]);

  // Get Notification
  const [notifications, setNotifications] = useState([]);

  const { user, logout, themeMode } = useContext(AuthContext);

  let noti = useQuery(GET_NOTIFICATIONS, {
    onCompleted: (data) => {
      if (data) {
        setNotifications(...notifications, data.notifications);
      }
    },
  });

  let [seenNotification] = useMutation(SEE_NOTIFICATION, {
    onCompleted: (data) => {
      setNotificationCount(data);
    },
  });

  // Query User avata or data

  const { data } = useQuery(GET_USER_PIC);

  useEffect(() => {
    setNotificationCount(data);
  }, [data]);

  const { images } = useAvatar(data);

  const isOpen = () => {
    setOpen(true);
  };
  const isClose = () => {
    setOpen(false);
  };

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

  const isHeaderSticky = () => {
    if (window.scrollY >= 1000) {
      setSticky(true);
    } else if (window.innerWidth < 576) {
      setSmallDevice(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    isHeaderSticky();
  }, []);

  window.addEventListener("scroll", isHeaderSticky);

  const theme = () => {
    if (dark === "light") {
      themeMode("dark");
      setDark("dark");
    } else {
      themeMode("light");
      setDark("light");
    }
  };
  useEffect(() => {
    const isLight = localStorage.getItem("theme");
    setDark(isLight);
    themeMode(isLight);
  }, []);
  return (
    <NavLarge>
      <Nav issticky={sticky.toString()}>
        <NavbarContainer>
          <Logo>
            <NavLogo issticky={sticky.toString()} to="/">
              {/* <LogoImg src={logo} alt="logo" /> */}
              <i class="fa-brands fa-facebook"></i>
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

            <Icons>
              <Count>1</Count>

              <Iconn className="fa-solid fa-message"></Iconn>
            </Icons>
            <HeaderItem>
              <Icons onClick={notificationToggler}>
                {data && data.getUser.readNotification !== 0 ? (
                  <Count> {data.getUser.readNotification} </Count>
                ) : (
                  ""
                )}
                <Iconn className="fa-solid fa-bell"></Iconn>
              </Icons>
              {toggleNoti && <Notification />}
            </HeaderItem>

            {user && (
              <>
                <SmallAccount onClick={toggle}>
                  <Avatar>
                    {images.avatar && (
                      <NavAvatar src={images.avatar} alt="user" />
                    )}

                    {!images.avatar && (
                      <UserIconn className="fa-solid fa-user"></UserIconn>
                    )}
                  </Avatar>

                  <Ul isToggle={isToggle} className="scrollbar-hidden">
                    <Li mone="1" bbottom="true" to={`/profile/${user.id}`}>
                      {user.username}
                    </Li>
                    <Li to="/dashboard">Dashboard</Li>
                    <Li to="/createpost">Create Post</Li>
                    <Li to="/setting">Setting</Li>

                    <Li to="" onClick={logout}>
                      Logout
                    </Li>
                  </Ul>
                </SmallAccount>
              </>
            )}
          </RightMenu>

          <NavbarMenu issticky={sticky} toggle={open}>
            <NavItem>
              {user ? (
                ""
              ) : (
                <div className="navmenue">
                  <NavLink to="/register">Create Account</NavLink>
                  <NavLink to="/login" onClick={logout}>
                    {" "}
                    Login{" "}
                  </NavLink>
                </div>
              )}
            </NavItem>
          </NavbarMenu>
        </NavbarContainer>
      </Nav>
    </NavLarge>
  );
};

const GET_USER_PIC = gql`
  query {
    getUser {
      avatar
      cover
      readNotification
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
