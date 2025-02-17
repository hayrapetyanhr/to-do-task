import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    const usersList = JSON.parse(localStorage.getItem("usersList"));
    if (usersList) {
      const correntUser = usersList.find(
        (user) => user.email === email && user.password === password
      );
      if (correntUser) {
        localStorage.setItem("currentUser", JSON.stringify(correntUser));
        navigate("/");
      } else {
        alert("its incorrectemail or password");
      }
    }
  };

  return (
    <div className="registration">
      <div className="w-100">
        <form onSubmit={loginUser}>
          <h1>Login</h1>
          <label>
            Email
            <input
              type="text"
              value={email || ""}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="text"
              value={password || ""}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="w-100 fw-bold">login</button>
        </form>
        <button onClick={() => navigate("/register")} className="mt-4">
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
