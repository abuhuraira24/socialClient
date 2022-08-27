import { gql, useMutation, useQuery } from "@apollo/client";

import React, { useContext, useEffect, useState } from "react";

import Modal from "react-modal";

import { AuthContext } from "../../context/auth";

import { LineWave } from "react-loader-spinner";

import {
  Avatar,
  Button,
  Close,
  ClosedModal,
  H4,
  Img,
  Header,
  Privacy,
  Privat,
  Global,
  Name,
  H5,
  Body,
  Form,
  TextArea,
  Footer,
  PostButton,
  ImgWrapper,
  Input,
  InnerContent,
  Photo,
  H3,
  MenuBar,
  List,
  Icons,
  Icon,
  CloseToggle,
} from "./styles";
import { useTheme } from "styled-components";

import axios from "axios";

Modal.setAppElement("#root");

const Popup = ({ children }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [body, setBody] = useState("");

  const [toggle, setToggle] = useState(false);

  const [userInfo, setUserInfo] = useState(null);

  const [img, setImg] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    onCompleted: (data) => {
      setIsOpen(false);
    },
    onError(error) {},

    variables: { body, postType: "normal", image: "" },
  });

  let { user } = useContext(AuthContext);

  useQuery(GET_AVATAE_BY_ID, {
    onCompleted: (data) => {
      setUserInfo(data.getUserById.avatars);
    },
    variables: { userId: user.id },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    const body = document.querySelector("body");
    if (modalIsOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [modalIsOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const fileChangeHandler = (e) => {
    if (e.target.validity.valid || e.target.files[0]) {
      let file = e.target.files[0];
      setImg(URL.createObjectURL(file));
      setAvatar(file);
    }
  };

  const changeHandler = (e) => {
    if (e.target.validity.valid || e.target.files[0]) {
      setBody(e.target.value);
    }
  };

  // Submit post
  const submitHandler = (e) => {
    e.preventDefault();

    // createPost();

    let token = localStorage.getItem("jwtToken");

    if ((body || img) && token) {
      let formData = new FormData();

      formData.append("body", body);
      formData.append("avatar", avatar);
      console.log(avatar);
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/createpost`, formData, {
          headers: {
            "Content-Types": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Modal Styles
  let theme = useTheme();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      border: "none",
      background: theme.gray,
      transform: "translate(-50%, -50%)",
      // width: "40%",
      borderRadius: "15px",
      transition: ".5s",
      transitionDelay: "2s",
      overflow: "inherit",
    },
  };

  const toggler = () => {
    setToggle(true);
  };
  const clsoetoggler = () => {
    setToggle(false);
    setImg(null);
  };
  return (
    <div>
      <Button onClick={openModal}>{children}</Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ClosedModal>
          <H4>Create a post</H4>
          <Close onClick={closeModal} className="fa-solid fa-xmark"></Close>
        </ClosedModal>
        <Header>
          <Avatar>
            {userInfo && userInfo.length !== 0 && (
              <Img
                src={`${process.env.REACT_APP_SERVER_URL}/${userInfo[0].avatar}`}
                alt="avatar"
              />
            )}
            {userInfo && userInfo.length === 0 && (
              <Img
                src="https://res.cloudinary.com/dza2t1htw/image/upload/v1661353556/user_mi2nyr.png"
                alt="avatar"
              />
            )}
          </Avatar>
          <Privacy>
            <Name>
              <H5></H5>
            </Name>
            <Privat>
              <Global className="fa-solid fa-earth-asia"></Global>
              Public
            </Privat>
          </Privacy>
        </Header>
        <Body>
          <Form onSubmit={submitHandler} enctype="multipart/form-data">
            {user && (
              <TextArea
                className="scrollbar-hidden"
                placeholder={`What's on your mind, ${user.firstName}`}
                // value={body}
                onChange={changeHandler}
                rows="4"
                cols="50"
                maxlength="200"
              ></TextArea>
            )}

            {toggle && (
              <ImgWrapper>
                <CloseToggle onClick={clsoetoggler}>
                  <Icon className="fa-solid fa-xmark"></Icon>
                </CloseToggle>
                {!img && (
                  <>
                    <Input
                      onChange={fileChangeHandler}
                      type="file"
                      name="avatar"
                    />
                    <InnerContent>
                      <Photo className="fa-solid fa-photo-film"></Photo>
                      <H3>Add Photos</H3>
                    </InnerContent>
                  </>
                )}
                {img && <Img src={img} alt="" />}
              </ImgWrapper>
            )}

            <MenuBar>
              <List onClick={toggler}>
                <Icon className="fa-solid fa-photo-film"></Icon>
              </List>
            </MenuBar>
            <Footer>
              {(body || img) && !loading && (
                <PostButton type="submit">Post</PostButton>
              )}
              {!body && !img && (
                <PostButton
                  className="disabled"
                  disabled
                  onClick={submitHandler}
                >
                  Post
                </PostButton>
              )}
              {loading && (
                <LineWave
                  color="red"
                  firstLineColor="blue"
                  middleLineColor="green"
                  lastLineColor="grey"
                />
              )}
            </Footer>
          </Form>
        </Body>
      </Modal>
    </div>
  );
};

const CREATE_POST = gql`
  mutation createPost($body: String!, $postType: String!, $image: String!) {
    createPost(body: $body, postType: $postType, image: $image) {
      body
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

export default Popup;
