import { useState } from "react";

import { gql, useMutation } from "@apollo/client";

import { Form, SearchBar, Button } from "../Navbar/NavbarElements";

import User from "./User";

import {
  Left,
  Results,
  Search,
  Wrapper,
  SearchText,
  Icon,
  Text,
} from "./Styles";

const SearchPanel = () => {
  const [text, setText] = useState("");

  const [toggle, setToggle] = useState(false);

  const [results, setResults] = useState([]);

  // Query
  let [query] = useMutation(SEARCH, {
    onCompleted: (data) => {
      setResults(data.search);
    },
  });

  // Change Handler
  const changeHandler = (e) => {
    setText(e.target.value);

    if (e.target.value.trim().length !== 0) {
      query({ variables: { name: e.target.value } });
    }
    if (e.target.value.trim().length === 0) {
      query({ variables: { name: "_" } });
    }
  };

  // Search bar Handler
  const showSearch = () => {
    setToggle(true);
  };

  const hideSearch = () => {
    setToggle(false);
    setResults(null);
  };

  // Submit Handler
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Wrapper toggle={toggle}>
      <Search>
        <Left toggle={toggle} onClick={hideSearch}>
          <i className="fa-solid fa-arrow-left-long"></i>
        </Left>
        <Form onSubmit={submitHandler}>
          <SearchBar
            type="text"
            placeholder="Search"
            name="text"
            onChange={changeHandler}
            autocomplete="false"
            onClick={showSearch}
            value={text}
          />
          {toggle ? (
            <Button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          ) : (
            <Button disabled type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          )}
        </Form>
      </Search>
      {toggle && (
        <Results>
          {text && (
            <SearchText>
              <Icon className="fa-solid fa-magnifying-glass"></Icon>
              <Text>{text}</Text>
            </SearchText>
          )}
          {results && results.map((u, i) => <User key={i} user={u} />)}
        </Results>
      )}
    </Wrapper>
  );
};

const SEARCH = gql`
  mutation ($name: String!) {
    search(name: $name) {
      firstName
      lastName
      id
      avatars {
        avatar
      }
    }
  }
`;

export default SearchPanel;
