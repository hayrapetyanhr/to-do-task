import React, { useEffect } from "react";
import Tasks from "../components/Tasks";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/app/appSlice";

export default function AllTasks() {
  const dispatch = useDispatch();

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (result) {
      dispatch(setTasks(result.filter((task) => task.complated === true)));
    }
  }, [dispatch]);

  return <Tasks />;
}
