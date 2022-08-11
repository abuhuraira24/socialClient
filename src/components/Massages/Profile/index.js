import { Avatar, Img, Name, On, ProfileWrapper, Span } from "./Styles";

const Profile = () => {
  return (
    <ProfileWrapper>
      <Avatar>
        <Img
          src="https://res.cloudinary.com/dza2t1htw/image/upload/v1660142979/285283233_359965916232900_2354054775476849342_n_fu4qam.jpg"
          alt="user"
        />
        <On></On>
      </Avatar>

      <Name>Abu Huraira</Name>
      <Span>Full stack developera</Span>
    </ProfileWrapper>
  );
};

export default Profile;
