import styled from "styled-components";

export const FormWrapper = styled.div``;

export const Form = styled.form`
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Input = styled.input`
  background: ${(props) => props.theme.input};
  color: ${(props) => props.theme.text};
  border: none;
  border-radius: 20px;
`;

export const Send = styled.button``;

export const Icon = styled.i`
  color: ${(props) => props.theme.link};
  padding: 0 0.5rem;
  transform: rotate(45deg);
  font-size: 20px;
`;
