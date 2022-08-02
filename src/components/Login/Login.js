import { useState, useContext } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { Form } from "react-bootstrap";

import { gql, useMutation } from "@apollo/client";

import { AuthContext } from "../../context/auth";

import { H2, H5, LogginWrapper } from "./Styles";

import { Input, Button } from "../../Styles/ElementsStyles";

import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // React toastify
  const notify = () => toast("Please Verify your Account!");

  const navigate = useNavigate();
  const [addUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      if (result.data.login.isVerified) {
        const token = result.data.login.token;
        context.login(token);
        navigate("/");
      } else {
        notify();
      }
    },
    onError(err) {
      if (err.graphQLErrors[0]) {
        setErrors(err.graphQLErrors[0].extensions.errors);
      }
    },
    variables: values,
  });

  const submitHandle = (e) => {
    e.preventDefault();
    addUser();
  };

  const forgot = () => {
    navigate("/forgot");
  };

  return (
    <LogginWrapper>
      <ToastContainer position="top-center" hideProgressBar={true} />
      <H2>Welcome back</H2>
      <Form onSubmit={submitHandle}>
        <Form.Group className="mb-3">
          <Form.Label>* Email</Form.Label>
          <Input
            type="email"
            placeholder="Enter Email Name"
            onChange={onChange}
            name="email"
          />

          {Object.keys(errors).length !== 0 && !loading && (
            <Form.Text className="text-red">{errors.email}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>*Password</Form.Label>
          <Input
            type="Password"
            placeholder="Password"
            onChange={onChange}
            name="password"
          />
          {Object.keys(errors).length !== 0 && !loading && (
            <Form.Text className="text-red">{errors.password}</Form.Text>
          )}
          {Object.keys(errors).length !== 0 && !loading && (
            <Form.Text className="text-red">{errors.genaral}</Form.Text>
          )}
        </Form.Group>

        <H5 type="button" onClick={forgot}>
          Forgot Password?
        </H5>
        <Button bg="#2c51ca" color="#fff" type="submit">
          Submit
        </Button>
        <H5>
          <NavLink to="/register">Haven't an Account? Join</NavLink>
        </H5>
      </Form>
    </LogginWrapper>
  );
};

const LOGIN_USER = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      isVerified
    }
  }
`;

export default Login;
