import styled from "styled-components";
import { NavLink as NavLinks } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

export const Nav = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #ffffff26;
  z-index: 99;
  transition: 0.5s;
  display: ${(props) => props.smNav && "none"};
  display: ${(props) => (props.lgNav ? "none" : "block")};
  z-index: 999;
  padding: 0 1rem;
  @media (max-width: 991px) {
    background: ${(props) => props.theme.gray};
    z-index: 99;
  }
  @media (max-width: 768px) {
    display: ${(props) => props.smNav && "block"};
  }
  background: ${(props) => props.theme.gray};
  position: ${(props) => (props.issticky ? "fixed" : "absolute")};
`;

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.gray};
  @media (max-width: 1200px) {
    max-width: 960px;
    padding: 0px 28px;
  }
`;

export const Logo = styled.div`
  max-width: 20%;
`;

export const LogoImg = styled.img`
  width: 57px;
`;

export const LeftBar = styled.div`
  max-width: 30%;
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;
export const NavLogo = styled(NavLinks)`
  font-size: 45px;
  font-weight: 600;
  color: ${(props) => props.theme.color};
  @media (max-width: 991px) {
    color: #2c51ca !important;
  }
  @media (max-width: 568px) {
    font-size: 22px;
  }
  &&:hover {
    color: ${(props) => props.theme.color};
  }
  /* i {
    color: #0573e7;
  } */
`;

export const RightNav = styled.div`
  width: 80%;
  display: flex;
  justify-content: end;
  align-items: center;
`;
export const MenuIcon = styled.span`
  display: none;

  @media (max-width: 991px) {
    display: block;
    svg {
      font-size: 28px;
      transition: 0.5s;
    }
  }
`;

export const NavbarMenu = styled.ul`
  @media (max-width: 991px) {
    width: 100%;
    position: absolute;
    left: 0;
    top: 100%;
    background: #fff;
    /* height: 260px; */
    height: ${(props) => (props.toggle ? "260px" : "0px")};
    overflow: scroll;
    z-index: 99999999 !important;
    transition: 0.5s;
    li {
      a {
        color: ${(props) => (props.toggle ? "#000" : "#2c51ca")};
      }
    }
  }
`;

export const NavItem = styled.li`
  display: inline-block;
  @media (max-width: 991px) {
    display: block;
  }
  a {
    color: ${(props) => props.theme.color};
    margin-right: 1rem;
    border: ${(props) => `1px solid ${props.theme.color}`};
    padding: 1rem;
    border-radius: 8px;
  }
`;

export const NavLink = styled(HashLink)`
  font-size: 16px;
  margin-left: 2rem;
  font-weight: 400;
  color: ${(props) => (props.issticky ? "#000" : "#2c51ca")};
  @media (max-width: 991px) {
    margin-bottom: 1rem;
    font-weight: 500;
    font-size: large;
  }
`;

export const LargeSearch = styled.div`
  width: 56%;
  /* margin-left: 2%; */
  @media (max-width: 576px) {
  }
`;

export const Form = styled.form`
  position: relative;
`;

export const SmallForm = styled.form`
  position: relative;
  width: 100%;
  display: ${(props) => props.smNav && "none"};
  @media (max-width: 768px) {
    display: ${(props) => props.smNav && "block"};
  }
`;
export const SearchInput = styled.input`
  background: ${(props) => props.theme.gray};

  border: none;
  /* @media (max-width : 558px) {
    visibility: ${(props) => (props.showSearch ? "visible" : "hidden")};
  } */
`;

export const Button = styled.button`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  right: 2%;
  i {
    font-size: 14px;
    margin-right: 1rem;
    color: ${(props) => props.theme.text};
  }
  @media (max-width: 558px) {
    margin-right: 1rem;
  }
`;

export const MyAccount = styled.div`
  width: 38px;
  height: 38px;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 1rem;
`;

export const SmallAccount = styled.div`
  width: 38px;
  height: 38px;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 1rem;
`;

export const UserIcon = styled.i`
  cursor: pointer;
  color: ${(props) => props.theme.text};
`;

export const Icon = styled.i`
  font-size: 26px;
  color: ${(props) => props.theme.text};
`;

export const CreatrAccount = styled(Link)`
  padding: 8px 28px;
  border-radius: 7px;
  border-width: 2px;
  font-size: 18px;
  margin-right: 1rem;
  @media (max-width: 768px) {
    padding: 7px 10px;
    border-radius: 7px;
    border-width: 2px;
    font-size: 13px;
    margin-right: 1rem;
    display: inline-block;
    border: 1px solid #2c51ca;
  }
`;

export const AccountMneu = styled.div``;

export const Ul = styled.ul`
  position: absolute;
  background: ${(props) => props.theme.gray};
  width: 336px;
  height: ${(props) => (props.isToggle ? "300px" : "0")};
  top: 145%;
  border-radius: 5px;
  visibility: ${(props) => (props.isToggle ? "visible" : "hidden")};
  transition: 0.5s;
  overflow-y: scroll;
  scrollbar-width: none;
  z-index: 9;
  right: 0;
`;
export const Li = styled(Link)`
  margin-left: 1rem;
  margin: ${(props) => props.mone}rem;
  font-size: 22px;
  border-bottom: ${(props) => props.bbottom && "1px solid #ddd"};
  padding-bottom: ${(props) => props.bbottom && "1rem"};
  padding: 1rem;
  border-radius: 5px;
  display: block;
  color: ${(props) => props.theme.color};
  &&:hover {
    background: ${(props) => props.theme.gray};
    color: ${(props) => props.theme.color};
  }
`;

export const SearchBar = styled.input`
  width: 100%;
  border: none;
  padding: 6px 27px;
  border-radius: 50px;
  background: ${(props) => props.theme.input};
  color: ${(props) => props.theme.text};
`;

export const Avatar = styled.div`
  overflow: hidden;
  width: 38px;
  height: 38px;
  border-radius: 50%;
`;
export const NavAvatar = styled.img`
  width: 100%;
  cursor: pointer;
`;

export const UserIconn = styled.i`
  color: ${(props) => props.theme.text};
`;

export const NavLarge = styled.div`
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavSm = styled.div`
  display: none;
  height: 50px;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const RightMenu = styled.div`
  width: 50%;
  display: flex;
  justify-content: end;
  align-items: center;
  position: absolute;
  right: 0;
  align-items: center;
`;

export const Icons = styled.div`
  background: ${(props) => (props.theme.dark ? "#43536f" : "#ddd")};
  width: 40px;
  height: 40px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  cursor: pointer;
  position: relative;
`;

export const Iconn = styled.i`
  display: inline-block;
  font-size: 16px;
  color: ${(props) => (props.theme.dark ? "#fff" : "#000")};
`;

export const Count = styled.span`
  position: absolute;
  color: #fff;
  top: 0px;
  right: -5px;
  background: red;
  height: 15px;
  width: 15px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`;

export const HeaderItem = styled.div``;
