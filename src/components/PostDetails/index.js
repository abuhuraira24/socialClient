import React, { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";

import { useTheme } from "styled-components";

import { gql, useQuery, useMutation } from "@apollo/client";

import io from "socket.io-client";

import {
  AuthorName,
  Comments,
  H5,
  P,
  PostAvatar,
  PostBody,
  PostTitle,
  Span,
  UserImage,
  UserProfile,
  Wrapper,
} from "./Styles";

import { Container, Row, Col } from "../../Styles/ElementsStyles";

import moment from "moment";

import SingleComment from "../Comments";

import { AuthContext } from "../../context/auth";

import Profile from "./Profile";

import { Avatar } from "../Helper/helper";

import CommentBar from "../commentInput/CommentInput";

import { CommentsArea, UserPic, CircleImage } from "../Post/CartStyles";

import getAvatar from "../../hooks/useAvatar";

import NavBar from "../Navbar/NavBar";

let socket;

const PostDetails = () => {
  // Commet value
  const [post, setPost] = useState(null);

  let [image, setImage] = useState(null);

  const { getComments, comments, user } = useContext(AuthContext);
  const postId = useParams().id;

  // const { data } = useQuery(FETCH_POST, {
  //   variables: {
  //     postId,
  //   },
  // });

  // Query User avata or data

  useQuery(GET_USER_PIC, {
    onCompleted: (data) => {
      const { images } = getAvatar(data);
      setImage(images);
    },
  });

  // Get single post
  useQuery(GET_POST, {
    onCompleted: (data) => {
      console.log(data.getSinglePost);
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
    const body = document.getElementsByTagName("body");
    body[0].style.backgroundColor = theme.bg;
    body[0].style.overflow = "auto";
  });
  return (
    <Wrapper>
      <NavBar />
      <Container>
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

const FETCH_POST = gql`
  query ($postId: ID!) {
    getSinglePost(postId: $postId) {
      firstName
      lastName
      userId
      body
      createdAt
      comments {
        body
        username
        userId
        avatar
        author
        createdAt
      }
    }
  }
`;

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
