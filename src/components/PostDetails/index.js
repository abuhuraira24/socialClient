import React, { useState, useEffect, useContext } from "react";

import { useParams, Link } from "react-router-dom";

import { useTheme } from "styled-components";

import { gql, useQuery } from "@apollo/client";

import UpdatedPost from "../UpdatePost";

import {
  ArrowLeft,
  AuthorName,
  Comments,
  H5,
  Left,
  P,
  PostAvatar,
  PostBody,
  Span,
  UserImage,
  UserProfile,
  Wrapper,
  Right,
  Icon,
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

import Profile from "./Profile";

const PostDetails = () => {
  // Commet value
  const [post, setPost] = useState(null);

  let [image, setImage] = useState(null);

  const [toggle, setToggle] = useState(false);

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
    onError(error) {
      console.log(error);
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
  }, [theme.bg]);

  const postToggler = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  console.log("Rendered post details");
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
              <Left>
                <UserImage>
                  <Link to={`/profile/${post?.userId}`}>
                    {typeof avatar !== "function" && (
                      <PostAvatar src={avatar} alt="post" />
                    )}
                  </Link>
                </UserImage>
                <AuthorName>
                  <Link to={`/profile/${post?.userId}`}>
                    <H5>{post && post.firstName + " " + post.lastName}</H5>
                  </Link>

                  <Span>{post && moment(post.createdAt).fromNow(true)}</Span>
                </AuthorName>
              </Left>
              <Right>
                <Icon
                  onClick={postToggler}
                  className="fa-solid fa-ellipsis"
                ></Icon>
                <UpdatedPost toggler={toggle} post={post} />
              </Right>
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
          <Col w="30" sm="100">
            {post && <Profile post={post} />}
          </Col>
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
      _id
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
        _id
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
