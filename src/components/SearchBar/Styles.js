import styled from "styled-components";

export const Wrapper = styled.div`
  position: ${(props) => (props.toggle ? "absolute" : "relative")};
  top: ${(props) => props.toggle && "0"};
  left: ${(props) => props.toggle && "0"};
  background: ${(props) => props.toggle && props.theme.gray};
  padding: ${(props) => props.toggle && "1rem"};

  -webkit-box-shadow: ${(props) =>
    props.toggle && "10px 10px 5px -1px rgba(0, 0, 0, 0.16)"};
  -moz-box-shadow: ${(props) =>
    props.toggle && "10px 10px 5px -1px rgba(0, 0, 0, 0.16)"};
  box-shadow: ${(props) =>
    props.toggle && "10px 10px 5px -1px rgba(0, 0, 0, 0.16)"};
  border-radius: 5px;
`;

export const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Left = styled.div`
  margin-right: 0.8rem;
  display: ${(props) => !props.toggle && "none"};
  cursor: pointer;
  i {
    color: ${(props) => props.theme.text};
  }
`;

export const SearchText = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 1rem 0;
`;

export const Icon = styled.i`
  color: ${(props) => props.theme.text};
`;

export const Text = styled.p`
  margin: 0;
  color: ${(props) => props.theme.text};
  margin-left: 0.5rem;
`;

export const Results = styled.div`
  text-align: center;
  margin-top: 0.5rem;
`;

export const H6 = styled.h6`
  text-align: left;
  margin-left: 0.5rem;
  color: ${(props) => props.theme.text};
`;
