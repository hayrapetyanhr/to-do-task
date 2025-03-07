// import React, { useEffect } from "react";
// import Tasks from "../components/Tasks";
// import { useDispatch } from "react-redux";
// import { setTasks } from "../redux/app/appSlice";

// export default function Important() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const result = JSON.parse(localStorage.getItem("tasks") || "[]");
//     if (result) {
//       dispatch(setTasks(result.filter((task) => task.important === true)));
//     }
//   }, [dispatch]);

//   return <Tasks />;
// }

import React from "react";
import { useSelector } from "react-redux";
import Tasks from "../components/Tasks";

export default function Important() {
  const { tasks } = useSelector((state) => state.app);
  const filteredImportant = tasks.filter((item) => item.important === true);

  return <Tasks tasks={filteredImportant} />;
}
