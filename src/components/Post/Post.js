import { useContext, useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";
import {
  Comments,
  LikeComments,
  Comment,
  Span,
  CardBody,
  UserName,
  CardSubtitle,
  CircleImage,
  UserPic,
  More,
  CommentsArea,
  CardText,
  Users,
  Left,
  Right,
  Dot,
} from "./CartStyles";

import LikeButton from "../LikeButton";

import Popup from "../Popup/Popup";

import { NavLink, Link } from "react-router-dom";

import moment from "moment";

import { AuthContext } from "../../context/auth";

import { Avatar } from "../Helper/helper";

import CommentBar from "../commentInput/CommentInput";

import getAvatar from "../../hooks/useAvatar";

import SingleComment from "../Comments";

import { getCommnetAvatar } from "../Helper/helper";

import UpdatedPost from "../UpdatePost";

const Post = ({ ...props }) => {
  let [toggleComment, setToggleComment] = useState(false);

  const [image, setImage] = useState(null);

  const [toggle, setToggle] = useState(false);

  const { user } = useContext(AuthContext);

  let { data } = props;

  let avatar = Avatar(data.userId);

  let sortText;
  let text;

  if (data.body.length > 400) {
    sortText = data.body.slice(0, 400);
  } else {
    text = data.body;
  }
  // Show Comment Input
  const togglerInput = () => {
    setToggleComment(true);
  };

  // Query User avata or data

  useQuery(GET_USER_PIC, {
    onCompleted: (data) => {
      const { images } = getAvatar(data);
      setImage(images);
    },
    onError(error) {
      console.log(error);
    },
  });
  useEffect(() => {
    getCommnetAvatar(data.comments);
  }, [data.comments]);

  const postToggler = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  return (
    <CardBody className="mb-4 ">
      <Users>
        <Left>
          <UserPic>
            {typeof avatar !== "function" && (
              <CircleImage src={avatar} alt="user" />
            )}
          </UserPic>

          <Link to={`/profile/${data.userId}`}>
            <UserName>{data.firstName + " " + data.lastName}</UserName>
          </Link>
        </Left>
        <Right>
          <Dot onClick={postToggler} className="fa-solid fa-ellipsis"></Dot>
          <UpdatedPost toggler={toggle} post={data} />
        </Right>
      </Users>

      <CardSubtitle className="mb-2 mt-2 text-muted pb-1" tag="h6">
        {moment(data.createdAt).fromNow(true)}
      </CardSubtitle>

      <CardText id="post">
        {sortText}
        {text}
        {sortText && (
          <More>
            <NavLink to={`/post/${data._id}`}>See more...</NavLink>
          </More>
        )}
      </CardText>

      <Comments>
        <LikeComments>
          {!user && <Popup>{data.likes.length + " "}Like</Popup>}
          {user && (
            <LikeButton
              likes={data.likes}
              postId={data._id}
              userId={data.userId}
            />
          )}

          <Comment onClick={togglerInput}>
            <NavLink to={`/post/${data._id}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M511.1 63.1v287.1c0 35.25-28.75 63.1-64 63.1h-144l-124.9 93.68c-7.875 5.75-19.12 .0497-19.12-9.7v-83.98h-96c-35.25 0-64-28.75-64-63.1V63.1c0-35.25 28.75-63.1 64-63.1h384C483.2 0 511.1 28.75 511.1 63.1z" />
              </svg>
              <Span> {data.comments.length} comments</Span>
            </NavLink>
          </Comment>
          <CardSubtitle className="text-muted" tag="h6">
            {/* {data.readTime} min read */}
            <i className="fa-solid fa-share"></i> Share
          </CardSubtitle>
        </LikeComments>
      </Comments>

      {toggleComment && (
        <CommentsArea>
          <UserPic>
            {image && image.avatar && (
              <CircleImage src={image.avatar} alt="user" />
            )}
          </UserPic>
          <CommentBar postId={data._id} />
        </CommentsArea>
      )}
      {toggleComment &&
        data.comments.map((c, index) => <SingleComment key={index} c={c} />)}
    </CardBody>
  );
};
const GET_USER_PIC = gql`
  query {
    getUser {
      avatar
      cover
    }
  }
`;

export default Post;
