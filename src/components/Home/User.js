import { useState } from "react";

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

import getAvatarById from "../../hooks/avatarById";

const User = (user) => {
  let [isFollow, setFollow] = useState(false);

  let { data, loading } = useQuery(GET_AVATAE_BY_ID, {
    variables: {
      userId: user.user.id,
    },
  });

  let avatar = getAvatarById(data, loading);

  let [addFollower, { data: info }] = useMutation(ADD_FOLLOWER, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError(err) {
      console.log(err.graphQLErrors[0]);
    },
  });
  let followHandler = (id) => {
    addFollower({ variables: { receiverId: id } });
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
            {avatar.images && <Img src={avatar.images.avatar} alt="user" />}

            <Empty>
              <UserIcon className="fa-solid fa-user"></UserIcon>
            </Empty>
          </Avatar>
        </NavLink>
      </Avatars>
      <Name>
        <NavLink to={`profile/${user.user.id}`}>
          <H5>
            {user.user.firstName} {user.user.lastName}
          </H5>
        </NavLink>

        <Span>Web Application Developer</Span>

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
