import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

import { Link } from "react-router-dom";

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
  Time,
  Reply,
} from "../CommentsStyles";

import moment from "moment";

import { time } from "../../Utils/timeFormater";

const SingleReply = ({ reply }) => {
  const [user, setUser] = useState([]);

  useQuery(GET_USER, {
    onCompleted: (data) => {
      console.log(data.getUserById);
      setUser(data.getUserById);
    },
    variables: {
      userId: reply.userId,
    },
    onError(error) {
      console.log(error);
    },
  });

  const { getTime } = time(moment(reply.createdAt).fromNow(true));
  return (
    <Wrapper>
      <CommentWrapper>
        <UserImage>
          {user.length !== 0 && (
            <Image>
              <Link to={`/profile/`}>
                <Picture src={user?.avatars[0].avatar} alt="abu" />
              </Link>
            </Image>
          )}
        </UserImage>
        <CommentBody>
          <P>
            {user.length !== 0 && (
              <Link to={`/profile/`}>
                <Name>{user.firstName + " " + user.lastName}</Name>
              </Link>
            )}
            {reply.body}
          </P>
          <TimeLine>
            <Like>
              <Span>Like</Span>
            </Like>
            <Reply>
              <Span>Reply</Span>
            </Reply>
            <Time>
              <Span>{getTime.time}</Span>
            </Time>
          </TimeLine>
        </CommentBody>
      </CommentWrapper>
    </Wrapper>
  );
};

const GET_USER = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      firstName
      lastName
      avatars {
        avatar
      }
    }
  }
`;

export default SingleReply;
