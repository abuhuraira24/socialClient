import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 1rem;
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

export const FriendsWrapper = styled.div`
  display: flex;
`;

export const Image = styled.div``;

export const Img = styled.img``;

export const Users = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const User = styled.div`
  width: 110px;
  margin: 8px;
  border-radius: 10px;
  overflow: hidden;
`;

export const Name = styled.h5`
  font-size: 14px;
  color: ${(props) => props.theme.text};
`;
