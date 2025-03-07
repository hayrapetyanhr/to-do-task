// import React, { useEffect } from "react";
// import Tasks from "../components/Tasks";
// import { useDispatch } from "react-redux";
// import { setTasks } from "../redux/app/appSlice";

// export default function Uncompleted() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const result = JSON.parse(localStorage.getItem("tasks") || "[]");
//     if (result) {
//       dispatch(setTasks(result.filter((task) => task.complated === false)));
//     }
//   }, [dispatch]);

//   return <Tasks />;
// }

// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import Tasks from "../components/Tasks";

// export default function Uncompleted() {
//   const { tasks } = useSelector((state) => state.app);

//   return <Tasks tasks={tasks.filter((item) => item.completed === false)} />;
// }

import React from "react";
import { useSelector } from "react-redux";
import Tasks from "../components/Tasks";

export default function Uncompleted() {
  const { tasks } = useSelector((state) => state.app);
  const filteredUncompleted = tasks.filter((item) => item.completed === false);

  return <Tasks tasks={filteredUncompleted} />;
}
