import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Tasks from "../components/Tasks";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../redux/app/appSlice";

const Categories = () => {
  const { tasks } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (result) {
      dispatch(
        setTasks(result.filter((item) => item.status === location?.state?.name))
      );
    }
  }, [location?.state?.name]);

  return <Tasks tasks={tasks} />;
};
export default Categories;
