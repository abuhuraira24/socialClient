import { useEffect, useState, useContext } from "react";

import { gql, useMutation } from "@apollo/client";

import { AuthContext } from "../../context/auth";

import { Link } from "react-router-dom";
import {
  Left,
  Right,
  PeopleName,
  Wraper,
  Image,
  Img,
  Name,
  Span,
  Follow,
} from "./Styles";

const User = ({ result }) => {
  let [isFollow, setFollow] = useState(false);

  const avata = result.avatars[0].avatar;

  const { user } = useContext(AuthContext);

  let [addFollower] = useMutation(ADD_FOLLOWER, {
    variables: { receiverId: user.id },
    onError(err) {
      console.log(err.graphQLErrors[0]);
    },
  });

  let followHandler = (id) => {
    addFollower();
    if (isFollow) {
      setFollow(false);
    } else {
      setFollow(true);
    }
  };

  return (
    <Wraper>
      <Left>
        <Image>
          <Link to={`/profile/${result.id}`}>
            <Img src={avata} alt="user" />
          </Link>
        </Image>

        <PeopleName>
          <Link to={`/profile/${result.id}`}>
            <Name>
              {result.firstName} {result.lastName}
            </Name>
          </Link>

          <Span>{result.bio}</Span>
        </PeopleName>
      </Left>
      <Right>
        <Follow>
          <Link to={`/profile/${result.id}`}>View</Link>
        </Follow>
      </Right>
    </Wraper>
  );
};

const ADD_FOLLOWER = gql`
  mutation ($receiverId: String!) {
    addFollow(receiverId: $receiverId) {
      name
      userId
    }
  }
`;

export default User;
