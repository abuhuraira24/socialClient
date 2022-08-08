import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Avatar = styled.div``;

export const Form = styled.form``;

export const Input = styled.input`
  background: ${(props) => props.theme.gray};
  border: none;
  border-radius: 50px;
  height: 32px;
  color: ${(props) => props.theme.text};
`;

export const Submit = styled.button`
  display: none;
`;
