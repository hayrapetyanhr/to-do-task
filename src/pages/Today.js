import React from "react";
import { useSelector } from "react-redux";
import Tasks from "../components/Tasks";
import dayjs from "dayjs";

export default function Important() {
  const { tasks } = useSelector((state) => state.app);
  let now = dayjs().format("YYYY-MM-DD");
  const filteredCompleted = tasks.filter((item) => item.date.includes(now));

  return <Tasks tasks={filteredCompleted} />;
}
