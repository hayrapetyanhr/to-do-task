import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../redux/app/appSlice";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const loginUser = (e) => {
    e.preventDefault();
    const usersList = JSON.parse(localStorage.getItem("usersList"));
    if (usersList) {
      const correntUser = usersList.find(
        (user) => user.email === email && user.password === password
      );
      if (correntUser) {
        localStorage.setItem("currentUser", JSON.stringify(correntUser));
        dispatch(setLogin({ userID: correntUser.userID }));
        navigate("/");
      } else {
        alert("its incorrectemail or password");
      }
    } else {
      alert("No users found. Please register first.");
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
              autocomplete
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password || ""}
              autocomplete
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
