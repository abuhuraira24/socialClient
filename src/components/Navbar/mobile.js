import styled from "styled-components";

export const NavWrapper = styled.div`
  display: none;
  padding-bottom: 1rem;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const Link = styled.span`
  display: block;
`;

export const Main = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Icon = styled.i`
  color: ${(props) => props.theme.text};
`;
