import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Wrapper } from "../styles";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  });
  return (
    <Wrapper>
      <h1>Not Found || 404</h1>
    </Wrapper>
  );
};

export default NotFound;
