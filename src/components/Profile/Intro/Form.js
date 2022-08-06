import { gql, useMutation } from "@apollo/client";
import { useState, useContext, useEffect } from "react";

import { AddBioForm, Cancle, Input, Save } from "./styles";

import { AuthContext } from "../../../context/auth";

const Form = ({ closeForm }) => {
  const [value, setValue] = useState("");

  const { bio, bioUpdate } = useContext(AuthContext);

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const [addBio] = useMutation(ADD_BIO, {
    onCompleted: (data) => {
      bioUpdate(data.addBio);
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    setValue(bio);
  }, []);

  const FormSubmit = (e) => {
    e.preventDefault();

    if (value) {
      addBio({ variables: { text: value } });
    }
    closeForm();
  };

  return (
    <AddBioForm onSubmit={FormSubmit}>
      <Input onChange={changeHandler} value={value} />
      <Cancle onClick={closeForm}>Cancel</Cancle>
      <Save type="submit">Save</Save>
    </AddBioForm>
  );
};

const ADD_BIO = gql`
  mutation ($text: String!) {
    addBio(text: $text)
  }
`;

export default Form;
