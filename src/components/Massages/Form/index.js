import { gql, useMutation } from "@apollo/client";
import { useState, useContext } from "react";

import { FormWrapper, Input, Form, Send, Icon } from "./Styles";

import { AuthContext } from "../../../context/auth";

const SendMessage = ({ receiver }) => {
  const [text, setText] = useState("");

  const { user } = useContext(AuthContext);

  const [addMessage, { loading }] = useMutation(SEND_MESSAGE, {
    onCompleted: (data) => {
      console.log(data);
      setText("");
    },
    onError(error) {
      console.log(error);
    },
  });

  const changeHandler = (e) => {
    setText(e.target.value);
  };

  const submitHandler = (e) => {
    addMessage({ variables: { text, sender: user.id, receiver: receiver } });
    e.preventDefault();
  };

  return (
    <FormWrapper>
      <Form onSubmit={submitHandler}>
        <Input onChange={changeHandler} placeholder="Aa" />
        <Send type="submit">
          <Icon className="fa-solid fa-paper-plane"></Icon>
        </Send>
      </Form>
    </FormWrapper>
  );
};

const SEND_MESSAGE = gql`
  mutation ($text: String!, $sender: ID!, $receiver: ID!) {
    sendMessage(text: $text, sender: $sender, receiver: $receiver) {
      text
      sender
      receiver
      createdAt
    }
  }
`;

export default SendMessage;
