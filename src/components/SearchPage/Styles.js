import styled from "styled-components";

import { Link } from "react-router-dom";

export const SearchWrapper = styled.div`
  margin-top: 10rem;
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
