import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postUtil, setDefault } from "../../utils/api/link-building-api";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    postUtil("Auth/Login", { username: username, password: password }).then(
      (res) => {
        localStorage.setItem('accessToken',res.data.data);
        setDefault();
        history.push("portal");
      }
    );

  };
  return (
    <div>
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
