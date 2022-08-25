import { useState, useContext } from "react";

import { gql, useMutation } from "@apollo/client";

import { CommentBox, Button, CommentInput, Form } from "../Post/CartStyles";

import { AuthContext } from "../../context/auth";
import { socket } from "../../hooks/socketio";

import axios from "axios";

const CommentBar = ({ postId, userId }) => {
  // Commet value
  const [value, setValues] = useState({
    body: "",
  });

  const { user } = useContext(AuthContext);

  const [addCommnet] = useMutation(CREATE_COMMENT, {
    variables: {
      userId: user.id,
      postId: postId,
      text: value.body,
    },
    onError(error) {
      console.log(error);
    },
  });

  const changeHandler = (e) => {
    setValues({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  // Send Notification
  const addNotifications = (data) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/notification`, data)
      .then((result) => {
        socket.emit("sendNotification", data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (value.body) {
      socket.emit("createComment", {
        userId: user.id,
        postId: postId,
        text: value.body,
        username: user.firstName + " " + user.lastName,
        createdAt: new Date().toISOString(),
      });

      addCommnet();

      if (user.id !== userId)
        addNotifications({
          sender: user.id,
          receiver: userId,
          notiType: "comment",
          content: "is commented on your post.",
          isRead: false,
          refId: postId,
        });

      setValues({
        body: "",
      });
    }
  };

  return (
    <CommentBox postId={postId}>
      <Form onSubmit={submitHandler}>
        {!user && (
          <CommentInput
            type="body"
            disabled
            placeholder="Write an answere..."
            name="body"
            value={value.body}
            onChange={changeHandler}
            autocomplete="nope"
          />
        )}
        {user && (
          <CommentInput
            type="body"
            placeholder="Write an answere..."
            name="body"
            value={value.body}
            onChange={changeHandler}
          />
        )}

        <Button type="submit"></Button>
      </Form>
    </CommentBox>
  );
};

const CREATE_COMMENT = gql`
  mutation ($userId: ID!, $postId: ID!, $text: String!) {
    createComment(userId: $userId, postId: $postId, text: $text) {
      postId
      userId
      text
      createdAt
    }
  }
`;

export default CommentBar;
