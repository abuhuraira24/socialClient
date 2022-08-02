import { H5, ImageTwo, ImagTwo, Name, Wrapper } from "./storyStyles";

import {

  ImageWrapper,
} from "./storyStyles";

import avatar from "../Profile/avatar.jpg";

const SingleStory = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <ImageTwo>
          <ImagTwo src={avatar} alt="user" />
        </ImageTwo>

        <Name>
          <H5>Abu Huraira</H5>
        </Name>
      </ImageWrapper>
    </Wrapper>
  );
};

export default SingleStory;
