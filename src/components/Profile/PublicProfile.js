import { useState, useContext, useEffect } from "react";

import Intro from "./Intro";

import { gql, useQuery, useMutation } from "@apollo/client";

import { useTheme } from "styled-components";

import { Container, Col, Row } from "../../Styles/ElementsStyles";

import { AuthContext } from "../../context/auth";

import MyFollowers from "./Followers";

import {
  Avatar,
  Avatars,
  Buttons,
  Cover,
  CoverPic,
  CoverWrapper,
  EditIcon,
  Followers,
  H3,
  Header,
  Image,
  Images,
  ImageWrapper,
  Img,
  Photos,
  ProfileAvatar,
  SeeAll,
  Span,
  FollowButton,
  Comming,
} from "./styles";
import { useParams } from "react-router-dom";

import PostCart from "../Profile/Posts/Card";

import CreatePost from "../CreatePosts";

import Friends from "./Friends";

import Title from "../title";

const PublicProfile = () => {
  const [profileUser, setProfileUser] = useState(null);

  const [isFollow, setFollow] = useState(false);

  let userId = useParams();
  useQuery(GET_USER_BY_ID, {
    onCompleted: (data) => {
      setProfileUser(data.getUserById);
    },
    variables: {
      userId: userId.id,
    },
    onError(error) {
      console.log(error);
    },
  });

  // Context api
  let { user } = useContext(AuthContext);

  // Get posts
  useQuery(GET_POSTS_BY_USERS_ID, {
    variables: {
      userId: user.id,
    },
  });

  const theme = useTheme();

  useEffect(() => {
    const body = document.getElementsByTagName("body");
    body[0].style.backgroundColor = theme.bg;
    body[0].style.overflow = "auto";
  });

  // is Already Follow

  useEffect(() => {
    if (
      profileUser &&
      profileUser.followers.length !== 0 &&
      profileUser.followers.find((f) => f.userId === user.id)
    ) {
      setFollow(true);
    }
  }, [profileUser, user.id]);

  let [addFollow] = useMutation(ADD_FOLLOWER, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const FollowHandler = () => {
    addFollow({
      variables: { receiverId: userId.id },
    });
    if (isFollow) {
      setFollow(false);
    } else {
      setFollow(true);
    }
  };

  return (
    <CoverWrapper>
      <Title>
        {" "}
        {profileUser?.firstName} {profileUser?.lastName}
      </Title>
      <Container>
        <Col w="100">
          <Cover>
            <CoverPic>
              {/* Cover photo */}
              {profileUser && <img src={profileUser.cover[0].url} alt="me" />}
            </CoverPic>
          </Cover>

          {/* Profile avatar */}
          <Avatars>
            <Avatar>
              {profileUser && (
                <img src={profileUser.avatars[0].avatar} alt="me" />
              )}
            </Avatar>

            {/* Profile Name and Followers */}
            <ProfileAvatar>
              <H3>
                {" "}
                {profileUser?.firstName} {profileUser?.lastName}
              </H3>
              <Span> {profileUser?.followers.length} Followers .</Span>
              <Span> {profileUser?.following.length} Following</Span>
              <Followers>
                <MyFollowers />
              </Followers>
            </ProfileAvatar>
            <Buttons>
              {isFollow ? (
                <FollowButton onClick={FollowHandler}>
                  <EditIcon className="fa-solid fa-check"></EditIcon>
                  Following
                </FollowButton>
              ) : (
                <FollowButton onClick={FollowHandler}>
                  <EditIcon className="fa-solid fa-user-plus"></EditIcon>
                  Follow
                </FollowButton>
              )}
            </Buttons>
          </Avatars>
        </Col>
      </Container>
      <Container>
        <Row>
          <Col w="30" md="100" sm="100">
            <Intro />
            <ImageWrapper display="none">
              <Header>
                <Photos>Photos</Photos>
                <SeeAll>See All Photos</SeeAll>
              </Header>
              <Images>
                {profileUser &&
                  profileUser.avatars.length !== 0 &&
                  profileUser.avatars.map((img, index) => (
                    <Image key={index}>
                      <Img src={img.avatar} alt="abu" />
                      <Comming>Comming...</Comming>
                    </Image>
                  ))}
                {profileUser &&
                  profileUser.cover.length !== 0 &&
                  profileUser.cover.map((img, index) => (
                    <Image key={index}>
                      <Img src={img.url} alt="abu" />
                      <Comming>Comming...</Comming>
                    </Image>
                  ))}
              </Images>
            </ImageWrapper>

            <Friends />
          </Col>
          <Col w="50" md="100" sm="100">
            <CreatePost />
            <PostCart />
          </Col>
          <Col w="20" mdnone="true" none="true"></Col>
        </Row>
      </Container>
    </CoverWrapper>
  );
};

const GET_USER_BY_ID = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      firstName
      lastName
      avatars {
        avatar
      }
      cover {
        url
      }
      followers {
        name
        userId
      }
      following {
        name
        userId
      }
    }
  }
`;

const GET_POSTS_BY_USERS_ID = gql`
  query ($userId: ID!) {
    getPostsByUserId(userId: $userId) {
      firstName
      lastName
      body
      userId
      createdAt
      likes {
        userId
      }
      userId
      comments {
        body
        createdAt
        userId
        username
      }
    }
  }
`;

const ADD_FOLLOWER = gql`
  mutation ($receiverId: String!) {
    addFollow(receiverId: $receiverId) {
      name
      userId
    }
  }
`;

export default PublicProfile;
