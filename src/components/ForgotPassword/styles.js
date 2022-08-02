import styled from "styled-components";

export const Wraaper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

export const Form = styled.form`
  width: 500px;
  padding: 1rem;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  margin: 0 1rem;
  background: ${(props) => props.theme.gray};
`;

export const Success = styled.div`
  width: 500px;
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 1rem;
  text-align: center;
  background: ${(props) => props.theme.gray};
`;

export const Input = styled.input`
  margin-bottom: 1rem;
  width: 100%;
  background: ${(props) => props.theme.input};
  color: ${(props) => props.theme.text};
  border: none;
`;

export const Button = styled.button`
  background: #2374e1;
  padding: 0.5rem 1rem;
  color: ${(props) => props.theme.text};
  border-radius: 5px;
`;

export const H4 = styled.h4`
  margin-bottom: 1rem;
  font-size: 28px;
  display: block;
  width: 100%;
  border-bottom: 1px solid #ddd;
  padding: 1rem 0;
  color: ${(props) => props.theme.text};
`;

export const P = styled.p`
  color: ${(props) => props.theme.text};
  a {
    color: ${(props) => props.theme.text};
  }
`;

export const LoadButton = styled.div`
  background: #2374e1;
  color: #fff;
  border-radius: 5px;
  padding: 0.5rem 3rem;
`;

export const SuccessIcon = styled.i`
  font-size: 50px;
  color: ${(props) => props.color};
`;
