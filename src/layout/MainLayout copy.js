import React, { useState, useEffect } from "react";
import RightPanel from "../components/RightPanel";
import dayjs from "dayjs";
import Sidebar from "../components/Sidebar";
import Modal from "react-bootstrap/Modal";
import "../App.scss";
import AddButton from "../components/AddButton";
import { TASKS_TYPES } from "../routes/AppRoutes";
const initialStateItem = {
  title: "",
  date: "",
  description: "",
  complated: false,
  important: false,
  status: "Main",
};
const MainLayout = ({ children, darkMode, result, maxResult, type }) => {
  const date = dayjs().format("DD-MMM-YYYY");
  const [selectedItem, setSelectedItem] = useState(initialStateItem);
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [view, setView] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSelectedItem(initialStateItem);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("tasks"));
    if (items) {
      setTasks(items);
    }
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (
      !selectedItem?.title ||
      !selectedItem?.date ||
      !selectedItem?.description
    )
      return;

    const isNew = !Boolean(selectedItem?.id);

    const newTask = {
      title: selectedItem?.title,
      date: new Date(selectedItem?.date),
      description: selectedItem?.description,
      complated: selectedItem?.complated,
      important: selectedItem?.important,
      status: selectedItem?.status,
    };

    if (isNew) {
      newTask.id = Date.now();
    }

    const newList = isNew
      ? [...tasks, newTask]
      : tasks.map((task) =>
          selectedItem.id === task.id ? selectedItem : task
        );
    updatedList(newList);
    setSelectedItem(initialStateItem);
    handleClose();
  };

  const resetTasks = () => {
    const storT = JSON.parse(localStorage.getItem("tasks"));
    setTasks(storT);
  };

  const updatedList = (list) => {
    setTasks(list);
    setSelectedItem(initialStateItem);
    localStorage.setItem("tasks", JSON.stringify(list));
  };

  const addTaskInSerachList = (id) => {
    if (inputValue) {
      const searchList = tasks.filter((task) => task.id === id);
      setTasks(searchList);
    }
    setInputValue("");
  };

  const addAllTaskInSerachList = () => {
    const searchList = tasks.filter((task) => task.title.includes(inputValue));
    setTasks(searchList);
    setInputValue("");
  };

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (result) {
      let data = [];

      if (TASKS_TYPES.ALL) setTasks(data);
    }
  }, []);

  return (
    <div className={"app-main dark app-main"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-0">
            <Sidebar handleShow={handleShow} />
          </div>
          <div className="col-md-8 p-0">
            <div className="main-content">
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
                        (task) =>
                          task.title.includes(inputValue) && inputValue !== ""
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
                  <AddButton handleShow={handleShow} />
                </div>
              </div>
              <div className="tasks-view">
                <button
                  className={view ? "active" : ""}
                  onClick={() => setView(true)}
                >
                  📆
                </button>
                <button
                  className={view ? "" : "active"}
                  onClick={() => setView(false)}
                >
                  📅
                </button>
              </div>
              <div className={view ? "task-row block" : "task-row"}>
                {children}
                <div className="task-item task-item-button">
                  <AddButton handleShow={handleShow} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2 p-0">
            <RightPanel
              darkMode={darkMode}
              result={result}
              maxResult={maxResult}
            />
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a unbelievable task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="modal-form" onSubmit={addTask}>
            <input
              type="text"
              placeholder="Title"
              value={selectedItem?.title || ""}
              required
              onChange={(e) =>
                setSelectedItem((ov) => ({ ...ov, title: e.target.value }))
              }
            />
            <input
              type="date"
              value={selectedItem?.date || ""}
              required
              onChange={(e) =>
                setSelectedItem((ov) => ({ ...ov, date: e.target.value }))
              }
            />
            <textarea
              id="noter-text-area"
              name="textarea"
              value={selectedItem?.description || ""}
              onChange={(e) =>
                setSelectedItem((ov) => ({
                  ...ov,
                  description: e.target.value,
                }))
              }
            />
            <label>
              <input
                type="checkbox"
                checked={selectedItem?.complated}
                onChange={(e) =>
                  setSelectedItem((ov) => ({
                    ...ov,
                    complated: !selectedItem.complated,
                  }))
                }
              />
              Mark as completed
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedItem?.important}
                onChange={(e) =>
                  setSelectedItem((ov) => ({
                    ...ov,
                    important: !selectedItem.important,
                  }))
                }
              />
              Mark as important
            </label>

            <select
              value={selectedItem?.status}
              onChange={(e) => {
                setSelectedItem((ov) => ({
                  ...ov,
                  status: e.target.value,
                }));
              }}
            >
              <option value="Main">Main</option>
            </select>
            <button type="submit" className="primary button">
              Add a task
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MainLayout;
