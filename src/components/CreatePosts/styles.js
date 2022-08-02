import styled from "styled-components";

export const Wrapper = styled.div`
  background: ${(props) => props.theme.gray};
  margin-bottom: 0.5rem;
  padding: 1rem;
  border-radius: 10px;
`;

export const PostWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Avatar = styled.div`
  max-width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  cursor: pointer;
`;

export const Img = styled.img`
  width: 100%;
`;

// export const Input styled.input``

export const FakeInput = styled.div`
  width: 100%;
`;

export const Span = styled.span`
  color: ${(props) => props.theme.text};
  border-radius: 50px;
  display: block;
  cursor: pointer;
  background: ${(props) => props.theme.input};
  padding: 9px 10px;
  @media (max-width: 500px) {
    color: #41464bed;
    font-size: 12px;
  }
`;

export const Button = styled.div``;

export const ClosedModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
`;

export const H4 = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.text};
`;

export const Close = styled.i`
  font-size: 22px;
  cursor: pointer;
  color: ${(props) => props.theme.text};
`;

export const Header = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Privacy = styled.div``;

export const Name = styled.div`
  color: ${(props) => props.theme.text};
`;
export const H5 = styled.h5`
  color: ${(props) => props.theme.text};
`;

export const Privat = styled.span`
  color: ${(props) => props.theme.text};
`;

export const Global = styled.i`
  margin-right: 0.5rem;
`;

export const Body = styled.div`
  p:focus {
    border: none;
    outline: none;
    box-shadow: none;
  }
  p {
    border: none;
    outline: none;
    box-shadow: none;
  }
`;

export const Form = styled.form``;

export const Input = styled.input`
  background: ${(props) => props.theme.input};
`;

export const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  border: none;
  background: ${(props) => props.theme.input};
  color: ${(props) => props.theme.text};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: centera;
  padding: 0 2rem;
`;

export const Icons = styled.div``;

export const PostButton = styled.button`
  background: #0d6efd;
  color: #fff;
  padding: 8px 2rem;
  border-radius: 50px;
`;

export const Emoji = styled.div`
  position: absolute;
  right: 0;
  top: -38%;
`;

export const EmoiIcon = styled.i`
  font-size: 36px;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => props.theme.text};
`;

export const Text = styled.p``;
