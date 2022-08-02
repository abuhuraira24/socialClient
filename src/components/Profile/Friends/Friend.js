import { useState } from "react";

import { gql, useQuery } from "@apollo/client";

import {
  ImageWrapper,
  Photos,
  Header,
  SeeAll,
  Images,
  Image,
  Img,
} from "../styles";

import { Name, User, Users } from "../Friends/elemetStyles";

import { avatar } from "../../../hooks/avatar";

const Friend = (user) => {
  let [image, setIamge] = useState("");

  useQuery(GET_USER_BY_ID, {
    onCompleted: (data) => {
      if (data) {
        let img = avatar(data.getUserById.avatars);
        setIamge(img);
      }
    },
    variables: {
      userId: user.user.userId,
    },
  });

  return (
    <Users>
      <User>{image && <Img src={image} alt="" />}</User>
      <Name>{user.user.name}</Name>
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
