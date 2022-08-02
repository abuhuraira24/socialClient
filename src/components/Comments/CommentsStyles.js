import styled, { StyledComponent } from "styled-components";

export const CommentWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

export const UserImage = styled.div`
  width: 7%;
`;

export const CommentBody = styled.div`
  width: 93%;
`;

export const P = styled.p`
  background: ${(props) => props.theme.gray};
  margin-bottom: 0;
  border-radius: 8px;
  padding: 10px 16px;
  color: #000;
  display: inline-block;
  color: ${(props) => props.theme.color};
  a {
    display: block;
  }
`;
export const Name = styled.span`
  display: block;
  font-weight: 700;
  color: ${(props) => props.theme.color};
`;
export const Image = styled.div`
  background: #ddd;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-right: 1rem;
  overflow: hidden;
  svg {
    height: 22px;
  }
`;

export const TimeLine = styled.div``;

export const Like = styled.div``;

export const Wrapper = styled.div``;

export const Span = styled.span`
  color: #6c757d !important;
  padding: 6px;
  display: inline-block;
`;

export const Picture = styled.img`
  width: 100%;
`;

export const Author = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.color};
  background: ${(props) => props.theme.gray};
  margin-left: 4px;
  border-radius: 10px;
`;
