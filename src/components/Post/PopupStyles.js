import styled from "styled-components";

export const Close = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  i {
    color: ${(props) => props.theme.text};
    cursor: pointer;
  }
`;

export const H5 = styled.h5`
  color: ${(props) => props.theme.text};
`;

export const P = styled.p`
  color: ${(props) => props.theme.text};
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Button = styled.button`
  color: ${(props) => props.theme.text};
`;

export const Form = styled.form``;

export const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  border: none;
  background: ${(props) => props.theme.input};
  color: ${(props) => props.theme.text};
  padding: 0.5rem;
  &&::-webkit-scrollbar {
    display: none;
  }
`;
