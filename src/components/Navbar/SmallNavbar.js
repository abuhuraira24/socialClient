import React, { useContext, useState, useEffect } from "react";

import "../Sidebar/index.scss";

import { AuthContext } from "../../context/auth";

import {
  Nav,
  NavbarContainer,
  CreatrAccount,
  NavLogo,
  NavSm,
  AccountMneu,
  Logo,
  RightNav,
} from "./NavbarElements";
import MobileMenu from "./MobileMenu";

const SmallNavbar = () => {


  const [sticky, setSticky] = useState(false);



  const { user } = useContext(AuthContext);




  const isHeaderSticky = () => {
    if (window.scrollY >= 1000) {
      setSticky(true);
    }  else {
      setSticky(false);
    }
  };
  useEffect(() => {
    isHeaderSticky();
  }, []);

  window.addEventListener("scroll", isHeaderSticky);


  return (
    <NavSm>
      <Nav issticky={sticky.toString()}>
        <NavbarContainer>
          <Logo>
            <NavLogo issticky={sticky.toString()} to="/"></NavLogo>
          </Logo>
          <RightNav>
            {user ? (
              <AccountMneu></AccountMneu>
            ) : (
              <>
                <CreatrAccount to="/register">Create Account</CreatrAccount>
              </>
            )}
           
          </RightNav>
        </NavbarContainer>

        <MobileMenu />
      </Nav>
    </NavSm>
  );
};

export default SmallNavbar;
