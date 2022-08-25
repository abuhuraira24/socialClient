import { useState } from "react";

import { gql, useQuery } from "@apollo/client";

import { useContext } from "react";

import Post from "../../Post/Post";

import { useParams } from "react-router-dom";

const Posts = () => {
  const [postInfo, setPostInfo] = useState(null);

  const id = useParams().id;
  useQuery(FETCH_POSTS, {
    onCompleted: (data) => {
      setPostInfo(data.getPostsByUserId);
    },
    variables: { userId: id },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <>
      {postInfo &&
        postInfo.length !== 0 &&
        postInfo.map((post, index) => <Post post={post} key={index} />)}
    </>
  );
};

const FETCH_POSTS = gql`
  query ($userId: ID!) {
    getPostsByUserId(userId: $userId) {
      firstName
      userId
      lastName
      _id
      body
      likes {
        userId
        createdAt
      }
      postType
      image

      createdAt
    }
  }
`;

export default Posts;
