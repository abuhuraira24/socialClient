import { useContext, useState } from "react";

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

import { AuthContext } from "../../context/auth";

import { Link } from "react-router-dom";
const Profile = () => {
  // Get user Data
  const [userInfo, setUserInfo] = useState(null);
  const { user } = useContext(AuthContext);

  useQuery(GET_AVATAE_BY_ID, {
    onCompleted: (data) => {
      setUserInfo(data.getUserById.avatars);
      console.log(data.getUserById.avatars);
    },
    variables: { userId: user.id },
    onError(error) {
      console.log(error);
    },
  });

  const { data: bio } = useQuery(GET_BIO_DATA, {
    variables: { userId: user.id },
  });

  return (
    <Wrapper>
      <Cover>
        {/* <CoverImage
          src="https://res.cloudinary.com/dza2t1htw/image/upload/v1661353556/user_mi2nyr.png"
          alt="cover"
        /> */}

        <Avatar>
          <EmptyAvatar>
            {userInfo && userInfo.length === 0 && (
              <Image
                src="https://res.cloudinary.com/dza2t1htw/image/upload/v1661353556/user_mi2nyr.png"
                alt=""
              />
            )}
            {userInfo && userInfo.length !== 0 && (
              <Image
                src={`${process.env.REACT_APP_SERVER_URL}/${userInfo[0].avatar}`}
                alt=""
              />
            )}
          </EmptyAvatar>
        </Avatar>
      </Cover>

      <BioNames>
        <Link to={`/profile/${user.id}`}>
          {bio && bio.getUserById && (
            <Name>
              {bio.getUserById.firstName + " " + bio.getUserById.lastName}
            </Name>
          )}
        </Link>
        <Bio>{bio && bio.getUserById && bio.getUserById.bio}</Bio>
      </BioNames>
    </Wrapper>
  );
};

const GET_AVATAE_BY_ID = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      avatars {
        avatar
      }
    }
  }
`;

const GET_BIO_DATA = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      bio
      firstName
      lastName
    }
  }
`;

export default Profile;
