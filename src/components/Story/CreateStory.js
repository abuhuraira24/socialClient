import { gql, useQuery } from "@apollo/client";

import {
  AddStory,
  Icon,
  Image,
  ImageWrapper,
  Img,
  PlusIcon,
  Span,
} from "./storyStyles";

import avatar from "../Profile/avatar.jpg";

const CreateStory = () => {
  let { data: getUser } = useQuery(GET_AVATAR);

  console.log(getUser);
  return (
    <ImageWrapper>
      <Image>
        {getUser && <Img src={getUser.getUser.avatar} alt="user" />}
      </Image>

      <AddStory>
        <PlusIcon>
          <Icon className="fa-solid fa-plus" />
        </PlusIcon>
        <Span>Create Story</Span>
      </AddStory>
    </ImageWrapper>
  );
};

const GET_AVATAR = gql`
  query {
    getUser {
      avatar
    }
  }
`;

export default CreateStory;
