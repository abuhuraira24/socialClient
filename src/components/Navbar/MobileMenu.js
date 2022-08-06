import { useContext } from "react";

import { Icon, Main, NavWrapper } from "./mobile";

import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth";

const MobileMenu = () => {
  // Get Notification
  const { user } = useContext(AuthContext);

  return (
    <NavWrapper>
      <Main>
        <NavLink to="/">
          <Icon className="fa-solid fa-house-chimney"></Icon>
        </NavLink>
        <NavLink to="/friends">
          <Icon className="fa-solid fa-user-group"></Icon>
        </NavLink>
        <NavLink to="/">
          <Icon className="fa-brands fa-facebook-messenger"></Icon>
        </NavLink>
        <NavLink to="/notifications">
          <Icon className="fa-solid fa-bell"></Icon>
        </NavLink>
        <NavLink to={`/profile/${user.id}`}>
          <Icon className="fa-solid fa-circle-user"></Icon>
        </NavLink>
      </Main>
    </NavWrapper>
  );
};

export default MobileMenu;
