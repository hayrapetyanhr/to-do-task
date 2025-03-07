// import React, { useEffect } from "react";
// import Tasks from "../components/Tasks";
// import { useDispatch } from "react-redux";
// import { setTasks } from "../redux/app/appSlice";

// export default function Completed() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const result = JSON.parse(localStorage.getItem("tasks") || "[]");
//     if (result) {
//       dispatch(setTasks(result.filter((task) => task.complated === true)));
//     }
//   }, [dispatch]);

//   return <Tasks />;
// }

// import React from "react";
// import { useSelector } from "react-redux";
// import Tasks from "../components/Tasks";

// export default function Completed() {
//   const { tasks } = useSelector((state) => state.app);

//   const completedTasks = tasks.filter((task) => task.completed === true);
//   console.log("completedTasks", completedTasks);

//   return (
//     <>
//       <Tasks tasks={completedTasks} />
//       <div>nothing</div>
//     </>
//   );
// }
import React from "react";
import { useSelector } from "react-redux";
import Tasks from "../components/Tasks";

export default function Important() {
  const { tasks } = useSelector((state) => state.app);
  const filteredCompleted = tasks.filter((item) => item.completed);

  return <Tasks tasks={filteredCompleted} />;
}
