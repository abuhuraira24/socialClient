import { useState, useContext } from "react";

import { gql, useMutation } from "@apollo/client";

import { CommentBox, Button, CommentInput, Form } from "../Post/CartStyles";

import { AuthContext } from "../../context/auth";

import socket from "../../hooks/socketio";

const CommentBar = ({ postId }) => {
  // Commet value
  const [value, setValues] = useState({
    body: "",
  });

  const { user, getComments } = useContext(AuthContext);

  const [addCommnet, { loading }] = useMutation(CREATE_COMMENT, {
    onCompleted: (data) => {
      console.log(data);
      getComments(data.createComment.comments);
    },
    variables: { postId: postId, body: value.body },
  });

  const changeHandler = (e) => {
    setValues({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();

    setValues({
      body: "",
    });

    addCommnet();
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
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      comments {
        body
        username
        createdAt
      }
    }
  }
`;

export default CommentBar;
