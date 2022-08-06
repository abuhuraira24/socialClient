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
} from "./styles";
import { useTheme } from "styled-components";

Modal.setAppElement("#root");

const Popup = ({ children }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [avatar, setAvatar] = useState("");

  const [body, setBody] = useState("");

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    onCompleted: (data) => {
      setIsOpen(false);
    },
    onError(error) {},

    variables: { body },
  });

  let { user } = useContext(AuthContext);

  useEffect(() => {
    const body = document.querySelector("body");
    if (modalIsOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [modalIsOpen]);

  useQuery(GET_USER, {
    onCompleted: (data) => {
      setAvatar(data.getUser.avatar);
    },
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const changeHandler = (e) => {
    setBody(e.target.value);
  };

  const submitHandler = () => {
    createPost();
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
          <Avatar>{avatar && <Img src={avatar} alt="avatar" />}</Avatar>
          <Privacy>
            <Name>
              <H5></H5>
            </Name>
            <Privat>
              {/* <i class="fa-solid fa-earth-asia"></i> */}
              <Global className="fa-solid fa-earth-asia"></Global>
              Public
            </Privat>
          </Privacy>
        </Header>
        <Body>
          <Form>
            {user && (
              <TextArea
                className="scrollbar-hidden"
                placeholder={`What's on your mind, ${user.firstName}`}
                value={body}
                onChange={changeHandler}
                rows="4"
                cols="50"
                maxlength="200"
              ></TextArea>
            )}
          </Form>
        </Body>
        <Footer>
          {body && body.trim() && !loading && (
            <PostButton onClick={submitHandler}>Post</PostButton>
          )}
          {!body && (
            <PostButton className="disabled" disabled onClick={submitHandler}>
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
      </Modal>
    </div>
  );
};

const GET_USER = gql`
  query {
    getUser {
      avatar
      cover
    }
  }
`;

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      body
    }
  }
`;

export default Popup;
