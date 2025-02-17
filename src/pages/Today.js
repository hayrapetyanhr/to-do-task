import React, { useEffect } from "react";
import dayjs from "dayjs";
import Tasks from "../components/Tasks";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/app/appSlice";

export default function AllTasks() {
  const dispatch = useDispatch();

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (result) {
      let now = dayjs().format("YYYY-MM-DD");
      dispatch(setTasks(result.filter((task) => task.date.includes(now))));
    }
  }, [dispatch]);

  return <Tasks />;
}
