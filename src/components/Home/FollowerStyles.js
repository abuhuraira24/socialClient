import styled from "styled-components";

export const Wrapper = styled.div`
  background: ${(props) => props.theme.gray};
  padding: 1rem;
  border-radius: 10px;
  position: fixed;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 10%),
    0 8px 10px -6px rgb(0 0 0 / 10%);
  @media (max-width: 768px) {
    background: ${(props) => props.theme.bg};
    width: 100%;
    box-shadow: none;
  }
`;

export const Followers = styled.div``;

export const Title = styled.div`
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

export const H5 = styled.h5`
  font-weight: 600;
  font-size: 16px;
  color: ${(props) => props.theme.text};
  margin: 0;
`;

export const Users = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Avatars = styled.div`
  width: 20%;
`;

export const Avatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
`;

export const Img = styled.img`
  width: 100%;
`;

export const Name = styled.div`
  width: 80%;
  a {
    display: block;
  }
`;

export const Span = styled.span`
  color: ${(props) => props.theme.text};
  margin-bottom: 4px;
  display: block;
`;

export const Button = styled.button`
  padding: 4px 10px;
  border: 1px solid #ddd;
  border-radius: 50px;
  color: ${(props) => props.theme.text};
`;

export const Icon = styled.i`
  margin-right: 1rem;
`;

export const Empty = styled.div`
  background: ${(props) => props.theme.input};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ddd;
`;

export const UserIcon = styled.i``;
