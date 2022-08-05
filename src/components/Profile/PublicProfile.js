// import { useState, useContext, useEffect } from "react";

// import { useTheme } from "styled-components";

// import { gql, useMutation, useQuery } from "@apollo/client";

// import { Container, Col, Row } from "../../Styles/ElementsStyles";

// import { AuthContext } from "../../context/auth";

// import {
//   Avatar,
//   Avatars,
//   Bio,
//   Buttons,
//   Cover,
//   CoverWrapper,
//   EditIcon,
//   Followers,
//   H3,
//   Header,
//   Image,
//   Images,
//   ImageWrapper,
//   Img,
//   Li,
//   Photos,
//   ProfileAvatar,
//   SeeAll,
//   Span,
//   Ul,
//   UserIcon,
//   FollowButton,
//   MassageButton,
//   CoverPic,
// } from "./styles";
// import { useParams } from "react-router-dom";

// import PostCart from "../Profile/Posts/Card";

// import Friends from "./Friends";

// const PublicProfile = () => {
//   const [avatar, setAvatar] = useState();
//   const [profileUser, setProfileUser] = useState(null);

//   const [isFollow, setFollow] = useState(false);

//   let userId = useParams();
//   useQuery(GET_USER_BY_ID, {
//     onCompleted: (data) => {
//       setProfileUser(data.getUserById);
//     },
//     variables: {
//       userId: userId.id,
//     },
//   });

//   let [addFollow] = useMutation(ADD_FOLLOWER, {
//     onCompleted: (data) => {
//       console.log(data);
//     },
//   });

//   const { data } = useQuery(GET_USER);

//   // Context api
//   let { user } = useContext(AuthContext);

//   // Get posts
//   useQuery(GET_POSTS_BY_USERS_ID, {
//     variables: {
//       userId: user.id,
//     },
//   });

//   // is Already Follow

//   useEffect(() => {
//     if (
//       profileUser &&
//       profileUser.followers.length !== 0 &&
//       profileUser.followers.find((f) => f.userId === user.id)
//     ) {
//       setFollow(true);
//     }
//   }, [profileUser, user.id]);

//   // Submit Avatar
//   useEffect(() => {
//     if (data && typeof data.getUser !== "undefined") {
//       setAvatar(data.getUser.avatar);

//       // console.log(data.getUser);
//     }
//   }, [data]);

//   const FollowHandler = () => {
//     addFollow({
//       variables: { receiverId: userId.id },
//     });
//     if (isFollow) {
//       setFollow(false);
//     } else {
//       setFollow(true);
//     }
//   };

//   const theme = useTheme();

//   useEffect(() => {
//     const body = document.getElementsByTagName("body");
//     body[0].style.backgroundColor = theme.bg;
//     body[0].style.overflow = "auto";
//   });

//   return (
//     <CoverWrapper>
//       <Container>
//         <Col w="100">
//           <Cover>
//             <CoverPic>
//               {profileUser && profileUser.cover.length !== 0 && (
//                 <img src={profileUser.cover[0].url} alt="me" />
//               )}
//             </CoverPic>
//             <Avatars>
//               <Avatar file={avatar}>
//                 {!avatar && <UserIcon className="fa-solid fa-user"></UserIcon>}
//                 {profileUser && profileUser.avatars.length !== 0 && (
//                   <img src={profileUser.avatars[0].avatar} alt="me" />
//                 )}
//               </Avatar>
//             </Avatars>
//           </Cover>
//           <ProfileAvatar>
//             <H3>
//               {" "}
//               {profileUser && profileUser.firstName}{" "}
//               {profileUser && profileUser.lastName}
//             </H3>
//             <Bio>Web Application Developer</Bio>
//           </ProfileAvatar>

//           <Followers>
//             <Ul>
//               <Li>
//                 <Span> {profileUser && profileUser.followers.length} </Span>
//                 <Span>Followers</Span>
//               </Li>
//               <Li>
//                 <Span>{profileUser && profileUser.following.length} </Span>
//                 <Span>Following</Span>
//               </Li>
//             </Ul>
//             <Buttons>
//               <MassageButton to="/">
//                 <EditIcon className="fa-solid fa-comment-dots"></EditIcon>
//                 Massage
//               </MassageButton>
//               {isFollow ? (
//                 <FollowButton onClick={FollowHandler}>
//                   <EditIcon className="fa-solid fa-check"></EditIcon>
//                   Following
//                 </FollowButton>
//               ) : (
//                 <FollowButton onClick={FollowHandler}>
//                   <EditIcon className="fa-solid fa-user-plus"></EditIcon>
//                   Follow
//                 </FollowButton>
//               )}
//             </Buttons>
//           </Followers>
//         </Col>
//       </Container>
//       <Container>
//         <Row>
//           <Col w="40" md="40" sm="100">
//             <ImageWrapper display="none">
//               <Header display="none">
//                 <Photos>Photos</Photos>
//                 <SeeAll>See All Photos</SeeAll>
//               </Header>
//               <Images>
//                 {profileUser &&
//                   profileUser.avatars.length !== 0 &&
//                   profileUser.avatars.map((img, index) => (
//                     <Image key={index}>
//                       <Img src={img.avatar} alt="abu" />
//                     </Image>
//                   ))}
//                 {profileUser &&
//                   profileUser.cover.length !== 0 &&
//                   profileUser.cover.map((img, index) => (
//                     <Image key={index}>
//                       <Img src={img.url} alt="abu" />
//                     </Image>
//                   ))}
//               </Images>
//             </ImageWrapper>
//             <Friends />
//           </Col>
//           <Col w="50" md="60" sm="100">
//             <PostCart />
//           </Col>
//           <Col w="10" mdnone="true"></Col>
//         </Row>
//       </Container>
//     </CoverWrapper>
//   );
// };

// const GET_USER = gql`
//   query {
//     getUser {
//       avatar
//       cover
//     }
//   }
// `;

// const GET_USER_BY_ID = gql`
//   query ($userId: ID!) {
//     getUserById(userId: $userId) {
//       firstName
//       lastName
//       avatars {
//         avatar
//       }
//       cover {
//         url
//       }
//       followers {
//         name
//         userId
//       }
//       following {
//         name
//         userId
//       }
//     }
//   }
// `;

// export const GET_POSTS_BY_USERS_ID = gql`
//   query ($userId: ID!) {
//     getPostsByUserId(userId: $userId) {
//       firstName
//       lastName
//       body
//       userId
//       createdAt
//       likes {
//         userId
//       }
//       userId
//       comments {
//         body
//         createdAt
//         userId
//         username
//       }
//     }
//   }
// `;

// const ADD_FOLLOWER = gql`
//   mutation ($receiverId: String!) {
//     addFollow(receiverId: $receiverId) {
//       name
//       userId
//     }
//   }
// `;

// export default PublicProfile;

import { useState, useContext, useEffect } from "react";

import { gql, useQuery, useMutation } from "@apollo/client";

import { useTheme } from "styled-components";

import { Container, Col, Row } from "../../Styles/ElementsStyles";

import { AuthContext } from "../../context/auth";

import MyFollowers from "./Followers";

import {
  Avatar,
  Avatars,
  Buttons,
  Cover,
  CoverPic,
  CoverWrapper,
  EditIcon,
  Followers,
  H3,
  Header,
  Image,
  Images,
  ImageWrapper,
  Img,
  Photos,
  ProfileAvatar,
  SeeAll,
  Span,
  FollowButton,
} from "./styles";
import { useParams } from "react-router-dom";

import PostCart from "../Profile/Posts/Card";

import CreatePost from "../CreatePosts";

import Friends from "./Friends";

const PublicProfile = () => {
  const [profileUser, setProfileUser] = useState(null);

  const [isFollow, setFollow] = useState(false);

  let userId = useParams();
  useQuery(GET_USER_BY_ID, {
    onCompleted: (data) => {
      setProfileUser(data.getUserById);
    },
    variables: {
      userId: userId.id,
    },
    onError(error) {
      console.log(error);
    },
  });

  // Context api
  let { user } = useContext(AuthContext);

  // Get posts
  useQuery(GET_POSTS_BY_USERS_ID, {
    variables: {
      userId: user.id,
    },
  });

  const theme = useTheme();

  useEffect(() => {
    const body = document.getElementsByTagName("body");
    body[0].style.backgroundColor = theme.bg;
    body[0].style.overflow = "auto";
  });

  // is Already Follow

  useEffect(() => {
    if (
      profileUser &&
      profileUser.followers.length !== 0 &&
      profileUser.followers.find((f) => f.userId === user.id)
    ) {
      setFollow(true);
    }
  }, [profileUser, user.id]);

  let [addFollow] = useMutation(ADD_FOLLOWER, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const FollowHandler = () => {
    addFollow({
      variables: { receiverId: userId.id },
    });
    if (isFollow) {
      setFollow(false);
    } else {
      setFollow(true);
    }
  };

  console.log(isFollow);
  return (
    <CoverWrapper>
      <Container>
        <Col w="100">
          <Cover>
            <CoverPic>
              {/* Cover photo */}
              {profileUser && <img src={profileUser.cover[0].url} alt="me" />}
            </CoverPic>
          </Cover>

          {/* Profile avatar */}
          <Avatars>
            <Avatar>
              {profileUser && (
                <img src={profileUser.avatars[0].avatar} alt="me" />
              )}
            </Avatar>

            {/* Profile Name and Followers */}
            <ProfileAvatar>
              <H3>
                {" "}
                {profileUser?.firstName} {profileUser?.lastName}
              </H3>
              <Span> {profileUser?.followers.length} Followers .</Span>
              <Span> {profileUser?.following.length} Following</Span>
              <Followers>
                <MyFollowers />
              </Followers>
            </ProfileAvatar>
            <Buttons>
              {isFollow ? (
                <FollowButton onClick={FollowHandler}>
                  <EditIcon className="fa-solid fa-check"></EditIcon>
                  Following
                </FollowButton>
              ) : (
                <FollowButton onClick={FollowHandler}>
                  <EditIcon className="fa-solid fa-user-plus"></EditIcon>
                  Follow
                </FollowButton>
              )}
            </Buttons>
          </Avatars>
        </Col>
      </Container>
      <Container>
        <Row>
          <Col w="30" md="100" sm="100">
            <ImageWrapper display="none">
              <Header>
                <Photos>Photos</Photos>
                <SeeAll>See All Photos</SeeAll>
              </Header>
              <Images>
                {profileUser &&
                  profileUser.avatars.length !== 0 &&
                  profileUser.avatars.map((img, index) => (
                    <Image key={index}>
                      <Img src={img.avatar} alt="abu" />
                    </Image>
                  ))}
                {profileUser &&
                  profileUser.cover.length !== 0 &&
                  profileUser.cover.map((img, index) => (
                    <Image key={index}>
                      <Img src={img.url} alt="abu" />
                    </Image>
                  ))}
              </Images>
            </ImageWrapper>

            <Friends />
          </Col>
          <Col w="50" md="100" sm="100">
            <CreatePost />
            <PostCart />
          </Col>
          <Col w="20" mdnone="true" none="true"></Col>
        </Row>
      </Container>
    </CoverWrapper>
  );
};

const GET_USER_BY_ID = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      firstName
      lastName
      avatars {
        avatar
      }
      cover {
        url
      }
      followers {
        name
        userId
      }
      following {
        name
        userId
      }
    }
  }
`;

const GET_POSTS_BY_USERS_ID = gql`
  query ($userId: ID!) {
    getPostsByUserId(userId: $userId) {
      firstName
      lastName
      body
      userId
      createdAt
      likes {
        userId
      }
      userId
      comments {
        body
        createdAt
        userId
        username
      }
    }
  }
`;

const ADD_FOLLOWER = gql`
  mutation ($receiverId: String!) {
    addFollow(receiverId: $receiverId) {
      name
      userId
    }
  }
`;

export default PublicProfile;
