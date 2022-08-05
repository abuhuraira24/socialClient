import { gql, useMutation } from "@apollo/client";

import { useEffect, useState, useContext } from "react";

import { Form, TextArea, Update } from "./PopupStyles";

import { AuthContext } from "../../context/auth";

const PostUpdateForm = ({ post, closeModal }) => {
  let [value, setValue] = useState("");

  const { user, UpdatedPost } = useContext(AuthContext);

  useEffect(() => {
    setValue(post.body);
  }, [post]);

  const [update, { loading }] = useMutation(UPDATE_POST, {
    onCompleted: (data) => {
      setValue(data.updatePost.body);
      UpdatedPost(data.updatePost);
      closeModal();
    },
    onError(error) {
      closeModal();
    },
  });

  const ChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const SubmitHandler = (e) => {
    e.preventDefault();

    update({ variables: { postId: post._id, text: value } });
  };
  return (
    <Form onSubmit={SubmitHandler}>
      <TextArea
        type="text"
        onChange={ChangeHandler}
        value={value}
        rows="4"
        cols="50"
        maxlength="200"
      />
      <Update type="submit">Update</Update>
    </Form>
  );
};

const UPDATE_POST = gql`
  mutation ($postId: ID!, $text: String!) {
    updatePost(postId: $postId, text: $text) {
      body
      _id
    }
  }
`;

export default PostUpdateForm;
