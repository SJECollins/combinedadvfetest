import { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    passowrd1: "",
    password2: "",
  });

  const { username, passowrd1, password2 } = signUpData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosReq.post(
        "/dj-rest-auth/registration/",
        signUpData
      );
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
    <div>
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
        value={passowrd1}
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
    </div>
  );
};

export default SignUpForm;
