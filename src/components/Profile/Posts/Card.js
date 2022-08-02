import { useContext, useState, useEffect } from "react";

import { gql, useLazyQuery } from "@apollo/client";

import { useParams } from "react-router-dom";

import Post from "../../Post/Post";

import { Card, Empty, Load, LoadMore } from "../../Post/CartStyles";

import { AuthContext } from "../../../context/auth";

const PostCart = () => {
  const [values, setValues] = useState({
    limit: 10,
    offset: 0,
  });

  let { user, getPosts, posts } = useContext(AuthContext);

  // userId
  const { id } = useParams();

  // Lazy Query
  let [getDog, { loading }] = useLazyQuery(FETCH_POSTT, {
    onCompleted: (data) => {
      getPosts(data.getPostsByUserId);
    },

    variables: {
      ...values,
      values,
    },
  });

  useEffect(() => {
    getDog({ variables: { userId: id } });
  }, [id, getDog]);

  const morePost = () => {
    setValues({
      ...values,
      limit: values.limit + 1,
    });
    getDog();
  };

  return (
    <div>
      <Card className="mb-4">
        {posts &&
          typeof posts !== "undefined" &&
          Object.keys(posts).length !== 0 &&
          posts.map((post, index) => <Post key={index} data={post} />)}
      </Card>
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
