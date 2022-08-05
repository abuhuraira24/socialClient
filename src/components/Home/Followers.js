import { useContext } from "react";

import { gql, useQuery } from "@apollo/client";

import { H5, Title, Wrapper, Followers, Emty } from "./FollowerStyles";

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
        {publicUsers && publicUsers.publicUsers.length === 1 && (
          <Emty>No more friends</Emty>
        )}
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
      bio
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
