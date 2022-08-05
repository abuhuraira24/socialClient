import { useState } from "react";

import { gql, useQuery } from "@apollo/client";

import { useParams } from "react-router-dom";

import MyFollower from "./Follower";

const Followers = () => {
  let [followers, setFollowers] = useState([]);
  let [following, setFollowing] = useState([]);

  let userId = useParams();

  useQuery(GET_USER_BY_ID, {
    onCompleted: (data) => {
      if (data.getUserById.following) {
        setFollowers(data.getUserById.followers);
        setFollowing(data.getUserById.following);
      }
    },
    variables: {
      userId: userId.id,
    },
  });

  return (
    <>
      {followers?.slice(0, 8).map((user, index) => (
        <MyFollower key={index} user={user} />
      ))}
      {followers?.length === 0 &&
        following
          ?.slice(0, 8)
          .map((user, index) => <MyFollower key={index} user={user} />)}
    </>
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

export default Followers;
