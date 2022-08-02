const getAvatarById = (data, loading) => {
  let images = {};

  if (
    data &&
    data.getUserById &&
    typeof data.getUserById.avatars === "undefined" &&
    data.getUserById.avatars.length === 0 &&
    !loading
  ) {
    images.avatar = "";
  }
  if (
    data &&
    data.getUserById &&
    data.getUserById.avatars !== "undefined" &&
    !loading
  ) {
    images.avatar = data.getUserById.avatars[0].avatar;
  }

  //   if (data && data.getUserById && data.getUserById.cover === "false") {
  //     images.cover = "";
  //   } else if (data && data.getUserById && data.getUserById.cover !== "false") {
  //     images.cover = data.getUserById.cover;
  //   }
  return {
    images,
  };
};

export default getAvatarById;
