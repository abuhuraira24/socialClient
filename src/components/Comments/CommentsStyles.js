import styled from "styled-components";

export const CommentWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

export const UserImage = styled.div``;

export const CommentBody = styled.div``;

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
  font-size: 14px;
`;
export const Name = styled.span`
  display: block;
  font-weight: 700;
  color: ${(props) => props.theme.color};
  font-size: 14px;
`;
export const Image = styled.div`
  background: #ddd;
  width: 30px;
  height: 30px;
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

export const TimeLine = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Like = styled.div`
  color: ${(props) => props.theme.text};
`;

export const Reply = styled.div`
  color: ${(props) => props.theme.text};
  cursor: pointer;
`;

export const Time = styled.div``;

export const Wrapper = styled.div`
  display: flex;
  justify-content: start;
`;

export const Span = styled.span`
  color: #6c757d !important;
  padding: 6px;
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  i {
    cursor: pointer;
  }
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

export const CountReply = styled.div`
  color: ${(props) => props.theme.color};
`;

export const Arrow = styled.i`
  transform: rotate(89deg);
  margin-right: 0.5rem;
`;

export const Love = styled.i`
  color: red;
  cursor: pointer;
`;

export const Dot = styled.div`
  margin-left: 1rem;
  margin-top: 12px;
  color: #000;
`;

export const Left = styled.div``;

export const Right = styled.div``;
