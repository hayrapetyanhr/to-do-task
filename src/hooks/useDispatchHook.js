import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/app/appSlice";

const useDispatchHook = (filterFn) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (result) {
      dispatch(setTasks(result.filter(filterFn)));
    }
  }, [dispatch, filterFn]);
};

export default useDispatchHook;
