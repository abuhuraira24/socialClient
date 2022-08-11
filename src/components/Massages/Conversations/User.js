import { gql, useQuery } from "@apollo/client";
import { useState, useContext } from "react";

import moment from "moment";

import {
  Avatar,
  Img,
  Left,
  Name,
  Right,
  UserWrapper,
  Text,
  Date,
} from "./Styles";

import { time } from "../../Utils/timeFormater";

import { AuthContext } from "../../../context/auth";

const User = ({ user }) => {
  const [data, setData] = useState(null);

  const { setInbox } = useContext(AuthContext);

  useQuery(GET_USER, {
    onCompleted: (data) => {
      setData(data.getUserById);
    },
    variables: { userId: user.participant_id },
    onError(error) {
      console.log(error);
    },
  });

  const OpenHandler = (id) => {
    setInbox(user.creator_id, user.participant_id, true);
  };

  const { getTime } = time(moment(user.createdAt).fromNow(true));

  return (
    <UserWrapper>
      <Left>
        <Avatar>
          <Img src={data && data.avatars[0].avatar} alt="user" />
        </Avatar>
      </Left>
      <Right>
        <Name onClick={() => OpenHandler()}>
          {data && data.firstName + " " + data.lastName}
        </Name>
        <Text>Hello.</Text>
        <Date>{getTime.time}</Date>
      </Right>
    </UserWrapper>
  );
};

const GET_USER = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      avatars {
        avatar
      }
      firstName
      lastName
      id
    }
  }
`;

export default User;
