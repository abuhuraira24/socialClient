import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  right: -200%;
  top: 120%;
  background: ${(props) => props.theme.gray};
  box-shadow: 0px 5px 20px rgb(0 0 0 / 15%);
  padding: 1rem;
  width: 300px;
  height: 90vh;
  overflow: hidden;
  border-radius: 10px;
`;

export const Header = styled.header``;

export const Chat = styled.h5`
  font-weight: 700;
  font-size: 25px;
`;

export const SearchUser = styled.div``;

export const Users = styled.div``;

export const UserWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 1rem;
  &:hover {
    background: ${(props) => props.theme.bg};
    border-radius: 10px;
  }
`;

export const Left = styled.div``;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 1rem;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export const Right = styled.div``;

export const Name = styled.h4`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  color: ${(props) => props.theme.text};
  cursor: pointer;
`;

export const Text = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.text};
`;

export const Date = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.text};
`;
