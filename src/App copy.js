import { useState, useEffect } from "react";
import "./App.scss";
import dayjs from "dayjs";
import Modal from "react-bootstrap/Modal";
import Sidebar from "./components/Sidebar";
import RightPanel from "./components/RightPanel";
import { Routes, Route } from "react-router-dom";
import Today from "./pages/Today";
import Important from "./pages/Important";
import Completed from "./pages/Completed";
import Uncompleted from "./pages/Uncompleted";
import Tasks from "./components/Tasks";
import AddButton from "./components/AddButton";
import AllTasks from "./pages/AllTasks";

const initialStateItem = {
  title: "",
  date: "",
  description: "",
  complated: false,
  important: false,
  status: "Main",
};

function App() {
  const date = dayjs().format("DD-MMM-YYYY");
  const [show, setShow] = useState(false);
  const [taskes, setTaskes] = useState([]);
  const [selectedItem, setSelectedItem] = useState(initialStateItem);
  const [mode, setMode] = useState(false);
  const [view, setView] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClose = () => {
    setShow(false);
    setSelectedItem(initialStateItem);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("tasks"));
    if (items) {
      setTaskes(items);
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
      ? [...taskes, newTask]
      : taskes.map((task) =>
          selectedItem.id === task.id ? selectedItem : task
        );
    updatedList(newList);
    setSelectedItem(initialStateItem);
    handleClose();
  };

  const updatedList = (list) => {
    setTaskes(list);
    setSelectedItem(initialStateItem);
    localStorage.setItem("tasks", JSON.stringify(list));
  };

  const resetTasks = () => {
    const storT = JSON.parse(localStorage.getItem("tasks"));
    setTaskes(storT);
  };

  const removeItem = (id) => {
    updatedList(taskes.filter((task) => task.id !== id));
  };

  const triggerComplated = (id) => {
    updatedList(
      taskes.map((task) =>
        task.id === id ? { ...task, complated: !task.complated } : task
      )
    );
  };

  const triggerImportant = (id) => {
    updatedList(
      taskes.map((task) =>
        task.id === id ? { ...task, important: !task.important } : task
      )
    );
  };

  const editTasks = (id) => {
    const editTask = taskes.find((task) => task.id === id);
    if (editTask) {
      editTask.date = dayjs(editTask.date).format("YYYY-MM-DD");
      setSelectedItem(editTask);
    }
    handleShow();
  };

  const result = taskes.filter((i) => i.complated).length;
  const maxResult = taskes.filter((i) => i).length;

  const darkMode = () => {
    setMode(!mode);
  };

  const addTaskInSerachList = (id) => {
    if (inputValue) {
      const searchList = taskes.filter((task) => task.id === id);
      setTaskes(searchList);
    }
    setInputValue("");
  };

  const addAllTaskInSerachList = () => {
    const searchList = taskes.filter((task) => task.title.includes(inputValue));
    setTaskes(searchList);
    setInputValue("");
  };

  return (
    <div className={mode ? "app-main dark" : "app-main"}>
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
                    {taskes
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
                      (taskes.find((task) =>
                        task.title.includes(inputValue)
                      ) ? (
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width={"24px"}
                    height={"24px"}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    ></path>
                  </svg>
                </button>
                <button
                  className={view ? "" : "active"}
                  onClick={() => setView(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width={"24px"}
                    height={"24px"}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className={view ? "task-row block" : "task-row"}>
                <Tasks
                  taskes={taskes}
                  triggerComplated={triggerComplated}
                  triggerImportant={triggerImportant}
                  removeItem={removeItem}
                  editTasks={editTasks}
                />
                <Routes>
                  <Route path="/" element={<AllTasks taskes={taskes} />} />
                  <Route path="/today" element={<Today />} />
                  <Route path="/important" element={<Important />} />
                  <Route path="/completed" element={<Completed />} />
                  <Route path="/uncompleted" element={<Uncompleted />} />
                </Routes>
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
              max="2024-12-31"
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
}

export default App;
