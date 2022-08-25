// import { useContext, useEffect, useState } from "react";

// import { gql, useQuery } from "@apollo/client";
// import {
//   Comments,
//   LikeComments,
//   Comment,
//   Span,
//   CardBody,
//   UserName,
//   CardSubtitle,
//   CircleImage,
//   UserPic,
//   More,
//   CardText,
//   Users,
//   Left,
//   Right,
//   Dot,
// } from "../../Post/CartStyles";

// import axios from "axios";

// import LikeButton from "../../LikeButton";

// import Popup from "../../Popup/Popup";

// import { NavLink, Link } from "react-router-dom";

// import moment from "moment";

// import { AuthContext } from "../../../context/auth";

// import { getCommnetAvatar } from "../../Helper/helper";

// import UpdatedPost from "../../UpdatePost";

// const Post = ({ ...props }) => {
//   const [image, setImage] = useState(null);

//   const [toggle, setToggle] = useState(false);

//   const [commnetSize, setCommentSize] = useState(null);

//   const { user } = useContext(AuthContext);

//   let { post } = props;

//   let sortText;
//   let text;

//   if (post.body.length > 400) {
//     sortText = post.body.slice(0, 400);
//   } else {
//     text = post.body;
//   }

//   // Query User avata or data

//   useQuery(GET_AVATAE_BY_ID, {
//     onCompleted: (data) => {
//       if (data) {
//         setImage(data.getUserById.avatars[0].avatar);
//       }
//     },
//     variables: { userId: post.userId },
//     onError(error) {
//       console.log(error);
//     },
//   });
//   useEffect(() => {
//     getCommnetAvatar(post.comments);
//   }, [post.comments]);

//   const postToggler = () => {
//     if (toggle) {
//       setToggle(false);
//     } else {
//       setToggle(true);
//     }
//   };

//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_SERVER_URL}/getcomments/${post._id}`)
//       .then((res) => {
//         setCommentSize(res.data.comments.length);
//       })
//       .catch((error) => {});
//   }, [post]);

//   return (
//     <CardBody id={`${post._id}`} className="mb-4 ">
//       <Users>
//         <Left>
//           <UserPic>{image && <CircleImage src={image} alt="user" />}</UserPic>

//           <Link to={`/profile/${post.userId}`}>
//             <UserName>{post.firstName + " " + post.lastName}</UserName>
//           </Link>
//         </Left>
//         <Right>
//           <Dot onClick={postToggler} className="fa-solid fa-ellipsis"></Dot>
//           <UpdatedPost toggler={toggle} post={post} />
//         </Right>
//       </Users>

//       <CardSubtitle className="mb-2 mt-2 text-muted pb-1" tag="h6">
//         {moment(post.createdAt).fromNow(true)}
//       </CardSubtitle>

//       <CardText id="post">
//         {sortText}
//         {text}
//         {sortText && (
//           <More>
//             <NavLink to={`/post/${post._id}/${post.userId}`}>
//               See more...
//             </NavLink>
//           </More>
//         )}
//       </CardText>

//       <Comments>
//         <LikeComments>
//           {!user && <Popup>{post.likes.length + " "}Like</Popup>}
//           {user && (
//             <LikeButton
//               likes={post.likes}
//               postId={post._id}
//               userId={post.userId}
//             />
//           )}

//           <Link to={`/post/${post._id}/${post.userId}`}>
//             <Comment>
//               <i class="fa-solid fa-comments"></i>
//               <Span> {commnetSize && commnetSize}</Span>
//             </Comment>
//           </Link>

//           <CardSubtitle className="text-muted" tag="h6">
//             {/* {data.readTime} min read */}
//             <i className="fa-solid fa-share"></i> Share
//           </CardSubtitle>
//         </LikeComments>
//       </Comments>
//     </CardBody>
//   );
// };
// const GET_AVATAE_BY_ID = gql`
//   query ($userId: ID!) {
//     getUserById(userId: $userId) {
//       avatars {
//         avatar
//       }
//     }
//   }
// `;

// export default Post;
