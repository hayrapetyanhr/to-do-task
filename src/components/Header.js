import React, { useEffect } from "react";
import dayjs from "dayjs";
import AddButton from "../components/AddButton";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue, setTasks } from "../redux/app/appSlice";

const Header = () => {
  const date = dayjs().format("DD-MMM-YYYY");

  const { inputValue, tasks } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const resetTasks = () => {
    const storT = JSON.parse(localStorage.getItem("tasks"));
    dispatch(setTasks(storT));
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

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (result) {
      dispatch(setTasks(result));
    }
  }, []);

  return (
    <div>
      <div className="top-panel">
        <div className="search-bar">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search task"
          />
          <button onClick={resetTasks}>Reset</button>
          <div className="search-list">
            {tasks
              .filter(
                (task) => task.title.includes(inputValue) && inputValue !== ""
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
                <button onClick={addAllTaskInSerachList}>
                  All results from "{inputValue}"
                </button>
              ) : (
                <div>No tasks found</div>
              ))}
          </div>
        </div>
        <div className="date">{date}</div>
        <div className="notification">
          <AddButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
