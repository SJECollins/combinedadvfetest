import { useState } from "react";
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

  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosReq.post("/dj-rest-auth/login/", signInData);
      console.log(data);
      setCurrentUser(data.user);
      setTokenTimestamp(data)
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignInForm;
