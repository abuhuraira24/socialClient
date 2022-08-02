import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";

import { Button, Buttons } from "./PopupStyles";

import { AuthContext } from "../../context/auth";

const DeletePost = ({ postId, closeModal }) => {
  const navigate = useNavigate();

  const { getPosts, deletedPostId } = useContext(AuthContext);

  const [deletePost, { loading }] = useMutation(DELETE, {
    onCompleted: (data) => {
      deletedPostId(postId);
      closeModal();
    },
    onError(error) {
      console.log(error);
    },
  });

  const deleteHandler = () => {
    deletePost({ variables: { postId } });
  };

  const dontDelete = () => {
    closeModal();
  };

  return (
    <Buttons>
      <Button onClick={dontDelete}>No</Button>
      <Button onClick={deleteHandler}>Yes</Button>
    </Buttons>
  );
};

const DELETE = gql`
  mutation ($postId: ID!) {
    deletePost(postId: $postId) {
      firstName
      userId
      lastName
      _id
      body
      comments {
        username
        body
        createdAt
        userId
      }
      likes {
        userId
        createdAt
      }
      readTime
      createdAt
    }
  }
`;
export default DeletePost;
