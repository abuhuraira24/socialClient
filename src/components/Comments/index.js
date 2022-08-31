import { useContext } from "react";

import { Link, useParams } from "react-router-dom";

import { gql, useMutation, useQuery } from "@apollo/client";

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
  Love,
  Dot,
  Left,
  Right,
} from "./CommentsStyles";

import moment from "moment";

import ReplyComment from "./reply";
import { useEffect, useState } from "react";
import SingleReply from "./reply/SingleReply";

import { time } from "../Utils/timeFormater";

import { socket } from "../../hooks/socketio";

import { AuthContext } from "../../context/auth";

const SingleComment = ({ c }) => {
  const [toggle, setToggle] = useState(false);

  const [replys, setReplys] = useState([]);

  const [isReact, setIsReact] = useState(false);

  let [userInfo, setUserInfo] = useState(null);

  const { user } = useContext(AuthContext);

  useQuery(GET_USER, {
    onCompleted: (data) => {
      setUserInfo(data.getUserById);
    },
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

  useEffect(() => {
    socket.off("sendReply").on("sendReply", (data) => {
      setReplys((prev) => [...prev, data]);
    });
  });

  useEffect(() => {
    socket.off("reply").on("reply", (data) => {
      setReplys((prev) => [...prev, data]);
    });
  }, []);

  const [addLike, { loading }] = useMutation(REACT_TO_COMMENT, {
    onCompleted: (data) => {
      if (data.reactionTocomment.likes.length !== 0) {
        setIsReact(true);
      } else {
        setIsReact(false);
      }
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    addLike({ variables: { commentId: c._id, userId: user.id } });
  }, [addLike, user, c]);

  const commentLikeHandler = (commentId) => {
    addLike({ variables: { commentId, userId: user.id } });
  };

  return (
    <Wrapper>
      <Left>
        <CommentWrapper>
          <UserImage>
            <Image>
              <Link to={`/profile/${c.userId}`}>
                {userInfo && userInfo.avatars.length !== 0 ? (
                  <Picture
                    src={`${process.env.REACT_APP_SERVER_URL}/${userInfo.avatars[0].avatar}`}
                    alt="abu"
                  />
                ) : (
                  <Picture
                    src="https://res.cloudinary.com/dza2t1htw/image/upload/v1661353556/user_mi2nyr.png"
                    alt=""
                  />
                )}
              </Link>
            </Image>
          </UserImage>
          <CommentBody>
            <P>
              <Link to={`/profile/${c.userId}`}>
                <Name>
                  {userInfo && userInfo.firstName + " " + userInfo.lastName}
                </Name>
              </Link>
              {c.text}
            </P>
            <TimeLine>
              {!loading && (
                <Like onClick={() => commentLikeHandler(c._id)}>
                  {isReact ? (
                    <Span>
                      <Love className="fa-solid fa-heart"></Love>
                    </Span>
                  ) : (
                    <Span>
                      <i className="fa-solid fa-heart"></i>
                    </Span>
                  )}
                </Like>
              )}

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
      </Left>

      <Right>
        <Dot>
          <i className="fa-solid fa-ellipsis"></i>
        </Dot>
      </Right>
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

const REACT_TO_COMMENT = gql`
  mutation ($commentId: ID!, $userId: ID!) {
    reactionTocomment(commentId: $commentId, userId: $userId) {
      postId
      likes {
        createdAt
      }
    }
  }
`;

export default SingleComment;
