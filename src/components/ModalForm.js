import React from "react";
import Modal from "react-bootstrap/Modal";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import {
  setShow,
  setSelectedItem,
  addTask,
  updateTask,
} from "../redux/app/appSlice";

const ModalForm = ({ updatedList }) => {
  const dispatch = useDispatch();

  const { show, selectedItem, tasks, categories } = useSelector(
    (state) => state.app
  );

  const handleClose = () => {
    dispatch(setShow(false));
    dispatch(
      setSelectedItem({
        title: "",
        date: "",
        description: "",
        completed: false,
        important: false,
        status: "main",
        userID: "",
      })
    );
  };

  const getCorrentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userID = getCorrentUser ? getCorrentUser.userID : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !selectedItem?.title ||
      !selectedItem?.date ||
      !selectedItem?.description
    ) {
      return;
    }

    const isNew = !selectedItem?.id;

    const updatedTask = {
      ...selectedItem,
      userID,
      date: new Date(selectedItem.date).toISOString(),
    };

    if (isNew) {
      updatedTask.id = Date.now();
      dispatch(addTask(updatedTask));
      updatedList([...tasks, updatedTask]);
    } else {
      dispatch(updateTask({ id: selectedItem.id, updatedTask }));

      const updatedTasks = tasks.map((task) =>
        task.id === selectedItem.id ? updatedTask : task
      );
      updatedList(updatedTasks);
    }

    dispatch(setSelectedItem(selectedItem));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a unbelievable task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="modal-form" onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="text"
            placeholder="Title"
            label="Title"
            value={selectedItem?.title || ""}
            required
            onChange={(e) =>
              dispatch(
                setSelectedItem({ ...selectedItem, title: e.target.value })
              )
            }
          />
          <Input
            type="date"
            value={selectedItem?.date || ""}
            label="Date"
            required
            onChange={(e) =>
              dispatch(
                setSelectedItem({
                  ...selectedItem,
                  date: e.target.value,
                })
              )
            }
          />
          <textarea
            id="noter-text-area"
            name="textarea"
            value={selectedItem?.description || ""}
            onChange={(e) =>
              dispatch(
                setSelectedItem({
                  ...selectedItem,
                  description: e.target.value,
                })
              )
            }
          />
          <label>
            <input
              type="checkbox"
              checked={selectedItem?.completed}
              onChange={(e) =>
                dispatch(
                  setSelectedItem({
                    ...selectedItem,
                    completed: !selectedItem.completed,
                  })
                )
              }
            />
            Mark as completed
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedItem?.important}
              onChange={(e) =>
                dispatch(
                  setSelectedItem({
                    ...selectedItem,
                    important: !selectedItem.important,
                  })
                )
              }
            />
            Mark as important
          </label>
          <select
            value={selectedItem?.status}
            onChange={(e) => {
              dispatch(
                setSelectedItem({
                  ...selectedItem,
                  status: e.target.value,
                })
              );
            }}
          >
            <option value="main">Main</option>
            {categories.map((item, index) => {
              return (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <button type="submit" className="primary button">
            Add a task
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
