import styled from "styled-components";

export const Wrapper = styled.div``;

export const Image = styled.div`
  max-width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: -8px;
  position: relative;
  border: 3px solid #fff;
  background: ${(props) => props.theme.bg};
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;
