import { useContext, useState, useEffect } from "react";

import { gql, useLazyQuery } from "@apollo/client";

import { useParams } from "react-router-dom";

import Post from "../../Post/Post";

import { Card, Empty } from "../../Post/CartStyles";

import { AuthContext } from "../../../context/auth";
import { NomorePost } from "../styles";

const PostCart = () => {
  const [values, setValues] = useState({
    limit: 10,
    offset: 0,
  });
  const [empty, setEmpty] = useState(false);

  let { getPosts, posts } = useContext(AuthContext);

  // userId
  const { id } = useParams();

  // Lazy Query
  let [getDog] = useLazyQuery(FETCH_POSTT, {
    onCompleted: (data) => {
      if (data.getPostsByUserId.length === 0) {
        setEmpty(true);
      }
      getPosts(data.getPostsByUserId);
    },

    variables: {
      ...values,
      values,
    },
  });

  useEffect(() => {
    getDog({ variables: { userId: id } });
    setValues({
      limit: 10,
      offset: 0,
    });
  }, [id, getDog]);

  console.log(posts && posts.length === 0);
  return (
    <div>
      <Card className="mb-4">
        {posts &&
          typeof posts !== "undefined" &&
          Object.keys(posts).length !== 0 &&
          posts.map((post, index) => <Post key={index} data={post} />)}
      </Card>
      {posts && posts.length === 0 && <NomorePost>No more posts</NomorePost>}
      {/* {posts && typeof posts !== "undefined" && posts.length > 9 && (
        <LoadMore>
          <Load type="button" onClick={morePost}>
            See more post
          </Load>
        </LoadMore>
      )} */}
    </div>
  );
};

const FETCH_POSTT = gql`
  query ($userId: ID!) {
    getPostsByUserId(userId: $userId) {
      firstName
      userId
      lastName
      _id
      body
      comments {
        username
        body
        createdAt
        userId
      }
      likes {
        userId
        createdAt
      }
      readTime
      createdAt
    }
  }
`;

export default PostCart;
