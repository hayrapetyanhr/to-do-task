import React from "react";
import avatar2 from "../svg/user.png";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../redux/app/appSlice";
import { useNavigate } from "react-router-dom";

export default function RightPanel() {
  const dispatch = useDispatch();

  const { mode, tasks } = useSelector((state) => state.app);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const userName = user?.userName;
  const avatar = user?.avatar;

  const darkMode = () => {
    dispatch(setMode(!mode));
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const result = tasks.filter(
    (item) => item.userID === user.userID && item.completed
  ).length;
  const maxResult =
    tasks.filter((item) => item.userID === user.userID)?.length || 0;

  return (
    <div className="right-panel">
      <div className="user-info">
        <h5>Hi, {userName || ""}!</h5>
        <img src={avatar || avatar2} alt="avatar" />
        <button onClick={logout}>Logout</button>
      </div>
      <div className="change-mode">
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Darkmode"
          onChange={darkMode}
        />
      </div>
      <div className="progressBar">
        <div className="aal-tasks">
          <span>Completed taskes</span>
          <div>
            {`${result}`}/{`${maxResult}`}
          </div>
        </div>
        <ProgressBar now={result} max={maxResult} />
      </div>
    </div>
  );
}
