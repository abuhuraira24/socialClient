import { useEffect, useState } from "react";

import Posts from "../Post";

import { useTheme } from "styled-components";

import { Container, Row, Col } from "../../Styles/ElementsStyles";
import { PostWrapper } from "./styles";

import Profile from "../Home/Profile";

import CreatePost from "../CreatePosts";

import Follower from "../Home/Followers";

import Navbar from "../Navbar/NavBar";

import SmallNavbar from "../Navbar/SmallNavbar";

import Story from "../Story";

const Home = () => {
  const theme = useTheme();

  useEffect(() => {
    const body = document.getElementsByTagName("body");
    body[0].style.backgroundColor = theme.bg;
    body[0].style.overflow = "auto";
  });

  return (
    <>
      <SmallNavbar />
      <Navbar />
      <PostWrapper>
        <Container>
          <Row>
            <Col w="25" md="30" none="true">
              <Profile />
            </Col>
            <Col w="50" md="40" sm="100">
              {/* <Story /> */}
              <CreatePost />
              <Posts />
            </Col>
            <Col w="25" md="30" none="true">
              <Follower />
            </Col>
          </Row>
        </Container>
      </PostWrapper>
    </>
  );
};

// const FETCH_POST = gql`
//   query ($limit: Int!, $offset: Int!) {
//     infinitePost(limit: $limit, offset: $offset) {
//       body
//     }
//   }
// `;

export default Home;
