import styled from "styled-components";

export const Wrapper = styled.div`
  width: 400px;
  background: red;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Close = styled.span`
  color: ${(props) => props.theme.text};
  font-size: 25px;
  cursor: pointer;
`;

export const H5 = styled.h4`
  color: ${(props) => props.theme.text};
`;

export const Upload = styled.div`
  color: ${(props) => props.theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.bg};
  padding: 8px;
  font-size: 35px;
  margin-top: 1rem;
  position: relative;
`;

export const UploadWrapper = styled.div``;

export const Form = styled.form``;

export const Add = styled.span`
  color: ${(props) => props.theme.text};
`;

export const Input = styled.input`
  /* position: absolute; */
  position: absolute;
  opacity: 0;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

export const Image = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 50%;
`;

export const Img = styled.img`
  width: 100%;
`;

export const SubmitAvatar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Exit = styled.button`
  color: ${(props) => props.theme.text};
`;

export const Save = styled.button`
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.link};
  padding: 4px 19px;
  margin-left: 2rem;
  border-radius: 6px;
`;
