import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
  setSelectedItem,
  setShow,
  removeTask,
  toggleCompleted,
  toggleImportant,
} from "../redux/app/appSlice";

export default function Tasks({ tasks }) {
  const dispatch = useDispatch();

  const userID = JSON.parse(localStorage.getItem("currentUser"))?.userID;

  const editTasks = (id) => {
    const editTask = tasks.find((task) => task.id === id);
    console.log("editTask", editTask);
    if (editTask) {
      const updatedTask = {
        ...editTask,
        date: dayjs(editTask.date).format("YYYY-MM-DD"),
      };
      console.log("tasks", tasks);
      dispatch(setSelectedItem(updatedTask));
      // console.log("selectedItem", selectedItem);
    }
    dispatch(setShow(true));
  };

  return (
    <div className="task-row">
      {(tasks || [])
        ?.filter((item) => item.userID === userID)
        .map((task) => {
          return !task.title.includes("d") ? (
            <div key={task.id} className="task-item">
              <div>
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <div>{dayjs(task.date).format("DD-MM-YYYY")}</div>
              </div>
              <div className="status">{task.status}</div>
              <div className="item-options">
                <button
                  className={task.completed ? "completed" : "uncompleted"}
                  onClick={() => dispatch(toggleCompleted(task.id))}
                >
                  {task.completed ? "completed" : "uncompleted"}
                </button>
                <button
                  className="important"
                  onClick={() => dispatch(toggleImportant(task.id))}
                >
                  {task.important ? "⭐" : "☆"}
                </button>
                <button onClick={() => dispatch(removeTask(task.id))}>
                  🗑️
                </button>
                <button onClick={() => editTasks(task.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 128 512"
                    fill="currentColor"
                    width={"4px"}
                  >
                    <path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"></path>
                  </svg>
                </button>
              </div>
            </div>
          ) : null;
        })}
    </div>
  );
}
