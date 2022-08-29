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
  Comming,
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

import Posts from "../Profile/Posts/Posts";

import CreatePost from "../CreatePosts";

import Friends from "./Friends";

import UpdatedModale from "./UpdateProfile/Modal";
import Intro from "./Intro";
import Title from "../title";

import Modall from "./UpdateAvatar/Modal";

const PrivateProfile = () => {
  const [cover, setCover] = useState();
  const [avatar, setAvatar] = useState();
  const [profileUser, setProfileUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [posts, setPosts] = useState(null);
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
    onCompleted: (data) => {
      setPosts(data.getPostsByUserId);
    },
    variables: {
      userId: user.id,
    },
  });

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

  // Profile avatar changer modal hander
  const openAvatarChangerModal = () => {
    setOpenModal(true);
  };
  const closeAvatarChangerModal = () => {
    setOpenModal(false);
  };

  return (
    <CoverWrapper>
      <Title>
        {user.firstName}
        {user.lastName}
      </Title>
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
              {/* <Modal /> */}
              {/* Set Avatar */}
              {/* {!avatar && <UserIcon className="fa-solid fa-user"></UserIcon>} */}
              {profileUser && profileUser.avatars.length !== 0 ? (
                <Img
                  src={`${process.env.REACT_APP_SERVER_URL}/${profileUser.avatars[0].avatar}`}
                  alt="me"
                />
              ) : (
                <Img
                  src="https://res.cloudinary.com/dza2t1htw/image/upload/v1661353556/user_mi2nyr.png"
                  alt=""
                />
              )}
              {/* File Upload Input */}
              <UploadAvatar onClick={openAvatarChangerModal}>
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
              <Span> {profileUser?.following.length} Following</Span>
              <Followers>
                <MyFollowers />
              </Followers>
            </ProfileAvatar>
            {/* <Buttons>
              <EdidButton onClick={modalIsOpen}>
                <EditIcon className="fa-solid fa-pen"></EditIcon>
                Edit Profile
              </EdidButton>
              <UpdatedModale
                avatar={avatar}
                modalIsOpen={isOpen}
                closeModal={closeModal}
              />
            </Buttons> */}
          </Avatars>
          <Modall openModal={openModal} closeModal={closeAvatarChangerModal} />
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
                {posts &&
                  posts.map((post, index) => (
                    <>
                      {post.image !== "" && (
                        <Image key={index}>
                          <Img
                            src={`${process.env.REACT_APP_SERVER_URL}/${post.image}`}
                            alt="abu"
                          />
                        </Image>
                      )}
                    </>
                  ))}
              </Images>
            </ImageWrapper>

            <Friends />
          </Col>
          <Col w="50" md="100" sm="100">
            <CreatePost />
            <Posts />
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
      image
      postType
      createdAt
      likes {
        userId
      }
      _id
      userId
      # comments {
      #   body
      #   createdAt
      #   userId
      #   username
      # }
    }
  }
`;

export default PrivateProfile;
