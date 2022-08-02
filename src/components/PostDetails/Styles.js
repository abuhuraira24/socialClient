import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 5rem;
  padding-top: 7rem;
  background: ${(props) => props.theme.bg};
`;

export const UserProfile = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: left;
  align-items: flex-start;
`;

export const UserImage = styled.div`
  background: #ddd;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-right: 1rem;
  overflow: hidden;
  svg {
    height: 22px;
  }
`;

export const AuthorName = styled.div``;
export const H5 = styled.h5`
  font-weight: 600;
  color: ${(props) => props.theme.color};
`;

export const Span = styled.span``;

export const PostTitle = styled.h2`
  font-size: 40px;
  font-weight: 800;
  color: ${(props) => props.theme.color};
`;
export const P = styled.p`
  color: ${(props) => props.theme.color};
`;

export const PostBody = styled.div`
  margin-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1.8rem;
`;

export const Comments = styled.div``;

export const ProfileWrapper = styled.div`
  background: #f0f2f5;
`;

export const Profilee = styled.div`
  padding-bottom: 1rem;
  background: ${(props) => props.theme.gray};
`;

export const Cover = styled.div`
  background: #ddd;
  width: 100%;
  height: 60px;
  padding-top: 2rem;
  background: ${(props) => props.theme.bg};
`;

export const ProfilePic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.span`
  width: 60px;
  height: 60px;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  position: relative;
  top: -14px;
  border: 3px solid #fff;
  overflow: hidden;
  i {
    font-size: 28px;
  }
`;

export const ProfileName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const H3 = styled.h3`
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  color: ${(props) => props.theme.color};
`;

export const Follow = styled.button`
  background: #2c51ca;
  color: #fff;
  padding: 5px 23px;
  margin: 1rem 0;
  border-radius: 5px;
`;

export const Joined = styled.span`
  color: ${(props) => props.theme.color};
`;

export const PostAvatar = styled.img`
  width: 100%;
`;
