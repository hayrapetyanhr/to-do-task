import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AllTasks from "../pages/AllTasks";
import Completed from "../pages/Completed";
import Important from "../pages/Important";
import Today from "../pages/Today";
import Uncompleted from "../pages/Uncompleted";
import MainLayout from "../layout/MainLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Categories from "../pages/Categories";

export const TASKS_TYPES = {
  ALL: "all",
  TODAY: "today",
  COMPLETED: "completed",
  IMPORTANT: "important",
  UNCOMPLETED: "uncompleted",
  CATEGORIES: "categories",
};

const AppRoutes = () => {
  const location = useLocation();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout type={TASKS_TYPES.ALL}>
            <AllTasks />
          </MainLayout>
        }
      />
      <Route
        path="/today"
        element={
          <MainLayout type={TASKS_TYPES.TODAY}>
            <Today />
          </MainLayout>
        }
      />
      <Route
        path="/important"
        element={
          <MainLayout type={TASKS_TYPES.IMPORTANT}>
            <Important />
          </MainLayout>
        }
      />
      <Route
        path="/completed"
        element={
          <MainLayout type={TASKS_TYPES.COMPLETED}>
            <Completed />
          </MainLayout>
        }
      />
      <Route
        path="/uncompleted"
        element={
          <MainLayout type={TASKS_TYPES.UNCOMPLETED}>
            <Uncompleted />
          </MainLayout>
        }
      />
      <Route
        path={`/categories/${location?.state?.name}`}
        element={
          <MainLayout type={TASKS_TYPES.CATEGORIES}>
            <Categories />
          </MainLayout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
