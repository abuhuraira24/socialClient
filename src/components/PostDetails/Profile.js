import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import {
  Cover,
  ProfilePic,
  ProfileWrapper,
  ProfileName,
  Profilee,
  H3,
  Follow,
  Joined,
  PostAvatar,
  Image,
  Left,
  Right,
} from "./Styles";

const Profile = ({ post }) => {
  const [avatar, setvAvatar] = useState("");

  useQuery(GET_USER, {
    onCompleted: (data) => {
      setvAvatar(data.getUserById.avatars[0].avatar);
    },
    variables: {
      userId: post.userId,
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <ProfileWrapper>
      <Cover></Cover>

      <Profilee>
        <ProfilePic>
          <Image>
            {avatar && <PostAvatar src={avatar} alt="user" />}
            <PostAvatar />
          </Image>
        </ProfilePic>
        <ProfileName>
          <H3>
            {post.firstName + " "}
            {post.lastName}
          </H3>

          <Follow>Follow</Follow>
          <Joined>Joined 4 Jun, 22</Joined>
        </ProfileName>
      </Profilee>
    </ProfileWrapper>
  );
};

const GET_USER = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      avatars {
        avatar
      }
    }
  }
`;

export default Profile;
