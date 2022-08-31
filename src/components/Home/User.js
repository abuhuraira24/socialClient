import { useState, useContext } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";

import {
  H5,
  Users,
  Avatar,
  Img,
  Name,
  Span,
  Button,
  Icon,
  UserIcon,
  Empty,
  Avatars,
} from "./FollowerStyles";

import { NavLink } from "react-router-dom";

import { socket } from "../../hooks/socketio";

import axios from "axios";

import { AuthContext } from "../../context/auth";

const User = (user) => {
  let [isFollow, setFollow] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const { user: userInfo } = useContext(AuthContext);

  useQuery(GET_AVATAE_BY_ID, {
    onCompleted: (data) => {
      if (data) {
        setAvatar(data.getUserById);
      }
    },
    variables: {
      userId: user.user.id,
    },
  });

  let [addFollower] = useMutation(ADD_FOLLOWER, {
    onError(err) {
      console.log(err.graphQLErrors[0]);
    },
  });

  const addNotifications = (data, liked) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/notification`, data)
      .then((result) => {
        if (!isFollow) {
          socket.emit("sendNotification", data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let followHandler = (id) => {
    addFollower({ variables: { receiverId: id } });
    addNotifications({
      sender: userInfo.id,
      receiver: user.user.id,
      notiType: "follow",
      content: "is following you.",
      isRead: false,
      refId: userInfo.id,
    });
    if (isFollow) {
      setFollow(false);
    } else {
      setFollow(true);
    }
  };

  return (
    <Users>
      <Avatars>
        <NavLink to={`profile/${user.user.id}`}>
          <Avatar>
            {avatar && avatar.avatars.length !== 0 ? (
              <Img
                src={`${process.env.REACT_APP_SERVER_URL}/${avatar.avatars[0].avatar}`}
                alt="user"
              />
            ) : (
              <Img
                src="https://res.cloudinary.com/dza2t1htw/image/upload/v1661353556/user_mi2nyr.png"
                alt="user"
              />
            )}
          </Avatar>
        </NavLink>
      </Avatars>
      <Name>
        <NavLink to={`profile/${user.user.id}`}>
          <H5>
            {user.user.firstName} {user.user.lastName}
          </H5>
        </NavLink>

        <Span>{user.user.bio}</Span>

        {isFollow ? (
          <Button onClick={() => followHandler(user.user.id)}>
            <Icon className="fa-solid fa-check"></Icon>
            Following
          </Button>
        ) : (
          <Button onClick={() => followHandler(user.user.id)}>
            <Icon className="fa-solid fa-plus"></Icon>
            Follow
          </Button>
        )}
      </Name>
    </Users>
  );
};

const ADD_FOLLOWER = gql`
  mutation ($receiverId: String!) {
    addFollow(receiverId: $receiverId) {
      name
      userId
    }
  }
`;

const GET_AVATAE_BY_ID = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      avatars {
        avatar
      }
    }
  }
`;

export default User;
