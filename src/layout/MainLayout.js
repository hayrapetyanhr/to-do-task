import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RightPanel from "../components/RightPanel";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import ModalForm from "../components/ModalForm";
import ModalCategory from "../components/ModalCategory";
import { setTasks, setSelectedItem } from "../redux/app/appSlice";
import "../App.scss";
export const Context = React.createContext();

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.app);
  const navigate = useNavigate();

  const updatedList = (list) => {
    dispatch(setTasks(list));
    dispatch(
      setSelectedItem({
        title: "",
        date: "",
        description: "",
        completed: false,
        important: false,
        status: "main",
        userID: userID,
      })
    );
  };

  useEffect(() => {
    const usersList = JSON.parse(localStorage.getItem("usersList"));
    if (!usersList || usersList.length === 0) {
      navigate("/register");
    }
  }, [navigate]);

  const getCorrentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userID = getCorrentUser ? getCorrentUser.userID : null;

  return (
    <div className={mode ? "app-main dark" : "app-main"}>
      <Sidebar />
      <div className="main-content">
        <Header />
        {children}
      </div>
      <RightPanel />
      <ModalForm updatedList={updatedList} />
      <ModalCategory />
    </div>
  );
};

export default MainLayout;
