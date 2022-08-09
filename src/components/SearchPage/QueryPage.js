import { useEffect, useState } from "react";

import { useTheme } from "styled-components";

import { gql, useMutation } from "@apollo/client";

import { Col, Container, Row } from "../../Styles/ElementsStyles";

import { useSearchParams, useParams } from "react-router-dom";

import "../SearchPage/index.scss";

import { NotFound, SearchWrapper, Title } from "./Styles";

import Navbar from "../Navbar/NavBar";
import SmallNavbar from "../Navbar/SmallNavbar";
import User from "./User";
import { H5 } from "../Home/FollowerStyles";
import QueryMenu from "./QueryMenu";

const QueryPage = () => {
  const [users, setUsers] = useState([]);

  const [searchParams] = useSearchParams();

  const { text } = useParams();

  const [result, { loading }] = useMutation(SEARCH, {
    onCompleted: (data) => {
      setUsers(data.search);
    },

    onError(err) {
      console.log(err);
    },
  });

  useEffect(() => {
    result({ variables: { name: text } });
  }, [result, text]);

  const theme = useTheme();
  useEffect(() => {
    const body = document.getElementsByTagName("body");
    body[0].style.backgroundColor = theme.bg;
    body[0].style.overflow = "auto";
  });

  return (
    <SearchWrapper>
      <Navbar />
      <SmallNavbar />
      <Container>
        <Row>
          <Col>
            <div className="searchTitle mb-4">
              <Title>Search results for {text}</Title>
            </div>
          </Col>
        </Row>

        <Row>
          <Col w="20" sm="100">
            <QueryMenu />
          </Col>
          <Col w="70" md="70" sm="100">
            {users &&
              users.map((user, index) => <User key={index} result={user} />)}

            {/* <Title>Result doesn't match!</Title> */}
          </Col>
          <Col w="10"></Col>
        </Row>
      </Container>
    </SearchWrapper>
  );
};

const SEARCH = gql`
  mutation ($name: String!) {
    search(name: $name) {
      firstName
      lastName
      id
      bio
      followers {
        name
        userId
      }
      avatars {
        avatar
      }
    }
  }
`;

export default QueryPage;
