import styled from "styled-components";

export const Wrapper = styled.div`
  background: #000000cf;
  height: 100vh;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const Body = styled.div`
  width: 800px;
  border-radius: 10px;
  overflow-y: scroll;
  height: 70vh;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const CloseModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  position: relative;
  a {
    margin: 0;
    padding: 0;
    display: inline-block;
  }
`;

export const Close = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #000;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  margin-top: 1rem;
  background: #fff;
  z-index: 99;

  i {
    color: red;
    font-size: 14px;
  }
`;
