import { gql, useQuery } from "@apollo/client";

import Popup from "./Popup";

import { Avatar, FakeInput, Img, PostWrapper, Span, Wrapper } from "./styles";

import { AuthContext } from "../../context/auth";
import { useContext, useState } from "react";

const CreatePost = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { user } = useContext(AuthContext);

  useQuery(GET_AVATAE_BY_ID, {
    onCompleted: (data) => {
      setUserInfo(data.getUserById.avatars);
    },
    variables: { userId: user.id },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <Wrapper>
      <PostWrapper>
        <Avatar>
          {userInfo && userInfo.length !== 0 && (
            <Img
              src={`${process.env.REACT_APP_SERVER_URL}/${userInfo[0].avatar}`}
              alt="user"
            />
          )}
          {userInfo && userInfo.length === 0 && (
            <Img
              src="https://res.cloudinary.com/dza2t1htw/image/upload/v1661353556/user_mi2nyr.png"
              alt="user"
            />
          )}
        </Avatar>
        <FakeInput>
          <Popup>
            {user && <Span>What's on your mind , {user.firstName}? </Span>}
          </Popup>
        </FakeInput>
      </PostWrapper>
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
export default CreatePost;
