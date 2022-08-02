import { gql, useQuery } from "@apollo/client";
import { Col, Container, Row } from "../../Styles/ElementsStyles";

import { useSearchParams } from "react-router-dom";

import "../SearchPage/index.scss";

//     const [searchParams] = useSearchParams();

//     console.log(searchParams.get('q'))

//     const params = useParams();

//     const {data} = useQuery(FETCH_PRODUCT)

//    if(data){
//     const posts = data.getPost;

//     const cb = (itm) => {

//        return itm.title.toLowerCase().includes(params.id)
//     }
//     const post = posts.filter(cb);
//     console.log(post)

//    }

//     return (
//         <div className="searchPage my-4">
//           <Container className="px-5">
//              <Row>
//                <Col className="col-md-6">
//                  <div className="searchTitle">
//                    <h2>Search results for {params.id}</h2>
//                  </div>
//                </Col>
//              </Row>
//           </Container>
//         </div>
//     );
// }

// const FETCH_PRODUCT = gql`
//  query{
//       getPost{
//         title,
//         firstName,
//         lastName,
//         username
//         body,
//         createdAt
//       }
//    }
// `;

// export default QueryPage;
import Posts from "./Posts";
import { Menu, Navlink, NotFound, SearchWrapper } from "./Styles";

const searchedPosts = (data, searchParams, loading) => {
  if (!loading) {
    const posts = data.getPost;
    const cb = (itm) => {
      return itm.username.toLowerCase().includes(searchParams.get("q"));
    };
    const post = posts.filter(cb);
    return post;
  }
};

const QueryPage = () => {
  const [searchParams] = useSearchParams();

  const { data, loading } = useQuery(FETCH_PRODUCT);

  const posts = searchedPosts(data, searchParams, loading);

  return (
    <SearchWrapper>
      <Container>
        <Row>
          <Col className="col-md-12 col-12">
            <div className="searchTitle mb-4">
              <h2>Search results for {searchParams.get("q")}</h2>
            </div>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col w="10"></Col>
          <Col w="80" md="80" sm-12>
            <Row>
              <Col className="col-12">
                <Row>
                  {typeof posts !== "undefined" &&
                    posts.map((post, index) => (
                      <Col key={index} className="col-12">
                        <Posts post={post} />
                      </Col>
                    ))}
                  <NotFound>
                    {posts && posts.length === 0 && (
                      <h2>Result doesn't match!</h2>
                    )}
                  </NotFound>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col w="10"></Col>
        </Row>
      </Container>
    </SearchWrapper>
  );
};

const FETCH_PRODUCT = gql`
  query {
    getPost {
      firstName
      lastName
      username
      body
      _id
      createdAt
    }
  }
`;

export default QueryPage;
