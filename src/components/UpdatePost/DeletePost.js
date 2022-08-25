import { useContext } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";

import { Button, Buttons } from "./PopupStyles";

import { AuthContext } from "../../context/auth";

const DeletePost = ({ postId, closeModal }) => {
  const { deletedPostId } = useContext(AuthContext);

  const navigate = useNavigate();
  // const notify = () => toast("Successfully deleted");
  const params = useParams();

  const [deletePost] = useMutation(DELETE, {
    onCompleted: (data) => {
      navigate("/");
      // deletedPostId(postId);
      closeModal();

      if (params.id) {
        navigate(`/profile/${params.id}`);
      } else {
        navigate("/");
      }
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

  console.log(postId);
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
