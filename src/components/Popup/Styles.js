import styled from "styled-components";

import { Link } from "react-router-dom";

export const Close = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const H4 = styled.h4`
  font-weight: 600;
  font-size: 26px;
`

export const Icon = styled.i`
 font-size: 25px;
 cursor: pointer;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  flex-direction: column;
`;

export const Login = styled(Link)`
    background: #2c51ca;
    border-color: #0250c5;
    color: #fff;
    padding: 10px 30px;
    border-radius: 4px;
`;

export const CreateButton = styled(Link)`
    margin-top: 1rem;
    border: 1px solid #2c51ca;
    padding: 8px 28px;
    border-radius: 7px;
    border-width: 2px;
    font-size: 18px;
`;