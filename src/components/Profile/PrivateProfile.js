import { useState, useContext, useEffect } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";

import { useTheme } from "styled-components";

import { Container, Col, Row } from "../../Styles/ElementsStyles";

import Axios from "axios";

import { AuthContext } from "../../context/auth";

import MyFollowers from "./Followers";

import {
  Avatar,
  Avatars,
  Buttons,
  Camera,
  Cover,
  CoverPic,
  CoverWrapper,
  EdidButton,
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
  UploadAvatar,
  UploadCover,
  UploadInput,
  UserIcon,
} from "./styles";
import { useParams } from "react-router-dom";

import PostCart from "../Profile/Posts/Card";

import CreatePost from "../CreatePosts";

import Friends from "./Friends";

import UpdatedModale from "./UpdateProfile/Modal";

const PrivateProfile = () => {
  const [cover, setCover] = useState();
  const [avatar, setAvatar] = useState();
  const [profileUser, setProfileUser] = useState(null);
  // Open Modal
  const [isOpen, setIsOpen] = useState(false);
  // File Upload Mutation
  let [mutedCover] = useMutation(COVER_UPLOAD);
  // Cover Photo Upload
  const coverHandler = (e) => {
    if (e.target.validity.valid && user) {
      setCover(URL.createObjectURL(e.target.files[0]));
      let file = e.target.files[0];

      let formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      Axios.post(
        "https://api.cloudinary.com/v1_1/dza2t1htw/image/upload",
        formData
      ).then((res) => {
        mutedCover({
          variables: {
            url: res.data.url,
            userId: user.id,
          },
        });
      });
    }
  };

  let userId = useParams();
  useQuery(GET_USER_BY_ID, {
    onCompleted: (data) => {
      setProfileUser(data.getUserById);
    },
    variables: {
      userId: userId.id,
    },
  });

  const { data } = useQuery(GET_USER);
  // Avatar Upload
  let [mutate] = useMutation(FILE_UPLOAD);

  // Context api
  let { user } = useContext(AuthContext);

  // Get posts
  useQuery(GET_POSTS_BY_USERS_ID, {
    variables: {
      userId: user.id,
    },
  });

  // Submit Avatar
  const onChange = (e) => {
    if (e.target.validity.valid && user) {
      let file = e.target.files[0];
      setAvatar(URL.createObjectURL(file));

      let formData = new FormData();

      formData.append("file", file);

      formData.append("upload_preset", "ml_default");

      Axios.post(
        "https://api.cloudinary.com/v1_1/dza2t1htw/image/upload",
        formData
      ).then((res) => {
        console.log(res);
        mutate({
          variables: {
            url: res.data.url,
            userId: user.id,
          },
        });
      });
    }
  };

  useEffect(() => {
    if (data && typeof data.getUser !== "undefined") {
      setAvatar(data.getUser.avatar);
      setCover(data.getUser.cover);
      // console.log(data.getUser);
    }
  }, [data]);

  // Open Modal
  const modalIsOpen = () => {
    setIsOpen(true);
    document.body.setAttribute("style", "overflow: hidden");
  };
  // Close Modal
  const closeModal = () => {
    setIsOpen(false);
    document.body.setAttribute("style", "overflow: auto");
  };

  const theme = useTheme();

  useEffect(() => {
    const body = document.getElementsByTagName("body");
    body[0].style.backgroundColor = theme.bg;
    body[0].style.overflow = "auto";
  });

  return (
    <CoverWrapper>
      <Container>
        <Col w="100">
          <Cover>
            <CoverPic>
              {/* Cover photo */}
              {cover && <img src={cover} alt="me" />}

              {/* Upload Cover Photo */}
              <UploadCover>
                <UploadInput type="file" onChange={coverHandler} />
                <Camera className="fa-solid fa-camera"></Camera>
              </UploadCover>
            </CoverPic>
          </Cover>

          {/* Profile avatar */}
          <Avatars>
            <Avatar file={avatar}>
              {/* Set Avatar */}
              {!avatar && <UserIcon className="fa-solid fa-user"></UserIcon>}
              {avatar && <img src={avatar} alt="me" />}

              {/* File Upload Input */}
              <UploadAvatar>
                <UploadInput type="file" onChange={onChange} />
                <Camera className="fa-solid fa-camera"></Camera>
              </UploadAvatar>
            </Avatar>

            {/* Profile Name and Followers */}
            <ProfileAvatar>
              <H3>
                {" "}
                {user.firstName} {user.lastName}
              </H3>
              <Span> {profileUser?.followers.length} Followers .</Span>
              <Span> {profileUser?.following.length} Followers</Span>
              <Followers>
                <MyFollowers />
              </Followers>
            </ProfileAvatar>
            <Buttons>
              <EdidButton onClick={modalIsOpen}>
                <EditIcon className="fa-solid fa-pen"></EditIcon>
                Edit Profile
              </EdidButton>
              <UpdatedModale
                avatar={avatar}
                modalIsOpen={isOpen}
                closeModal={closeModal}
              />
            </Buttons>
          </Avatars>
        </Col>
      </Container>
      <Container>
        <Row>
          <Col w="30" md="100" sm="100">
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
                    </Image>
                  ))}
                {profileUser &&
                  profileUser.cover.length !== 0 &&
                  profileUser.cover.map((img, index) => (
                    <Image key={index}>
                      <Img src={img.url} alt="abu" />
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

const FILE_UPLOAD = gql`
  mutation ($url: String!, $userId: ID!) {
    uploadIamge(url: $url, userId: $userId) {
      url
    }
  }
`;

const COVER_UPLOAD = gql`
  mutation ($url: String!, $userId: ID!) {
    uploadCover(url: $url, userId: $userId) {
      url
    }
  }
`;

const GET_USER = gql`
  query {
    getUser {
      avatar
      cover
    }
  }
`;

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

export default PrivateProfile;
