// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Tasks from "../components/Tasks";
// import { setTasks } from "../redux/app/appSlice";

// export default function AllTasks() {
//   const { tasks } = useSelector((state) => state.app);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
//     dispatch(setTasks(storedTasks));
//   }, [dispatch]);

//   return <Tasks tasks={tasks} />;
// }
import React from "react";
import { useSelector } from "react-redux";
import Tasks from "../components/Tasks";

export default function AllTasks() {
  const tasks = useSelector((state) => state.app.tasks);

  return <Tasks tasks={tasks} />;
}
