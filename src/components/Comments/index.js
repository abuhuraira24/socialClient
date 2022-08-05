import { Link } from "react-router-dom";

import { gql, useQuery } from "@apollo/client";

import {
  CommentBody,
  CommentWrapper,
  UserImage,
  Image,
  TimeLine,
  Span,
  Like,
  Wrapper,
  P,
  Name,
  Picture,
} from "./CommentsStyles";

import moment from "moment";

const SingleComment = ({ c }) => {
  let { data } = useQuery(GET_USER, {
    variables: {
      userId: c.userId,
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <Wrapper>
      <CommentWrapper>
        <UserImage>
          <Image>
            <Link to={`/profile/${c.userId}`}>
              <Picture
                src={
                  data && data.getUserById && data.getUserById.avatars[0].avatar
                }
                alt="abu"
              />
            </Link>
          </Image>
        </UserImage>
        <CommentBody>
          <P>
            <Link to={`/profile/${c.userId}`}>
              <Name>{c.username}</Name>
            </Link>
            {c.body}
          </P>
          <TimeLine>
            <Like>
              <Span>{moment(c.createdAt).fromNow(true)}</Span>
            </Like>
          </TimeLine>
        </CommentBody>
      </CommentWrapper>
    </Wrapper>
  );
};

const GET_USER = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      avatars {
        avatar
      }
    }
  }
`;

export default SingleComment;
