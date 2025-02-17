import Modal from "react-bootstrap/Modal";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCatValue,
  setCatModalShow,
  setCategories,
} from "../redux/app/appSlice";

const ModalCategory = () => {
  const dispatch = useDispatch();

  const { catValue, catModalShow, categories } = useSelector(
    (state) => state.app
  );

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("Category") || "[]");
    if (result) {
      dispatch(setCategories(result));
    }
  }, []);

  const addCategory = (e) => {
    e.preventDefault();
    const newCat = {
      name: catValue,
    };
    dispatch(setCategories([...categories, newCat]));
    localStorage.setItem("Category", JSON.stringify(categories));
    dispatch(setCatModalShow(false));
    dispatch(setCatValue(""));
  };

  return (
    <Modal show={catModalShow} onHide={() => dispatch(setCatModalShow(false))}>
      <Modal.Header closeButton>
        <Modal.Title>Create new directory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="modal-form" onSubmit={addCategory}>
          <input
            type="text"
            placeholder="Title"
            value={catValue}
            required
            onChange={(e) => dispatch(setCatValue(e.target.value))}
          />
          <button type="submit" className="primary button w-25">
            Create
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCategory;
