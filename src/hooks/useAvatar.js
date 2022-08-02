const useAvatar = (data) => {
  let images = {};
  if (data && data.getUser && data.getUser.avatar === "false") {
    images.avatar = "";
  }
  if (data && data.getUser && data.getUser.avatar !== "false") {
    images.avatar = data.getUser.avatar;
  }

  if (data && data.getUser && data.getUser.cover === "false") {
    images.cover = "";
  } else if (data && data.getUser && data.getUser.cover !== "false") {
    images.cover = data.getUser.cover;
  }
  return {
    images,
  };
};

export default useAvatar;
