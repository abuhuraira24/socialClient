import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

export const Container = styled.div`
  width: 400px;
`;

export const Img = styled.img`
  width: 100%;
`;

export const Content = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  a {
    color: #0d6efd;
    font-weight: 700;
  }
`;

export const Button = styled.button`
  background: #0250c5;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  color: #fff;
  border-radius: 10px;
`;
