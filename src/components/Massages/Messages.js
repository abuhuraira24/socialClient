import { useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client";
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
  Right,
  Span,
  Wrapper,
  Footer,
} from "./MassagesStyle";

import Profile from "./Profile";

import SendMessage from "./Form";

import Chats from "./Text";

import { AuthContext } from "../../context/auth";

const Messages = () => {
  const [profile, setProfile] = useState(null);

  const { openInbox, setInbox } = useContext(AuthContext);

  const closeInbox = () => {
    setInbox("", "", false);
  };

  useQuery(GET_USER, {
    onCompleted: (data) => {
      setProfile(data.getUserById);
    },
    variables: { userId: openInbox.receiver },
    onError(error) {
      console.log(error);
    },
  });

  console.log(openInbox);
  return (
    <Wrapper>
      <Header>
        <Left>
          {profile && (
            <Avatar>
              <Img src={profile.avatars[0].avatar} alt="user" />
            </Avatar>
          )}

          {profile && (
            <>
              <Name>
                <H5>
                  {profile.firstName} {profile.lastName}
                </H5>
                <Span>Active now</Span>
              </Name>
              <Activate></Activate>
            </>
          )}
        </Left>
        <Right>
          <Close onClick={closeInbox}>
            <Icon className="fa-solid fa-xmark"></Icon>
          </Close>
        </Right>
      </Header>
      <Body>
        {profile && <Profile profile={profile} />}

        <Chats receiver={openInbox.receiver} />
      </Body>
      <Footer>
        <SendMessage receiver={openInbox.receiver} />
      </Footer>
    </Wrapper>
  );
};

const GET_USER = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      firstName
      lastName
      avatars {
        avatar
      }
      bio
    }
  }
`;

export default Messages;
