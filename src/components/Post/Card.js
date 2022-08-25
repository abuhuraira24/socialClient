import { useContext, useState, useEffect } from "react";

import { gql, useLazyQuery, useQuery } from "@apollo/client";

import Post from "./Post";

import { Card } from "./CartStyles";

import { AuthContext } from "../../context/auth";

const PostCart = () => {
  const [values, setValues] = useState({
    limit: 10,
    offset: 0,
  });

  let { getPosts, posts, Toaster, user } = useContext(AuthContext);

  // Lazy Query
  let [getDog] = useLazyQuery(FETCH_POSTT, {
    onCompleted: (data) => {
      getPosts(data.infinitePost);
    },

    variables: {
      ...values,
      values,
    },
  });

  useEffect(() => {
    getDog();
    setValues({
      limit: 100,
      offset: 0,
    });
  }, [getDog]);

  return (
    <div>
      <Toaster position="bottom-left" reverseOrder={false} />
      <Card className="mb-4">
        {posts &&
          typeof posts !== "undefined" &&
          Object.keys(posts).length !== 0 &&
          posts.map((post, index) => <Post key={index} post={post} />)}
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
  query ($limit: Int!, $offset: Int!) {
    infinitePost(limit: $limit, offset: $offset) {
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

export default PostCart;
