import { gql, useQuery } from "@apollo/client";
import { useContext, useState } from "react";

import SearchPanel from "../../SearchBar";
import { Header, Wrapper, Chat, SearchUser, Users } from "./Styles";
import User from "./User";
import { AuthContext } from "../../../context/auth";

const Conversations = ({ closeChat }) => {
  const [users, setUsers] = useState([]);

  const { user } = useContext(AuthContext);
  useQuery(GET_CONVERSATIONS, {
    onCompleted: (data) => {
      setUsers(data.getConversations);
    },
    variables: { userId: user.id },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <Wrapper>
      <Header>
        <Chat>Chats</Chat>
      </Header>
      <SearchUser>
        <SearchPanel />
      </SearchUser>
      <Users>
        {users?.map((u, index) => (
          <User key={index} user={u} />
        ))}
      </Users>
    </Wrapper>
  );
};

const GET_CONVERSATIONS = gql`
  query ($userId: ID!) {
    getConversations(userId: $userId) {
      id
      creator_id
      participant_id
      createdAt
    }
  }
`;

export default Conversations;
