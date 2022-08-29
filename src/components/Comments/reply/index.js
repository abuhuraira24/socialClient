import { useContext } from "react";

import { Link, useParams } from "react-router-dom";

import { Avatar, Form, Input, Submit, Wrapper } from "./styles";

import { Image, Picture } from "../CommentsStyles";

import { gql, useQuery, useMutation } from "@apollo/client";

import { AuthContext } from "../../../context/auth";

import { useState } from "react";

import { socket } from "../../../hooks/socketio";

const Reply = ({ commentId }) => {
  const [value, setValue] = useState("");

  const [avatar, setAvatar] = useState("");

  const { user } = useContext(AuthContext);

  const { postId, userId } = useParams();

  useQuery(GET_USER_BY_ID, {
    onCompleted: (data) => {
      setAvatar(data.getUserById.avatars);
    },
    variables: { userId: user.id },
    onError(error) {
      console.log(error);
    },
  });

  const [addReply, { loading }] = useMutation(COMMET_REPLY, {
    onCompleted: () => {},
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
        postId: postId,
        commentId: commentId,
        body: value,
      },
    });
    socket.emit("getReply", {
      userId: user.id,
      creatorId: user.id,
      username: user.firstName + " " + user.lastName,
      body: value,
      createdAt: new Date().toISOString(),
    });
    setValue("");
  };

  return (
    <Wrapper>
      <Avatar>
        <Image>
          {avatar && avatar.length !== 0 ? (
            <Link to={`/profile/`}>
              <Picture src={avatar} alt="abu" />
            </Link>
          ) : (
            <Link to="">
              <Picture
                src="https://res.cloudinary.com/dza2t1htw/image/upload/v1661353556/user_mi2nyr.png"
                alt=""
              />
            </Link>
          )}
        </Image>
      </Avatar>
      <Form onSubmit={submitHandler}>
        <Input
          disabled
          onChange={changeHandler}
          value={value}
          placeholder="reply to ..."
        />
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
