import React, { useState, useEffect, useContext } from "react";

import { useParams, Link } from "react-router-dom";

import { useTheme } from "styled-components";

import { gql, useQuery } from "@apollo/client";

import {
  ArrowLeft,
  AuthorName,
  Comments,
  H5,
  P,
  PostAvatar,
  PostBody,
  Span,
  UserImage,
  UserProfile,
  Wrapper,
} from "./Styles";

import { Container, Row, Col } from "../../Styles/ElementsStyles";

import moment from "moment";

import SingleComment from "../Comments";

import { AuthContext } from "../../context/auth";

import { Avatar } from "../Helper/helper";

import CommentBar from "../commentInput/CommentInput";

import { CommentsArea, UserPic, CircleImage } from "../Post/CartStyles";

import getAvatar from "../../hooks/useAvatar";

import { BackButton } from "./Styles";

const PostDetails = () => {
  // Commet value
  const [post, setPost] = useState(null);

  let [image, setImage] = useState(null);

  const { getComments, comments, themeMode } = useContext(AuthContext);
  const postId = useParams().id;

  useQuery(GET_USER_PIC, {
    onCompleted: (data) => {
      const { images } = getAvatar(data);
      setImage(images);
    },
  });

  // Get single post
  useQuery(GET_POST, {
    onCompleted: (data) => {
      setPost(data.getSinglePost);
    },
    variables: {
      postId: postId,
    },
  });

  useQuery(GET_COMMENTS, {
    onCompleted: (data) => {
      getComments(data.getSinglePost.comments);
    },
    variables: {
      postId: postId,
    },
  });

  let avatar = Avatar(post && post.userId);

  const theme = useTheme();

  useEffect(() => {
    themeMode();
  }, []);

  useEffect(() => {
    const body = document.getElementsByTagName("body");
    body[0].style.backgroundColor = theme.bg;
    body[0].style.overflow = "auto";
  });
  return (
    <Wrapper>
      {/* <NavBar /> */}
      <Container>
        <BackButton>
          <Link to="/">
            <ArrowLeft className="fa-solid fa-arrow-left"></ArrowLeft>
          </Link>
        </BackButton>
        <Row>
          <Col w="70" sm="100">
            <UserProfile>
              <UserImage>
                {typeof avatar !== "function" && (
                  <PostAvatar src={avatar} alt="post" />
                )}
              </UserImage>
              <AuthorName>
                <H5>{post && post.firstName + " " + post.lastName}</H5>
                <Span>{post && moment(post.createdAt).fromNow(true)}</Span>
              </AuthorName>
            </UserProfile>

            <PostBody>
              <P>{post && post.body}</P>
            </PostBody>
            <Comments>
              <CommentsArea>
                <UserPic>
                  {image && image.avatar && (
                    <CircleImage src={image.avatar} alt="user" />
                  )}
                </UserPic>
                <CommentBar postId={postId} />
              </CommentsArea>

              {comments?.map((c, index) => (
                <SingleComment key={index} c={c} />
              ))}
            </Comments>
          </Col>
          <Col w="30" sm="100"></Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

const GET_POST = gql`
  query ($postId: ID!) {
    getSinglePost(postId: $postId) {
      userId
      firstName
      lastName
      avatar
      body
      createdAt
    }
  }
`;

const GET_COMMENTS = gql`
  query ($postId: ID!) {
    getSinglePost(postId: $postId) {
      comments {
        body
        userId
        username
        createdAt
      }
    }
  }
`;
const GET_USER_PIC = gql`
  query {
    getUser {
      avatar
      cover
    }
  }
`;

export default PostDetails;
