import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 5%;
  width: 300px;
  background: ${(props) => props.theme.gray};
  z-index: 99;
  padding: 1rem;
  border-radius: 10px;
`;

export const Left = styled.div`
  display: flex;
  position: relative;
  justify-content: start;
`;

export const Right = styled.div``;

export const Avatar = styled.div`
  width: 35px;
  height: 35px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 1rem;
  position: relative;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export const Name = styled.div``;

export const H5 = styled.h5`
  color: ${(props) => props.theme.text};
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`;

export const Activate = styled.div`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  background: green;
  top: 45%;
  left: 18%;
  border: 1px solid ${(props) => props.theme.text};
`;

// export const On = styled.span`
//   display: inline-block;
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   overflow: hidden;
//   background: green;
// `;
export const Off = styled.span``;

export const Close = styled.div``;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddddddbf;
  padding-bottom: 0.5rem;
`;

export const Body = styled.div`
  height: 35vh;
  overflow-y: scroll;
`;

export const Footer = styled.div`
  color: ${(props) => props.theme.text};
`;

export const Icon = styled.i`
  color: ${(props) => props.theme.text};
  font-size: 20px;
`;

export const Span = styled.span`
  color: ${(props) => props.theme.text};
  font-size: 14px;
`;
