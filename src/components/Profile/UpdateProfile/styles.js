import styled from "styled-components";

export const H4 = styled.h4`
  color: ${(props) => props.theme.text};
  font-size: 20px;
  font-weight: 600;
`;

export const Header = styled.div`
  text-align: center;
  border-bottom: 0.1px solid ${(props) => props.theme.text};
  padding-bottom: 8px;
`;

export const Close = styled.button`
  position: absolute;
  right: 2%;
  top: 5%;
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.bg};
  width: 30px;
  height: 30px;
  border-radius: 50px;
`;

export const Icon = styled.i``;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;
export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`;

export const Edit = styled.button`
  color: ${(props) => props.theme.text};
`;

export const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
`;

export const Img = styled.img`
  width: 100%;
`;

export const P = styled.p`
  text-align: center;
  color: ${(props) => props.theme.text};
`;
