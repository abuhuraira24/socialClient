import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

const PrivatRouter = ({ children, ...props }) => {
  const { user } = useContext(AuthContext);

  const dir = props.rediredct;

  return user ? children : <Navigate to={dir} />;
};

export default PrivatRouter;
