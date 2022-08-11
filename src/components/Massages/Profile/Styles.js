import styled from "styled-components";

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
  position: relative;
  margin-bottom: 1rem;
`;

export const Avatar = styled.div`
  width: 55px;
  height: 55px;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 1rem;
  position: relative;
`;

export const Img = styled.img`
  width: 100%;
`;

export const Name = styled.h5`
  color: ${(props) => props.theme.text};
  margin: 0;
  font-weight: 600;
`;

export const Span = styled.span`
  color: ${(props) => props.theme.text};
  margin: 0;
  font-size: 12px;
`;

export const On = styled.div`
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  background: green;
  top: 53%;
  right: 2%;
  border: 1px solid ${(props) => props.theme.text};
`;
