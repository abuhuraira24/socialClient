import { useContext, useEffect, useState } from "react";

import { gql, useMutation } from "@apollo/client";

import { Like, Span } from "../Post/CartStyles";

import { AuthContext } from "../../context/auth";

import { socket } from "../../hooks/socketio";

import axios from "axios";

const LikeButton = ({ postId, likes, userId }) => {
  const [liked, setLiked] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && likes.find((like) => like.userId === user.id)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [addLike, { loading }] = useMutation(LIKE_POST, {
    variables: { postId },
  });

  const addNotifications = (data, liked) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/notification`, data)
      .then((result) => {
        if (!liked) {
          socket.emit("sendNotification", data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const likeHandler = () => {
    if (user.id !== userId) {
      addNotifications(
        {
          sender: user.id,
          receiver: userId,
          notiType: "like",
          content: "is reacted in your post.",
          isRead: false,
          refId: postId,
        },
        liked
      );
    }
    addLike();
  };

  return loading ? (
    "loading"
  ) : (
    <Like onClick={likeHandler} liked={liked}>
      {/* <i className="fa-brands fa-gratipay"></i> */}
      <i class="fa-solid fa-heart"></i>
      <Span>{likes.length !== 0 && likes.length + " "}</Span>
    </Like>
  );
};

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      _id
      likes {
        createdAt
        userId
      }
    }
  }
`;

export default LikeButton;
