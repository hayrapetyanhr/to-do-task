import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Tasks from "../components/Tasks";
import { setTasks } from "../redux/app/appSlice";

export default function AllTasks() {
  const tasks = useSelector((state) => {
    return state?.app?.tasks;
  });

  console.log("tasks", tasks);

  useEffect(() => {
    if (tasks) {
      setTasks(tasks);
    }
  }, []);

  return <Tasks />;
}
