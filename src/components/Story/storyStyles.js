import styled from "styled-components";

export const Wrapper = styled.div`
  margin-bottom: 0.5rem;
`;

export const ImageWrapper = styled.div`
  max-width: 150px;
  height: 210px;
  overflow: hidden;
  background: #fff;
  border-radius: 10px;
  margin-right: 0.8rem;
  position: relative;
  cursor: pointer;
`;

export const Image = styled.div`
  height: 150px;
  overflow: hidden;
  &&:hover {
    img {
      max-width: 145%;
      transition: 0.5s;
    }
  }
`;

export const Stories = styled.div`
  display: flex;
`;

export const Img = styled.img`
  width: 100%;
`;

export const ImageTwo = styled.div`
  /* height: 100%; */
  &&:hover {
    img {
      max-width: 145%;
      transition: 0.5s;
    }
  }
`;
export const ImagTwo = styled.img`
  max-width: 140%;
  height: 100%;
  transition: 0.5s;
`;

export const PlusIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background: #1876f2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: absolute;
  top: -18px;
  border: 4px solid #fff;
`;

export const Icon = styled.i``;

export const AddStory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  position: relative;
`;

export const Span = styled.span`
  margin-top: 0.5rem;
  font-size: 14px;
`;

export const Name = styled.div`
  position: absolute;
  bottom: 0;
  left: 7%;
`;

export const H5 = styled.h5`
  font-size: 14px;
  color: #fff;
`;
