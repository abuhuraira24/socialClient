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
  PostSetting,
  Dot,
  Edit,
  UpdatePost,
  DeletePost,
  Icon,
  H6,
  Report,
} from "./CartStyles";

import LikeButton from "../LikeButton";

import Popup from "../Popup/Popup";

import { NavLink } from "react-router-dom";

import moment from "moment";

import { AuthContext } from "../../context/auth";

import { Avatar } from "../Helper/helper";

import CommentBar from "../commentInput/CommentInput";

import getAvatar from "../../hooks/useAvatar";

import SingleComment from "../Comments";

import { getCommnetAvatar } from "../Helper/helper";

import PostPopup from "./DeletePopup";

import PostUpdatePopup from "./UpdatePopup";

import PostUpdateForm from "./UpdatePost";

import Delete from "./DeletePost";

const Post = ({ ...props }) => {
  let [toggleComment, setToggleComment] = useState(false);

  const [image, setImage] = useState(null);

  const [toggle, setTogle] = useState(false);

  const [isOpen, setOpen] = useState(false);

  const [isUpdate, setUpdate] = useState(false);

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
  });
  useEffect(() => {
    getCommnetAvatar(data.comments);
  }, [data.comments]);

  const toggler = () => {
    if (toggle) {
      setTogle(false);
    } else {
      setTogle(true);
    }
  };

  const isOpenHandler = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setTogle(false);
  };

  const updateOpen = () => {
    setUpdate(true);
  };

  const updateClose = () => {
    setUpdate(false);
    setTogle(false);
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
          <NavLink to={`profile/${data.userId}`}>
            <UserName>{data.firstName + " " + data.lastName}</UserName>
          </NavLink>
        </Left>
        <Right>
          <Dot onClick={toggler} className="fa-solid fa-ellipsis"></Dot>
          {toggle && (
            <PostSetting>
              {data.userId === user.id ? (
                <>
                  <UpdatePost>
                    <Edit>
                      <Icon
                        onClick={updateOpen}
                        className="fa-solid fa-pen"
                      ></Icon>
                      <H6 onClick={updateOpen}>Edit</H6>
                    </Edit>
                    <PostUpdatePopup closeModal={updateClose} isOpen={isUpdate}>
                      <PostUpdateForm post={data.body} />
                    </PostUpdatePopup>
                  </UpdatePost>
                  <DeletePost>
                    <Icon
                      onClick={isOpenHandler}
                      className="fa-solid fa-trash-can"
                    ></Icon>
                    <H6 onClick={isOpenHandler}>Delete</H6>
                    <PostPopup
                      title="Delete Post"
                      text="Are you sure you want to delete?"
                      isOpen={isOpen}
                      closeModal={closeModal}
                    >
                      <Delete closeModal={closeModal} postId={data._id} />
                    </PostPopup>
                  </DeletePost>
                </>
              ) : (
                <Report>
                  <Icon className="fa-solid fa-bug"></Icon>
                  <H6>Report Post</H6>
                </Report>
              )}
            </PostSetting>
          )}
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
