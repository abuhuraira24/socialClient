import { useState, useContext, useEffect } from "react";

import { gql, useQuery } from "@apollo/client";

import { Span } from "../MassagesStyle";

import { Wrapper, Text } from "./Styles";

import SingleText from "./SingleText";

import { AuthContext } from "../../../context/auth";

const Chats = ({ receiver }) => {
  const [messages, setMessages] = useState([]);

  const { user } = useContext(AuthContext);

  useQuery(GET_TEXT, {
    onCompleted: (data) => {
      const arr = [...data.getMessages, data.getMessages];
      arr.sort(function (a, b) {
        var dateA = new Date(a.createdAt),
          dateB = new Date(b.createdAt);
        return dateA - dateB;
      });

      setMessages(arr);
    },
    variables: {
      sender: user.id,
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
  query ($sender: String!, $receiver: String!) {
    getMessages(sender: $sender, receiver: $receiver) {
      text
      sender
      receiver
      createdAt
    }
  }
`;

export default Chats;
