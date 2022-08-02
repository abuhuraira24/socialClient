import { useContext, useEffect, useState } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";

import { Like, Span } from "../Post/CartStyles";

import { AuthContext } from "../../context/auth";

// import socket from "../../hooks/socketio";

const LikeButton = ({ postId, likes, userId }) => {
  const [liked, setLiked] = useState(false);
  const [avatar, setAvatar] = useState("");

  useQuery(GET_USER_PIC, {
    onCompleted: (data) => {
      setAvatar(data.getUser.avatar);
    },
  });

  const { getLikes, user } = useContext(AuthContext);

  useEffect(() => {
    if (user && likes.find((like) => like.userId === user.id)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [addLike, { loading }] = useMutation(LIKE_POST, {
    update(_, result) {},
    variables: { postId },
  });

  let [addNotification] = useMutation(ADD_NOTIFICATION, {
    onCompleted: (data) => {
      console.log(data);
    },
    variables: {
      postId: postId,
      authorId: userId,
      name: user.firstName + " " + user.lastName,
      text: "Likes your post",
      type: "like",
      avatar: avatar && avatar,
    },
  });

  const likeHandler = () => {
    // if (userId && user && liked) {
    //   socket.emit("sentNotification", {
    //     senderInfo: {
    //       userId: user.id,
    //       name: user.firstName + " " + user.lastName,
    //       avatar: avatar && avatar,
    //       body: "Liked your post",
    //     },
    //     resiverInfo: {
    //       userId: userId,
    //     },
    //   });
    // }

    addLike();

    if (user.id !== userId) addNotification();
  };

  return loading ? (
    "loading"
  ) : (
    <Like onClick={likeHandler} liked={liked}>
      <i className="fa-brands fa-gratipay"></i>
      <Span>
        {likes.length + " "}

        {liked ? "like" : "like"}
      </Span>
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
const ADD_NOTIFICATION = gql`
  mutation createNotification(
    $postId: ID!
    $authorId: ID!
    $name: String!
    $text: String!
    $type: String!
    $avatar: String!
  ) {
    createNotification(
      postId: $postId
      authorId: $authorId
      name: $name
      text: $text
      type: $type
      avatar: $avatar
    ) {
      notification {
        senderId
      }
    }
  }
`;

const GET_USER_PIC = gql`
  query {
    getUser {
      avatar
    }
  }
`;

export default LikeButton;
