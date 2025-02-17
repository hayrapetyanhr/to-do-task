import React from "react";
import Modal from "react-bootstrap/Modal";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { setShow, setSelectedItem } from "../redux/app/appSlice";

const ModalForm = ({ updatedList }) => {
  const dispatch = useDispatch();

  const { tasks, show, initialStateItem, selectedItem, useriD, categories } =
    useSelector((state) => state.app);

  const handleClose = () => {
    dispatch(setShow(false));
    dispatch(setSelectedItem(initialStateItem));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (
      !selectedItem?.title ||
      !selectedItem?.date ||
      !selectedItem?.description
    )
      return;

    const isNew = !Boolean(selectedItem?.id);

    const find = tasks.find(
      (task) => task.title?.toLowerCase() === selectedItem.title?.toLowerCase()
    );
    if (!find) {
      const newTask = {
        title: selectedItem?.title,
        date: new Date(selectedItem?.date).toISOString(),
        description: selectedItem?.description,
        complated: selectedItem?.complated,
        important: selectedItem?.important,
        status: selectedItem?.status,
        useriD: useriD,
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
      dispatch(setSelectedItem(initialStateItem));
      handleClose();
    } else {
      alert("this task is already created Broooo!!!!!!!!!!");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a unbelievable task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="modal-form" onSubmit={addTask}>
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
              checked={selectedItem?.complated}
              onChange={(e) =>
                dispatch(
                  setSelectedItem({
                    ...selectedItem,
                    complated: !selectedItem.complated,
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
            <option value="Main">Main</option>
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
