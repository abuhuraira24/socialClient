import styled from "styled-components";

export const Wrapper = styled.div`
  background: ${(props) => props.theme.gray};
  margin-bottom: 1rem;
  padding-bottom: 1rem;
`;

export const Span = styled.span`
  color: ${(props) => props.theme.text};
  font-weight: 700;
  font-size: 20px;
`;
export const P = styled.p`
  color: ${(props) => props.theme.text};
  font-weight: 700;
  font-size: 16px;
`;
export const AddBio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 1rem;
`;

export const EditButton = styled.span`
  color: ${(props) => props.theme.text};
  width: 100%;
  text-align: center;
  background: ${(props) => props.theme.input};
  padding: 0.5rem 0;
`;

export const AddBioForm = styled.form`
  padding: 0 1rem;
  margin-top: 1rem;
`;

export const Input = styled.input`
  background: ${(props) => props.theme.input};
  border: none;
  color: ${(props) => props.theme.text};
  height: 4rem;
  text-align: center;
`;

export const Save = styled.button`
  background: ${(props) => props.theme.link};
  color: ${(props) => props.theme.text};
  padding: 4px 18px;
  border-radius: 6px;
  margin-top: 1rem;
`;
export const Cancle = styled.button`
  background: ${(props) => props.theme.input};
  color: ${(props) => props.theme.text};
  padding: 4px 18px;
  border-radius: 6px;
  margin-top: 1rem;
  margin-right: 8px;
`;
