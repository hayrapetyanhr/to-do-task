// import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import Tasks from "../components/Tasks";
// import { useDispatch, useSelector } from "react-redux";
// import { setTasks } from "../redux/app/appSlice";

// const Categories = () => {
//   const { tasks } = useSelector((state) => state.app);
//   const dispatch = useDispatch();
//   const location = useLocation();

//   useEffect(() => {
//     const result = JSON.parse(localStorage.getItem("tasks") || "[]");
//     if (result) {
//       dispatch(
//         setTasks(result.filter((item) => item.status === location?.state?.name))
//       );
//     }
//   }, [location?.state?.name]);

//   return <Tasks tasks={tasks} />;
// };
// export default Categories;

// import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import Tasks from "../components/Tasks";
// import { useDispatch, useSelector } from "react-redux";
// import { setTasks } from "../redux/app/appSlice";

// const Categories = () => {
//   const { tasks } = useSelector((state) => state.app);
//   const location = useLocation();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const storedData = localStorage.getItem("persist:root");

//     if (storedData) {
//       try {
//         const parsedData = JSON.parse(storedData);
//         if (parsedData.tasks) {
//           dispatch(setTasks(JSON.parse(parsedData.tasks)));
//         }
//       } catch (error) {
//         console.error("Error parsing stored tasks:", error);
//       }
//     }
//   }, [dispatch]);

//   const filteredTasks =
//     tasks?.filter((item) => item.status === location?.state?.name) || [];

//   return <Tasks tasks={filteredTasks} />;
// };

// export default Categories;

import React from "react";
import { useSelector } from "react-redux";
import Tasks from "../components/Tasks";
import { useLocation } from "react-router-dom";

export default function Categories() {
  const location = useLocation();
  const { tasks } = useSelector((state) => state.app);
  const filteredCategories = tasks.filter(
    (item) => item.status === location?.state?.name
  );

  return <Tasks tasks={filteredCategories} />;
}
