import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Wrapper, Image, Img } from "./StyleElements";

const MyFollower = ({ user }) => {
  const [avatar, setAvatar] = useState("");

  useQuery(GET_USER_BY_ID, {
    onCompleted: (data) => {
      setAvatar(data.getUserById.avatars[0].avatar);
    },
    variables: { userId: user.userId },
  });
  return (
    <Image>
      {avatar && (
        <Img
          src={`${process.env.REACT_APP_SERVER_URL}/${avatar}`}
          alt="avatar"
        />
      )}
    </Image>
  );
};

// Get Single user
const GET_USER_BY_ID = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      avatars {
        avatar
      }
    }
  }
`;

export default MyFollower;
