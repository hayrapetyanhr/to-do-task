import React from "react";
import { useDispatch } from "react-redux";
import { setShow } from "../redux/app/appSlice";

export default function AddButton() {
  const dispatch = useDispatch();
  return (
    <button
      className="button primary"
      type="button"
      onClick={() => dispatch(setShow(true))}
    >
      Add new task
    </button>
  );
}
