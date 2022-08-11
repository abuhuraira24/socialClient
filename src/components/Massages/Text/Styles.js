import styled from "styled-components";

export const Wrapper = styled.div``;

export const Text = styled.div`
  width: 100%;
`;

export const Span = styled.span``;

export const Parricapant = styled.div`
  display: flex;
  justify-content: start;
`;

export const Creator = styled.div`
  display: flex;
  justify-content: end;
`;

export const Sender = styled.div`
  text-align: ${(props) => (props.align ? "right" : "left")};
  margin-bottom: -0.5rem;
  font-weight: 700;
  color: #fff;
  padding: 10px 12px;
  border-radius: 50px;
  font-size: 14px;
  width: 100%;
  display: flex;
  justify-content: end;
`;

export const Send = styled.div`
  background: ${(props) => props.theme.link};
  display: inline-block;
  border-bottom-left-radius: 18px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  padding: 0.5rem;
  padding: 0.5rem;
  margin-left: 4rem;
  display: block;
  text-align: left;
`;

export const Get = styled.div`
  background: ${(props) => props.theme.bg};
  display: inline-block;
  border-bottom-left-radius: 18px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  padding: 0.5rem;
`;

export const Receiver = styled.div`
  text-align: ${(props) => (props.align ? "right" : "left")};
  margin-bottom: -0.5rem;
  /* background: ${(props) => props.theme.bg}; */
  font-weight: 700;
  color: #fff;
  padding: 10px 12px;
  border-radius: 50px;
  font-size: 14px;
  width: 100%;
  display: flex;
`;

export const P = styled.span`
  color: ${(props) => props.color};
`;

export const Pa = styled.span`
  color: ${(props) => props.theme.text};
`;

export const Avatar = styled.div`
  width: 35px;
  height: 35px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;
