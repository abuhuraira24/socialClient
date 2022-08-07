import { useContext } from "react";

import { Link, useParams } from "react-router-dom";

import { Avatar, Form, Input, Submit, Wrapper } from "./styles";

import { Image, Picture } from "../CommentsStyles";

import { gql, useQuery, useMutation } from "@apollo/client";

import { AuthContext } from "../../../context/auth";
import { useState } from "react";

const Reply = ({ commentId }) => {
  const [value, setValue] = useState("");

  const [avatar, setAvatar] = useState("");

  const { user } = useContext(AuthContext);

  const { id } = useParams();

  useQuery(GET_USER_BY_ID, {
    onCompleted: (data) => {
      setAvatar(data.getUserById.avatars[0].avatar);
    },
    variables: { userId: user.id },
    onError(error) {
      console.log(error);
    },
  });

  const [addReply, { loading }] = useMutation(COMMET_REPLY, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    addReply({
      variables: {
        postId: id,
        commentId: commentId,
        body: value,
      },
    });
  };

  return (
    <Wrapper>
      <Avatar>
        <Image>
          {avatar && (
            <Link to={`/profile/`}>
              <Picture src={avatar} alt="abu" />
            </Link>
          )}
        </Image>
      </Avatar>
      <Form onSubmit={submitHandler}>
        <Input onChange={changeHandler} placeholder="reply to ..." />
        <Submit type="submit"></Submit>
      </Form>
    </Wrapper>
  );
};

const GET_USER_BY_ID = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      avatars {
        avatar
      }
    }
  }
`;

const COMMET_REPLY = gql`
  mutation ($postId: ID!, $commentId: ID!, $body: String!) {
    createReply(postId: $postId, commentId: $commentId, body: $body) {
      comments {
        author
      }
    }
  }
`;

export default Reply;
