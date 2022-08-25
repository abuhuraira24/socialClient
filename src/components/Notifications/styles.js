import styled from "styled-components";

import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  position: absolute;
  background: ${(props) => props.theme.gray};
  top: 100%;
  width: 400px;
  box-shadow: 0px 5px 20px rgb(0 0 0 / 15%);
  border-radius: 10px;
  padding: 1rem;
  right: 0px;
  padding-bottom: 2rem;
  height: 80vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    margin-top: 1rem;
    background: ${(props) => props.theme.bg};
    box-shadow: none;
  }
`;

export const Header = styled.header``;

export const Title = styled.h4`
  font-weight: 700;
  font-size: 18px;
  color: ${(props) => props.theme.text};
`;

export const SubHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const New = styled.span`
  color: ${(props) => props.theme.text};
`;

export const SeeAll = styled.span`
  color: ${(props) => props.theme.text};
`;

export const NotWrapper = styled.div``;

export const Avatars = styled.div`
  position: relative;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 4px;
`;

export const Body = styled.div`
  width: 100%;
  background: "";
  margin-left: 5px;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export const Single = styled.div`
  display: flex;
`;

export const Name = styled.span`
  color: ${(props) => props.theme.text};
`;

export const Text = styled.span`
  color: ${(props) => props.theme.text};
`;

export const Time = styled.div`
  color: ${(props) => props.theme.text};
  font-size: 14px;
`;

export const Empty = styled.p`
  text-align: center;
  color: ${(props) => props.theme.text};
`;

export const Heart = styled.i`
  color: red;
  display: inline-block;
`;

export const Comment = styled.i`
  color: green;
  display: inline-block;
`;

export const Icon = styled.div`
  position: absolute;
  left: 60%;
  color: green;
  top: 60%;
  background: #fff;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  border-radius: 50px;
`;

export const Follow = styled.i`
  color: #000;
  display: inline-block;
  margin: 0;
  padding: 0;
`;

export const Linkk = styled(Link)`
  margin: 0.5rem 0;
`;
