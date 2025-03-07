import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();

  const uploadImage = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  const registerUser = (e) => {
    e.preventDefault();
    const userInfo = {
      userName: userName,
      email: email,
      password: password,
      userID: Date.now(),
      avatar: avatar,
    };

    const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    const correntUser = usersList.find((user) => user.email === userInfo.email);
    if (correntUser) {
      alert("This user is already registerd.");
    } else {
      usersList.push(userInfo);
      localStorage.setItem("usersList", JSON.stringify(usersList));
      navigate("/login");
    }
  };

  return (
    <div className="registration">
      <div className="w-100">
        <form onSubmit={registerUser}>
          <h1>Register</h1>
          <label>
            Username
            <input
              type="text"
              value={userName || ""}
              placeholder="Username"
              autocomplete
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
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
              placeholder="Password"
              autocomplete
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="avatar">
            <input type="file" onChange={uploadImage} />
            {avatar && <img src={avatar} alt="Avatar" />}
          </label>

          <button className="w-100 fw-bold">Register</button>
        </form>
        <button onClick={() => navigate("/login")} className="mt-4">
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
