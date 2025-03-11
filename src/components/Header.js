import React from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  setInputValue,
  setTasks,
  resetTasks,
  setShow,
} from "../redux/app/appSlice";
import MyButton from "./MyButton";
import MyInput from "./MyInput";

const Header = () => {
  const date = dayjs().format("DD-MMM-YYYY");

  const { inputValue, tasks } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleResetTasks = () => {
    dispatch(resetTasks());
  };

  const addTaskInSerachList = (id) => {
    if (inputValue) {
      const searchList = tasks.filter((task) => task.id === id);
      dispatch(setTasks(searchList));
    }
    dispatch(setInputValue(""));
  };

  const addAllTaskInSerachList = () => {
    const searchList = tasks.filter((task) => task.title.includes(inputValue));
    dispatch(setTasks(searchList));
    dispatch(setInputValue(""));
  };

  return (
    <div>
      <div className="top-panel">
        <div className="search-bar">
          <input
            type="text"
            value={inputValue || ""}
            onChange={(e) => dispatch(setInputValue(e.target.value))}
            placeholder="Search task"
          />
          <MyInput
            value={inputValue}
            onChange={(e) => dispatch(setInputValue(e.target.value))}
            placeholder="Search Task"
          />
          {/* <button onClick={handleResetTasks}>Reset</button> */}
          <MyButton type="text" onClick={handleResetTasks}>
            Reset
          </MyButton>
          <div className="search-list">
            {tasks
              .filter(
                (task) => task.title?.includes(inputValue) && inputValue !== ""
              )
              .map((task) => {
                return (
                  <div
                    key={task.id}
                    onClick={() => addTaskInSerachList(task.id)}
                    className="d-flex align-items-center justify-space-between"
                  >
                    <h6>{task.title}</h6>
                    <div>{dayjs(task.date).format("DD-MM-YYYY")}</div>
                  </div>
                );
              })}
            {inputValue &&
              (tasks.find((task) => task.title.includes(inputValue)) ? (
                // <button onClick={addAllTaskInSerachList}>
                //   All results from "{inputValue}"
                // </button>
                <MyButton type="denger" onClick={addAllTaskInSerachList}>
                  All results from "{inputValue}"
                </MyButton>
              ) : (
                <div>No tasks found</div>
              ))}
          </div>
        </div>
        <div className="date">{date}</div>
        <div className="notification">
          {/* <AddButton /> */}
          <MyButton type="primary" onClick={() => dispatch(setShow(true))}>
            Add new task
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
