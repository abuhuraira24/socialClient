import { useState } from "react";

import { gql, useQuery } from "@apollo/client";

import { Link } from "react-router-dom";

import { Img } from "../styles";

import { Name, User, Users } from "../Friends/elemetStyles";

const Friend = (user) => {
  let [image, setIamge] = useState(null);

  useQuery(GET_USER_BY_ID, {
    onCompleted: (data) => {
      if (data) {
        setIamge(data.getUserById.avatars);
      }
    },
    variables: {
      userId: user.user.userId,
    },
  });

  return (
    <Users>
      <Link to={`/profile/${user.user.userId}`}>
        <User>
          {image && image.length !== 0 ? (
            <Img
              src={`${process.env.REACT_APP_SERVER_URL}/${image[0].avatar}`}
              alt=""
            />
          ) : (
            <Img
              src="https://res.cloudinary.com/dza2t1htw/image/upload/v1661353556/user_mi2nyr.png"
              alt=""
            />
          )}
        </User>
      </Link>
      <Link to={`/profile/${user.user.userId}`}>
        <Name>{user.user.name}</Name>
      </Link>
    </Users>
  );
};

const GET_USER_BY_ID = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      avatars {
        avatar
      }
    }
  }
`;

export default Friend;
