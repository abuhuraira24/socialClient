import { useState } from "react";

import { gql, useQuery } from "@apollo/client";

import { Wrapper, FriendsWrapper } from "./elemetStyles";

import { Container, Row, Col } from "../../../Styles/ElementsStyles";

import {
  ImageWrapper,
  Photos,
  Header,
  SeeAll,
  Images,
  Image,
  Img,
} from "../styles";

import Friend from "./Friend";
import { useParams } from "react-router-dom";

const Friends = () => {
  let [folllowing, setFollowing] = useState([]);

  let userId = useParams();

  useQuery(GET_USER_BY_ID, {
    onCompleted: (data) => {
      if (data.getUserById.following) {
        setFollowing(data.getUserById.following);
      }
    },
    variables: {
      userId: userId.id,
    },
  });

  return (
    <Wrapper>
      <ImageWrapper>
        <Header>
          <Photos>Followers</Photos>
          <SeeAll>See All Followers</SeeAll>
        </Header>
        <FriendsWrapper>
          {folllowing?.map((user, index) => (
            <Friend key={index} user={user} />
          ))}
        </FriendsWrapper>
      </ImageWrapper>
    </Wrapper>
  );
};

const GET_USER_BY_ID = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      firstName
      lastName
      avatars {
        avatar
      }
      cover {
        url
      }
      followers {
        name
        userId
      }
      following {
        name
        userId
      }
    }
  }
`;

export default Friends;
