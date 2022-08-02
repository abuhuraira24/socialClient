import styled from "styled-components";

export const Comments = styled.div`
  margin-top: 1rem;
  border-top: 1px solid #dddddd45;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`;

export const LikeComments = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const Like = styled.div`
  cursor: pointer;
  i {
    font-size: 22px;
    height: 21px;
    color: ${(props) => (props.liked ? "red" : props.theme.color)};
    cursor: pointer;
  }
`;

export const Comment = styled.div`
  cursor: pointer;
  svg {
    color: black;
    font-size: 75px;
    height: 21px;
    fill: #2c51ca;
    cursor: pointer;
  }
`;

export const Span = styled.span`
  margin-left: 8px;
  color: ${(props) => props.theme.text};
  @media (max-width: 558px) {
    display: none;
  }
`;

export const CommentBox = styled.div`
  margin: 1rem 0;
  width: 100%;
`;

export const Form = styled.form``;

export const CommentInput = styled.input`
  background: ${(props) => props.theme.gray};
  border: none;
  border-radius: 50px;
  color: ${(props) => props.theme.text};
  height: 32px;
`;

export const Button = styled.button`
  display: none;
`;
export const Card = styled.div``;

export const CardBody = styled.div`
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background: ${(props) => props.theme.gray};
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 10px;
`;

export const UserName = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 40px;
  color: ${(props) => props.theme.color};
`;

export const CardTitle = styled.div`
  font-weight: 700;
  font-size: 30px;
  a {
    color: ${(props) => props.theme.color};
  }
`;

export const CardSubtitle = styled.h6`
  color: ${(props) => props.theme.color};
  border-bottom: 1px solid #dddddd45;
`;
export const CircleImage = styled.img`
  width: 100%;
`;

export const UserPic = styled.div`
  background: #ddd;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-right: 1rem;
  overflow: hidden;
`;

export const More = styled.div`
  margin-top: 1rem;
`;

export const LoadMore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

export const Load = styled.span`
  background: #2c51ca;
  color: #fff;
  padding: 8px 21px;
  border-radius: 10px;
`;
export const CardText = styled.p`
  color: ${(props) => props.theme.text};
`;
export const CommentsArea = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Users = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Left = styled.div`
  display: flex;
`;

export const Right = styled.div`
  position: relative;
  i {
    color: ${(props) => props.theme.text};
    cursor: pointer;
    padding: 0.5rem;
  }
`;

export const Dot = styled.i``;

export const Empty = styled.h4`
  text-align: center;
  margin: 1rem 0;
`;

export const PostSetting = styled.div`
  position: absolute;
  background: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.text};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  width: 200px;
  left: -168px;
  padding: 1rem;
`;

export const Edit = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const UpdatePost = styled.div``;

export const DeletePost = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Report = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;
export const Icon = styled.i`
  margin-right: 0.4rem;
`;

export const H6 = styled.h6`
  margin: 0;
  cursor: pointer;
`;

export const Delete = styled.div``;
