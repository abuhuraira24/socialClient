import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

export const Avatar = (postId) => {
  const [users, setUsers] = useState();
  useQuery(FET_ALL_USERS, {
    onCompleted: (data) => {
      setUsers(data.getUsers);
    },
  });

  let photo = () => {
    if (users && users.length > 0) {
      let user = users.filter((usr) => {
        return usr.id === postId;
      });

      if (user[0] && user[0].avatars[0]) {
        let photo = user[0].avatars[0].avatar;

        return photo;
      }
    }

    return photo;
  };
  return photo();
};

const FET_ALL_USERS = gql`
  query {
    getUsers {
      id
      avatars {
        avatar
      }
    }
  }
`;

// export default Avatar;

export const getCommnetAvatar = (userId, users) => {
  let user = users?.find((u) => u.id === userId);
};
