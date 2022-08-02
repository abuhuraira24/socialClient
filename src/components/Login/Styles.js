import styled, { StyledComponent } from "styled-components";

export const LogginWrapper = styled.div`
  max-width: 40%;
  margin: auto;
  margin-top: 5rem;
  @media (max-width: 576px) {
    max-width: 90%;
  }
`;

export const H2 = styled.h2`
  margin-bottom: 2rem;
  color: ${(props) => props.theme.text};
`;

export const LoginForm = styled.div``;

export const H5 = styled.h5`
  font-weight: 700;
  font-size: 16px;
  margin: 1rem 0;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  a {
    color: ${(props) => props.theme.text};
  }
`;
