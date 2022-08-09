import styled from "styled-components";

import { Link } from "react-router-dom";

export const SearchWrapper = styled.div`
  margin-top: 4rem;
  background: ${(props) => props.theme.bg};
  padding-top: 3rem;
  @media (max-width: 558px) {
    margin-top: 1rem !important;
  }
`;

export const Menu = styled.div``;

export const Navlink = styled(Link)``;

export const Users = styled.div`
  display: flex;
`;

export const UserPic = styled.div`
  background: #ddd;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-right: 1rem;
  svg {
    height: 21px;
  }
`;

export const UserName = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 40px;
  color: ${(props) => props.theme.color};
`;

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  background: ${(props) => props.theme.gray};
`;

export const CardTitle = styled.div`
  font-weight: 700;
  font-size: 30px;
  a {
    color: ${(props) => props.theme.color};
  }
`;

export const CartText = styled.p`
  color: ${(props) => props.theme.color};
`;

export const CartBody = styled.div`
  flex: 1 1 auto;
  padding: 1rem 1rem;
`;

export const NotFound = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 6rem;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 34px;
  color: ${(props) => props.theme.text};
  @media (max-width: 558px) {
    font-size: 23px;
  }
`;

export const Wraper = styled.div`
  background: ${(props) => props.theme.gray};
  padding: 1rem;
  display: flex;
  margin-bottom: 1rem;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const Left = styled.div`
  margin-right: 1rem;
  display: flex;
`;

export const PeopleName = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  margin-left: 1rem;
`;

export const Right = styled.div``;

export const Image = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  a {
    width: 100%;
    height: 100%;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export const Name = styled.h5`
  color: ${(props) => props.theme.text};
  font-weight: 700;
`;

export const Span = styled.span`
  color: ${(props) => props.theme.text};
  font-size: 14px;
  font-weight: 600;
`;

export const MenuWrapper = styled.div``;

export const Ul = styled.ul``;

export const Li = styled.li`
  background: ${(props) =>
    props.active === "true" ? props.theme.link : props.theme.gray};
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 10px;
  color: ${(props) => (props.active === "true" ? "#fff" : props.theme.text)};
  @media (max-width: 558px) {
    display: inline-block;
    margin-right: 1rem;
  }
`;

export const Icon = styled.i`
  margin-right: 0.8rem;
`;

export const Follow = styled.span`
  cursor: pointer;
`;
