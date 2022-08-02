import { gql, useQuery } from "@apollo/client";

import { useContext } from "react";

import PostCart from "./Card";

import { AuthContext } from "../../context/auth";

const Posts = () => {
  return (
    <>
      <PostCart />
    </>
  );
};

export default Posts;
