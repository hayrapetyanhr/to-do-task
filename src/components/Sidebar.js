import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCatModalShow } from "../redux/app/appSlice";
import AddButton from "./AddButton";
import Dropdown from "react-bootstrap/Dropdown";

export default function Sidebar() {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.app);

  const navigate = useNavigate();

  const toggleModal = () => {
    dispatch(setCatModalShow(true));
  };

  return (
    <div className="left-sidebar">
      <h1>To-do list</h1>
      <AddButton />
      <div className="categories">
        <ul>
          <li>
            <button onClick={() => navigate("/today")}>Today's tasks</button>
          </li>
          <li>
            <button onClick={() => navigate("/")}>All tasks</button>
          </li>
          <li>
            <button onClick={() => navigate("/important")}>
              Important tasks
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/completed")}>
              Completed tasks
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/uncompleted")}>
              Uncompleted tasks
            </button>
          </li>
        </ul>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Categories
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() =>
                navigate("/categories/main", { state: { name: "main" } })
              }
            >
              Main
            </Dropdown.Item>
            {categories.map((item, index) => {
              return (
                <Dropdown.Item
                  onClick={() =>
                    navigate(`/categories/${item.name}`, {
                      state: { name: item.name },
                    })
                  }
                  key={index}
                >
                  {item.name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        <button onClick={toggleModal} className="add-cat">
          + New
        </button>
      </div>
    </div>
  );
}
