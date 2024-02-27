import { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosReq.post(
        "/dj-rest-auth/registration/",
        signUpData
      );
      navigate("/signin")
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
      />
      <label htmlFor="password1">Password</label>
      <input
        type="password"
        name="password1"
        value={password1}
        onChange={handleChange}
      />
      <label htmlFor="password2">Repeat Password</label>
      <input
        type="password"
        name="password2"
        value={password2}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUpForm;
