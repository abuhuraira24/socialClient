import { gql, useMutation } from "@apollo/client";

import {
  Upload,
  UploadWrapper,
  Form,
  Button,
  Input,
  Add,
  ImageWrapper,
  Img,
  Image,
  SubmitAvatar,
  Exit,
  Save,
} from "./Styles";

import { useState, useContext } from "react";

import axios from "axios";

import { AuthContext } from "../../../context/auth";

const UploadForm = ({ closeModal }) => {
  const [avatar, setAvatar] = useState(null);

  const [file, setFile] = useState(null);

  // get user
  const { user } = useContext(AuthContext);

  const changeHandler = (e) => {
    if (e.target.validity.valid) {
      let file = e.target.files[0];
      setFile(e.target.files[0]);
      setAvatar(URL.createObjectURL(file));
    }
  };

  const cancelUpload = () => {
    setAvatar(null);
  };

  const [creatPost] = useMutation(CREATE_POST, {
    onCompleted: (data) => {
      console.log(data);
    },

    onError(error) {
      console.log(error);
    },
  });

  const submitImage = async (e) => {
    e.preventDefault();

    if (file) {
      let formData = new FormData();
      formData.append("avatar", file);
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/fileupload/${user.id}`,
          formData
        )
        .then((res) => {
          creatPost({
            variables: {
              body: "updated his profile picture.",
              postType: "profile",
              image: res.data.user.avatars[0].avatar,
            },
          });

          closeModal();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <UploadWrapper>
      {avatar && (
        <ImageWrapper>
          <Image>
            <Img src={avatar} alt="" />
          </Image>
        </ImageWrapper>
      )}

      <Form onSubmit={submitImage}>
        {!avatar && (
          <Upload>
            <Input name="avatar" onChange={changeHandler} type="file" />
            <Add>+</Add>
          </Upload>
        )}
        {avatar && (
          <SubmitAvatar>
            <Exit onClick={cancelUpload}>Cancel</Exit>
            <Save type="submit">Save</Save>
          </SubmitAvatar>
        )}
      </Form>
    </UploadWrapper>
  );
};

const CREATE_POST = gql`
  mutation ($body: String!, $postType: String!, $image: String!) {
    createPost(body: $body, postType: $postType, image: $image) {
      body
    }
  }
`;

export default UploadForm;
