import { useState, useContext } from "react";

import DeletePopup from "./DeletePopup";

import DeletedPost from "./DeletePost";

import {
  PostSetting,
  UpdatePost,
  Edit,
  Icon,
  DeletePost,
  H6,
  Report,
} from "../Post/CartStyles";

import { AuthContext } from "../../context/auth";

import PostUpdatePopup from "../UpdatePost/UpdatePopup";

import PostUpdateForm from "./UpdatePost";

const UpdatedPost = ({ post, isUpdate, isOpen, toggler, postToggler }) => {
  const [openUpdate, setUpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { user } = useContext(AuthContext);

  const updateClose = () => {
    setUpenUpdate(false);
  };

  const updateOpen = () => {
    setUpenUpdate(true);
  };

  const isOpenHandler = () => {
    setOpenDelete(true);
  };
  const closeModal = () => {
    setOpenDelete(false);
  };
  return (
    <>
      {toggler && (
        <PostSetting>
          {post.userId === user.id ? (
            <>
              <UpdatePost>
                <Edit>
                  <Icon onClick={updateOpen} className="fa-solid fa-pen"></Icon>
                  <H6 onClick={updateOpen}>Edit</H6>
                </Edit>
                <PostUpdatePopup closeModal={updateClose} isOpen={openUpdate}>
                  <PostUpdateForm closeModal={updateClose} post={post} />
                </PostUpdatePopup>
              </UpdatePost>
              <DeletePost>
                <Icon
                  onClick={isOpenHandler}
                  className="fa-solid fa-trash-can"
                ></Icon>
                <H6 onClick={isOpenHandler}>Delete</H6>
                <DeletePopup
                  title="Delete Post"
                  text="Are you sure you want to delete?"
                  isOpen={openDelete}
                  closeModal={closeModal}
                >
                  <DeletedPost
                    postToggler={postToggler}
                    closeModal={closeModal}
                    postId={post._id}
                  />
                </DeletePopup>
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
    </>
  );
};

export default UpdatedPost;
