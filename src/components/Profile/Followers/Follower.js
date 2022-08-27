import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Wrapper, Image, Img } from "./StyleElements";

const MyFollower = ({ user }) => {
  const [avatar, setAvatar] = useState("");

  useQuery(GET_USER_BY_ID, {
    onCompleted: (data) => {
      setAvatar(data.getUserById);
    },
    variables: { userId: user.userId },
  });
  return (
    <Image>
      {avatar && avatar.avatars.length !== 0 ? (
        <Img
          src={`${process.env.REACT_APP_SERVER_URL}/${avatar.avatars[0].avatar}`}
          alt="avatar"
        />
      ) : (
        <Img
          src="https://res.cloudinary.com/dza2t1htw/image/upload/v1661353556/user_mi2nyr.png"
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
