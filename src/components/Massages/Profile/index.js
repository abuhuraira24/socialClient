import { Avatar, Img, Name, On, ProfileWrapper, Span } from "./Styles";

const Profile = ({ profile }) => {
  return (
    <ProfileWrapper>
      <Avatar>
        <Img src={profile.avatars[0].avatar} alt="user" />
        <On></On>
      </Avatar>

      <Name>
        {profile.firstName} {profile.lastName}
      </Name>
      <Span>{profile.bio}</Span>
    </ProfileWrapper>
  );
};

export default Profile;
