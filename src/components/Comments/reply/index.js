import { useContext } from "react";

import { Link } from "react-router-dom";

import { Avatar, Forms, Input, Wrapper } from "./styles";

import { Image, Picture } from "../CommentsStyles";

import { gql, useQuery } from "@apollo/client";

import { AuthContext } from "../../../context/auth";
import { useState } from "react";

const Reply = () => {
  const [avatar, setAvatar] = useState("");

  const { user } = useContext(AuthContext);

  useQuery(GET_USER_BY_ID, {
    onCompleted: (data) => {
      setAvatar(data.getUserById.avatars[0].avatar);
    },
    variables: { userId: user.id },
    onError(error) {
      console.log(error);
    },
  });
  return (
    <Wrapper>
      <Avatar>
        <Image>
          {avatar && (
            <Link to={`/profile/`}>
              <Picture src={avatar} alt="abu" />
            </Link>
          )}
        </Image>
      </Avatar>
      <Forms>
        <Input placeholder="reply to ..." />
      </Forms>
    </Wrapper>
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

export default Reply;
