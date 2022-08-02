import { useEffect } from "react";

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
  Author,
} from "./CommentsStyles";

import { AuthContext } from "../../context/auth";

import { useContext, useState } from "react";

import moment from "moment";

const SingleComment = ({ c }) => {
  let [avatar, setAvatar] = useState("");

  useQuery(GET_COMMENT_AVATAR, {
    onCompleted: (data) => {
      setAvatar(data.getCommentAvatar.avatar);
    },
    variables: {
      userId: c.userId,
    },
  });

  return (
    <Wrapper>
      <CommentWrapper>
        <UserImage>
          <Image>{avatar && <Picture src={avatar} alt="abu" />}</Image>
        </UserImage>
        <CommentBody>
          <P>
            <Link to={`profile/${c.userId}`}>
              <Name>
                {c.username}
                {/* <Author>{c.author === "true" && "author"}</Author> */}
              </Name>
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

const GET_COMMENT_AVATAR = gql`
  query ($userId: ID!) {
    getCommentAvatar(userId: $userId) {
      avatar
      isStock
    }
  }
`;

export default SingleComment;
