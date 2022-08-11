import { useState } from "react";

import { gql, useQuery } from "@apollo/client";

import { Span } from "../MassagesStyle";

import { Wrapper, Text } from "./Styles";
import SingleText from "./SingleText";

const Chats = ({ receiver }) => {
  const [messages, setMessages] = useState([]);

  useQuery(GET_TEXT, {
    onCompleted: (data) => {
      setMessages(data.getMessages);
    },
    variables: {
      receiver: receiver,
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <Wrapper>
      <Text>
        {messages?.map((text, index) => (
          <SingleText key={index} text={text} />
        ))}
      </Text>
    </Wrapper>
  );
};

const GET_TEXT = gql`
  query ($receiver: String!) {
    getMessages(receiver: $receiver) {
      text
      sender
      receiver
      createdAt
    }
  }
`;

export default Chats;
