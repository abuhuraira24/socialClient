import { gql, useQuery } from "@apollo/client";

import {
  Avatar,
  Cover,
  Wrapper,
  Image,
  BioNames,
  Name,
  Bio,
  EmptyAvatar,
  Icon,
  CoverImage,
} from "./ProfileStyles";

import decoder from "jwt-decode";
const Profile = () => {
  let token = localStorage.getItem("jwtToken");

  let user = decoder(token);
  const { data } = useQuery(GET_USER);

  const { data: bio } = useQuery(GET_BIO_DATA, {
    variables: { userId: user.id },
  });

  return (
    <Wrapper>
      {data && typeof data.getUser !== "undefined" && (
        <Cover>
          {data.getUser.cover !== "false" && data.getUser.cover !== 0 && (
            <CoverImage src={data.getUser.cover} alt="cover" />
          )}

          <Avatar>
            {data.getUser.avatar !== "false" && data.getUser.avatar !== 0 && (
              <EmptyAvatar>
                <Image src={data.getUser.avatar} alt="user" />
              </EmptyAvatar>
            )}
            {data && data.getUser.avatar === "false" && (
              <EmptyAvatar>
                <Icon className="fa-solid fa-user"></Icon>
              </EmptyAvatar>
            )}
          </Avatar>
        </Cover>
      )}
      <BioNames>
        {user && <Name>{user.firstName + " " + user.lastName}</Name>}
        <Bio>{bio && bio.getUserById && bio.getUserById.bio}</Bio>
      </BioNames>
    </Wrapper>
  );
};

const GET_USER = gql`
  query {
    getUser {
      avatar
      cover
    }
  }
`;

const GET_BIO_DATA = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      bio
    }
  }
`;

export default Profile;
