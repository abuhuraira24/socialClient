import { gql, useQuery } from "@apollo/client";

import Popup from "./Popup";

import { Avatar, FakeInput, Img, PostWrapper, Span, Wrapper } from "./styles";

import { AuthContext } from "../../context/auth";
import { useContext } from "react";

const CreatePost = () => {
  let { data } = useQuery(GET_USER);

  const { user } = useContext(AuthContext);

  return (
    <Wrapper>
      <PostWrapper>
        <Avatar>
          {data && typeof data.getUser !== "undefined" && (
            <Img src={data.getUser.avatar} alt="user" />
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
const GET_USER = gql`
  query {
    getUser {
      avatar
      cover
    }
  }
`;
export default CreatePost;
