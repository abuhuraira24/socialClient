import { useContext, useState } from "react";

import { gql, useQuery } from "@apollo/client";

import { Header } from "../styles";

import { AddBio, Wrapper, Span, P, EditButton } from "./styles";

import { AuthContext } from "../../../context/auth";
import Form from "./Form";

const Intro = () => {
  const [toggler, setToggler] = useState(false);

  const [editToggler, setEditToggler] = useState(false);

  const { user, bioUpdate, bio } = useContext(AuthContext);

  const { data } = useQuery(GET_BIO_DATA, {
    onCompleted: (data) => {
      bioUpdate(data.getUserById.bio);
    },
    onError(error) {
      console.log(error);
    },
    variables: { userId: user.id },
  });

  const openForm = () => {
    setToggler(true);
    setEditToggler(true);
  };
  const closeForm = () => {
    setToggler(false);
    setEditToggler(false);
  };

  return (
    <Wrapper>
      <Header>
        <Span>Intro</Span>
      </Header>
      <AddBio>
        <P> {bio}</P>
        {!toggler && !bio && (
          <EditButton style={{ cursor: "pointer" }} onClick={openForm}>
            Add Bio
          </EditButton>
        )}
        {!editToggler && bio && (
          <EditButton style={{ cursor: "pointer" }} onClick={openForm}>
            Edit bio
          </EditButton>
        )}
      </AddBio>
      {toggler && <Form closeForm={closeForm} />}
    </Wrapper>
  );
};

const GET_BIO_DATA = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      bio
      firstName
    }
  }
`;

export default Intro;
