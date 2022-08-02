import { useState, useContext, useEffect } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";

import { useTheme } from "styled-components";

import { Container, Col } from "../../Styles/ElementsStyles";

import Axios from "axios";

import { AuthContext } from "../../context/auth";

import {
  Avatar,
  Avatars,
  Bio,
  Camera,
  Cover,
  CoverPic,
  CoverWrapper,
  EdidButton,
  EditIcon,
  Followers,
  H3,
  Li,
  ProfileAvatar,
  Span,
  Ul,
  UploadAvatar,
  UploadCover,
  UploadInput,
  UserIcon,
} from "./styles";

const Profile = () => {
  const [cover, setCover] = useState();
  const [avatar, setAvatar] = useState();
  const [loading, setLoading] = useState(false);
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

  const { data } = useQuery(GET_USER);
  // Avatar Upload
  let [mutate] = useMutation(FILE_UPLOAD);

  // Context api
  let { user } = useContext(AuthContext);

  // Submit Avatar
  const onChange = (e) => {
    if (e.target.validity.valid && user) {
      let file = e.target.files[0];
      setAvatar(URL.createObjectURL(file));

      let formData = new FormData();

      setLoading(true);
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      Axios.post(
        "https://api.cloudinary.com/v1_1/dza2t1htw/image/upload",
        formData
      )
        .then((res) => {
          mutate({
            variables: {
              url: res.data.url,
              userId: user.id,
            },
          });

          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
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

  return (
    <CoverWrapper>
      <Container>
        <Col w="100">
          <Cover>
            <CoverPic>
              {cover && <img src={cover} alt="me" />}

              <UploadCover>
                <UploadInput type="file" onChange={coverHandler} />
                <Camera className="fa-solid fa-camera"></Camera>
              </UploadCover>
            </CoverPic>

            <Avatars>
              <Avatar loading={loading} file={avatar}>
                {!avatar && <UserIcon className="fa-solid fa-user"></UserIcon>}
                {avatar && <img src={avatar} alt="me" />}
              </Avatar>
              <UploadAvatar>
                <UploadInput type="file" onChange={onChange} />
                <Camera className="fa-solid fa-camera"></Camera>
              </UploadAvatar>
            </Avatars>
          </Cover>
          <ProfileAvatar>
            <H3>
              {" "}
              {user.firstName} {user.lastName}
            </H3>
            <Bio>Web Application Developer</Bio>
          </ProfileAvatar>

          <Followers>
            <Ul>
              <Li>
                <Span>0 </Span>
                <Span>Posts</Span>
              </Li>
              <Li>
                <Span>0 </Span>
                <Span>Followers</Span>
              </Li>
              <Li>
                <Span>0 </Span>
                <Span>Following</Span>
              </Li>
            </Ul>
            <EdidButton to="/">
              <EditIcon className="fa-solid fa-pen"></EditIcon>
              Edit Profile
            </EdidButton>
          </Followers>
        </Col>
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
export default Profile;
