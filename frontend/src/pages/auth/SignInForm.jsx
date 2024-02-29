import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";

const SignInForm = () => {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;
  const [error, setError] = useState({});

  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await axiosReq.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      navigate("/");
    } catch (err) {
      console.log(err)
      setError(err.response?.data)
    }
  };

  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  return (
      <Form onSubmit={handleSubmit} className="content">
        <h1>Sign In</h1>
        {error.non_field_errors?.map((message, index) => (
          <Alert key={index} variant="danger">{message}</Alert>
        ))}
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        {error.username?.map((message, index) => (
          <Alert key={index} variant="danger">{message}</Alert>
        ))}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
          />
        {error.password?.map((message, index) => (
          <Alert key={index} variant="danger">{message}</Alert>
        ))}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
  );
};

export default SignInForm;
