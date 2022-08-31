import { useState } from "react";

import { UploadAvatar, UploadInput, Camera } from "../styles";

import { useParams } from "react-router-dom";

const AvatarUpload = () => {
  const [avatar, setAvatar] = useState();

  let { id } = useParams();
  // Submit Avatar
  const onChange = (e) => {
    if (e.target.validity.valid) {
      let file = e.target.files[0];
      setAvatar(URL.createObjectURL(file));

      let formData = new FormData();

      formData.append("file", file);

      formData.append("upload_preset", "ml_default");
    }
  };
  return (
    <UploadAvatar
      action={`${process.env.REACT_APP_SERVER_URL}/fileupload/${id}`}
      enctype="multipart/form-data"
    >
      <UploadInput name="avatar" type="file" onChange={onChange} />
      <Camera className="fa-solid fa-camera"></Camera>
    </UploadAvatar>
  );
};

export default AvatarUpload;
