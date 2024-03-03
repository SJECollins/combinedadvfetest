import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const { username, email, password1, password2 } = signUpData;
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosReq.post("/dj-rest-auth/registration/", signUpData);
      console.log(data)
      navigate("/signin");
    } catch (err) {
      console.log(err);
      setError(err.response?.data);
    }
  };

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="content">
      <h1>Sign Up</h1>
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

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        {error.email?.map((message, index) => (
          <Alert key={index} variant="danger">{message}</Alert>
        ))}
      </Form.Group>

      <Form.Group controlId="formBasicPassword1">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password1"
          value={password1}
          onChange={handleChange}
          placeholder="Password"
        />
        {error.password1?.map((message, index) => (
          <Alert key={index} variant="danger">{message}</Alert>
        ))}
      </Form.Group>

      <Form.Group controlId="formBasicPassword2">
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control
          type="password"
          name="password2"
          value={password2}
          onChange={handleChange}
          placeholder="Repeat password"
        />
        {error.password2?.map((message, index) => (
          <Alert key={index} variant="danger">{message}</Alert>
        ))}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignUpForm;
