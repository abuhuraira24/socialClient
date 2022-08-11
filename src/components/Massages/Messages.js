import Form from "./Form";
import {
  Activate,
  Avatar,
  Body,
  Close,
  H5,
  Header,
  Icon,
  Img,
  Left,
  Name,
  On,
  Right,
  Span,
  Wrapper,
  Footer,
} from "./MassagesStyle";

import Profile from "./Profile";

import SendMessage from "./Form";

import Chats from "./Text";

const Messages = () => {
  const id = "62ecf181a346ccb8522b870f";

  return (
    <Wrapper>
      <Header>
        <Left>
          <Avatar>
            <Img
              src="https://res.cloudinary.com/dza2t1htw/image/upload/v1660142979/285283233_359965916232900_2354054775476849342_n_fu4qam.jpg"
              alt="user"
            />
          </Avatar>
          <Name>
            <H5>Abu Huraria</H5>
            <Span>Active now</Span>
          </Name>
          <Activate></Activate>
        </Left>
        <Right>
          <Close>
            <Icon className="fa-solid fa-xmark"></Icon>
          </Close>
        </Right>
      </Header>
      <Body>
        <Profile />
        <Chats receiver={id} />
      </Body>
      <Footer>
        <SendMessage receiver={id} />
      </Footer>
    </Wrapper>
  );
};

export default Messages;
