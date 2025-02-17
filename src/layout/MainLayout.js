import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RightPanel from "../components/RightPanel";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ModalForm from "../components/ModalForm";
import ModalCategory from "../components/ModalCategory";
import { setTasks, setSelectedItem } from "../redux/app/appSlice";
import "../App.scss";

export const Context = React.createContext();

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.app);

  const updatedList = (list) => {
    dispatch(setTasks(list));
    dispatch(
      setSelectedItem({
        title: "",
        date: "",
        description: "",
        complated: false,
        important: false,
        status: "Main",
        userId: "",
      })
    );
    localStorage.setItem("tasks", JSON.stringify(list));
  };

  const getUser = JSON.parse(localStorage.getItem("usersList"));
  const getCorrentUser = JSON.parse(localStorage.getItem("currentUser"));
  const useriD = getCorrentUser ? getCorrentUser.userID : null;

  console.log("getUser", getUser);
  console.log("useriD", useriD);

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
