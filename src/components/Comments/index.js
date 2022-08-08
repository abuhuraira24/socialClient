import { Link, useParams } from "react-router-dom";

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
  CountReply,
  Arrow,
} from "./CommentsStyles";

import moment from "moment";

import ReplyComment from "./reply";
import { useEffect, useState } from "react";
import SingleReply from "./reply/SingleReply";

import { time } from "../Utils/timeFormater";

import { socket } from "../../hooks/socketio";

const SingleComment = ({ c }) => {
  const [toggle, setToggle] = useState(false);

  const [replys, setReplys] = useState([]);

  let { data } = useQuery(GET_USER, {
    variables: {
      userId: c.userId,
    },
    onError(error) {
      console.log(error);
    },
  });

  const { getTime } = time(moment(c.createdAt).fromNow(true));

  const toggleHandler = () => {
    setToggle(true);
  };

  // post id
  const { id } = useParams();

  // Get Replys
  useQuery(GET_REPLY, {
    onCompleted: (data) => {
      setReplys(data.getReply);
    },
    variables: {
      postId: id,
      commentId: c._id,
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    socket.on("sendReply", (data) => {
      setReplys((prev) => [...prev, data]);
      console.log(data);
    });
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
              <Span>Like</Span>
            </Like>
            <Reply>
              <Span onClick={toggleHandler}>Reply</Span>
            </Reply>
            <Time>
              <Span>{getTime.time}</Span>
            </Time>
          </TimeLine>
          {replys.length !== 0 && !toggle && (
            <CountReply>
              <Span
                style={{ cursor: "pointer", padding: "0" }}
                onClick={toggleHandler}
              >
                <Arrow className="fa-solid fa-arrow-turn-up"></Arrow>
                {replys.length} Replies
              </Span>
            </CountReply>
          )}
          {toggle &&
            replys.length !== 0 &&
            replys.map((reply, index) => (
              <SingleReply key={index} reply={reply} />
            ))}
          {toggle && <ReplyComment commentId={c._id} />}
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

const GET_REPLY = gql`
  query ($postId: ID!, $commentId: ID!) {
    getReply(postId: $postId, commentId: $commentId) {
      username
      body
      _id
      userId
      createdAt
    }
  }
`;

export default SingleComment;
