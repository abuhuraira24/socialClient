import { useState } from "react";

import { gql, useQuery } from "@apollo/client";

import { Link } from "react-router-dom";

import { Img } from "../styles";

import { Name, User, Users } from "../Friends/elemetStyles";

const Friend = (user) => {
  let [image, setIamge] = useState("");

  useQuery(GET_USER_BY_ID, {
    onCompleted: (data) => {
      if (data) {
        setIamge(data.getUserById.avatars[0].avatar);
      }
    },
    variables: {
      userId: user.user.userId,
    },
  });

  return (
    <Users>
      <Link to={`/profile/${user.user.userId}`}>
        <User>{image && <Img src={image} alt="" />}</User>
      </Link>
      <Link to={`/profile/${user.user.userId}`}>
        <Name>{user.user.name}</Name>
      </Link>
    </Users>
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

export default Friend;
