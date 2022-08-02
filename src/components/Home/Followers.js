import { useContext, useState } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";

import { H5, Title, Wrapper, Followers } from "./FollowerStyles";

import { AuthContext } from "../../context/auth";

import SmallNavbar from "../Navbar/SmallNavbar";

import User from "./User";

const Follower = () => {
  let { data: publicUsers } = useQuery(FETCH_USERS);
  let usr = useContext(AuthContext);

  return (
    <Wrapper>
      <SmallNavbar />
      <Followers>
        <Title>
          <H5>Add to your feed</H5>
        </Title>

        {publicUsers &&
          publicUsers.publicUsers?.slice(0, 3).map((user, index) => {
            return usr.user.id !== user.id && <User key={index} user={user} />;
          })}
      </Followers>
    </Wrapper>
  );
};

const FETCH_USERS = gql`
  query {
    publicUsers {
      firstName
      lastName
      id
    }
  }
`;
export const FETCH_AVATAR = gql`
  query {
    users {
      id
      firstName
      lastName
      avatars {
        avatar
      }
    }
  }
`;

export default Follower;
