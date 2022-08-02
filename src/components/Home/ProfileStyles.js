import styled from "styled-components";

export const Wrapper = styled.div`
  background: ${(props) => props.theme.gray};
  border-radius: 10px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
`;

export const Cover = styled.div`
  height: 100px;
  background: ${(props) => props.theme.gray};
  position: relative;
  border-radius: 2%;
  background-position: center;
  background-size: cover;
`;

export const CoverImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const Avatar = styled.div`
  max-width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  left: 35%;
  right: 35%;
  top: 75%;
  background: ${(props) => props.theme.input};
  border: 1px solid #ddd;
`;

export const Image = styled.img`
  width: 100%;
`;

export const BioNames = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 4rem;
  padding-bottom: 1rem;
  color: ${(props) => props.theme.text};
`;

export const Name = styled.h4`
  font-weight: 600;
  margin-top: 1rem;
  color: ${(props) => props.theme.text};
`;

export const Bio = styled.h5`
  font-size: 14px;
  color: ${(props) => props.theme.text};
`;

export const EmptyAvatar = styled.div`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.i`
  font-size: 35px;
`;
