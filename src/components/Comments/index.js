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
  Time,
  Reply,
} from "./CommentsStyles";

import moment from "moment";

import ReplyComment from "./reply";
import { useState } from "react";

const SingleComment = ({ c }) => {
  const [toggle, setToggle] = useState(false);

  let { data } = useQuery(GET_USER, {
    variables: {
      userId: c.userId,
    },
    onError(error) {
      console.log(error);
    },
  });

  const time = (time) => {
    let getTime = {};
    if (time.includes("hours")) {
      getTime.time = time.replace("hours", "h");
    }
    if (time.includes("minutes")) {
      getTime.time = time.replace("minutes", "m");
    }
    if (time.includes("seconds")) {
      getTime.time = time.replace("seconds", "s");
    }
    if (time.includes("an hour")) {
      getTime.time = time.replace("hour", "h");
    }
    if (time.includes("day")) {
      getTime.time = time.replace("day", "d");
    }

    return {
      getTime,
    };
  };

  const { getTime } = time(moment(c.createdAt).fromNow(true));

  const toggleHandler = () => {
    setToggle(true);
  };

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
              <Span>Like</Span>
            </Like>
            <Reply>
              <Span onClick={toggleHandler}>Reply</Span>
            </Reply>
            <Time>
              <Span>{getTime.time}</Span>
            </Time>
          </TimeLine>
          {toggle && <ReplyComment />}
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
