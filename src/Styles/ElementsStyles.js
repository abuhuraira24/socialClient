import styled from "styled-components";

export const Container = styled.div`
  justify-content: space-between;
  align-items: center;
  max-width: 1450px;
  margin: auto;
  margin: ${(props) => (props.margin ? "55px auto" : "auto")};
  position: relative;
  flex-direction: ${(props) => (props.direction === "column" ? "column" : "")};
  @media (max-width: 1200px) {
    max-width: 960px;
    padding: 0px 28px;
  }
  @media (max-width: 576px) {
    padding: 0;
  }
`;
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.direction ? "row-reverse" : "")};
  width: 100%;
  transition: 0.5s;
`;
export const Col = styled.div`
  max-width: ${(props) => props.w}%;
  position: relative;
  width: 100%;
  /* min-height: 1px; */
  padding-right: 15px;
  padding-left: 15px;
  margin: ${(props) => props.mlauto};
  display: ${(props) => (props.center ? "flex" : "")};
  transition: 0.5s;
  @media (max-width: 991px) {
    max-width: ${(props) => props.md}%;
    display: ${(props) => (props.mdnone ? "none" : "")};
  }
  @media (max-width: 768px) {
    display: ${(props) => (props.none ? "none" : "")};
    max-width: ${(props) => props.sm}% !important;
  }
  @media (max-width: 468px) {
    max-width: ${(props) => props.sm}% !important;
  }
`;

// Section Title
export const Title = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;
export const TitleH1 = styled.h1`
  margin-bottom: 1rem;
  color: ${(props) => props.color};
`;

export const TitleH6 = styled.h6`
  max-width: 650px;
  margin: 0 auto;
  color: #fff;
  font-weight: 400;
  line-height: 1.625;
  color: ${(props) => props.color};
  @media (max-width: 668px) {
    max-width: 400px;
  }
`;

export const Button = styled.button`
  background: ${(props) => props.bg};
  border-color: #0250c5;
  color: ${(props) => props.color};
  padding: 10px 30px;
  border-radius: 4px;
  cursor: pointer;
`;

export const Form = styled.form``;

export const InptGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  margin-bottom: 1rem;
  display: inline-block;
  color: #4c4848;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  padding: 1rem;
  color: ${(props) => props.theme.text};
  background: #eef3f8;
`;

export const FormTitle = styled.h2`
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #000000b0;
`;

export const Loading = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
