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
  SeeMore,
  SubText,
  ImageWrapper,
  Images,
} from "./Styles";

import { Container, Row, Col } from "../../Styles/ElementsStyles";

import axios from "axios";

import moment from "moment";

import SingleComment from "../Comments";

import { AuthContext } from "../../context/auth";

import CommentBar from "../commentInput/CommentInput";

import { CommentsArea, UserPic, CircleImage } from "../Post/CartStyles";

import { BackButton } from "./Styles";

import Profile from "./Profile";

import { socket } from "../../hooks/socketio";

import Modal from "./Modal";

const PostDetails = () => {
  // Commet value
  const [post, setPost] = useState([]);

  let [author, setAuthor] = useState(null);
  let [userAvatar, setUserAvatar] = useState(null);

  const [toggle, setToggle] = useState(false);

  const [comments, setComments] = useState(null);

  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(20);

  const { themeMode, user } = useContext(AuthContext);

  const { postId, userId } = useParams();

  // Author
  useQuery(GET_AVATAE_BY_ID, {
    onCompleted: (data) => {
      if (data) {
        setAuthor(data.getUserById);
      }
    },
    variables: { userId: userId },
    onError(err) {
      console.log(err);
    },
  });

  // User
  useQuery(GET_AVATAE_BY_ID, {
    onCompleted: (data) => {
      if (data) {
        setUserAvatar(data.getUserById.avatars);
      }
    },
    variables: { userId: user.id },
    onError(err) {
      console.log(err);
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
      setComments(data.getSinglePost.comments);
    },
    variables: {
      postId: postId,
    },
    onError(error) {
      console.log(error);
    },
  });

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

  // Fetch comments
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getComments/${postId}/`)
      .then((res) => {
        setComments(res.data.comments);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [postId]);

  useEffect(() => {
    socket.off("getComment").on("getComment", (data) => {
      setComments((prev) => [data, ...comments]);
    });
  }, [comments]);

  useEffect(() => {
    socket.off("creatorComment").on("creatorComment", (comment) => {
      setComments((prev) => [comment, ...comments]);
    });
  }, [comments]);

  return (
    <Modal>
      <Wrapper>
        {/* <NavBar /> */}
        <Container>
          <Row>
            <Col w="100" sm="100">
              <UserProfile>
                <Left>
                  <UserImage>
                    <Link to={`/profile/${post?.userId}`}>
                      {author && author.avatars.length !== 0 ? (
                        <PostAvatar
                          src={`${process.env.REACT_APP_SERVER_URL}/${author.avatars[0].avatar}`}
                          alt="post"
                        />
                      ) : (
                        <PostAvatar
                          src="https://res.cloudinary.com/dza2t1htw/image/upload/v1661353556/user_mi2nyr.png"
                          alt=""
                        />
                      )}
                    </Link>
                  </UserImage>
                  <AuthorName>
                    <Link
                      style={{ display: "flex" }}
                      to={`/profile/${post?.userId}`}
                    >
                      <H5>{post && post.firstName + " " + post.lastName}</H5>

                      {post && post.postType === "profile" && (
                        <SubText>{post.body}</SubText>
                      )}
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

              {post && post.postType === "profile" && (
                <ImageWrapper>
                  <Images
                    src={`${process.env.REACT_APP_SERVER_URL}/${post.image}`}
                  />
                </ImageWrapper>
              )}

              {post && post.image !== "" && (
                <ImageWrapper>
                  <Images
                    src={`${process.env.REACT_APP_SERVER_URL}/${post.image}`}
                  />
                </ImageWrapper>
              )}

              {post && post.postType === "normal" && (
                <PostBody>
                  <P>{post && post.body}</P>
                </PostBody>
              )}

              <Comments>
                <CommentsArea>
                  <UserPic>
                    {userAvatar && userAvatar.length !== 0 ? (
                      <CircleImage
                        src={`${process.env.REACT_APP_SERVER_URL}/${userAvatar[0].avatar}`}
                        alt="user"
                      />
                    ) : (
                      <CircleImage
                        src="https://res.cloudinary.com/dza2t1htw/image/upload/v1661353556/user_mi2nyr.png"
                        alt=""
                      />
                    )}
                  </UserPic>
                  <CommentBar postId={postId} userId={userId} />
                </CommentsArea>

                {comments?.slice(0, visible).map((c, index) => (
                  <SingleComment key={index} c={c} />
                ))}

                {/* <SeeMore onClick={getMoreComment}>View more comments</SeeMore> */}
              </Comments>
            </Col>
            {/* <Col w="30" mdnone="true">
              {post.length !== 0 && <Profile post={post} />}
            </Col> */}
          </Row>
        </Container>
      </Wrapper>
    </Modal>
  );
};

const GET_POST = gql`
  query ($postId: ID!) {
    getSinglePost(postId: $postId) {
      userId
      firstName
      lastName
      image
      body
      postType
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
const GET_AVATAE_BY_ID = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      avatars {
        avatar
      }
    }
  }
`;

export default PostDetails;
