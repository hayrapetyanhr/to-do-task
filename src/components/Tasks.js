import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedItem, setShow, setTasks } from "../redux/app/appSlice";
export default function Tasks() {
  const dispatch = useDispatch();

  const { tasks, useriD } = useSelector((state) => state.app);

  const removeItem = (id) => {
    dispatch(setTasks(tasks.filter((task) => task.id !== id)));
  };

  const triggerComplated = (id) => {
    dispatch(
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, complated: !task.complated } : task
        )
      )
    );
  };

  const triggerImportant = (id) => {
    dispatch(
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, important: !task.important } : task
        )
      )
    );
  };

  const editTasks = (id) => {
    const editTask = tasks.find((task) => task.id === id);
    if (editTask) {
      const updatedTask = {
        ...editTask,
        date: dayjs(editTask.date).format("YYYY-MM-DD"),
      };
      dispatch(setSelectedItem(updatedTask));
    }
    dispatch(setShow(true));
  };

  return (
    <div className="task-row">
      {tasks
        .filter((item) => item.useriD === useriD)
        .map((task) => {
          return (
            <div key={task.id} className="task-item">
              <div>
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <div>{dayjs(task.date).format("DD-MM-YYYY")}</div>
              </div>
              <div className="status">{task.status}</div>
              <div className="item-options">
                <button
                  className={task.complated ? "completed" : "uncompleted"}
                  onClick={() => triggerComplated(task.id)}
                >
                  {task.complated ? "completed" : "uncompleted"}
                </button>
                <button
                  className="important"
                  onClick={() => triggerImportant(task.id)}
                >
                  {task.important ? "⭐" : "☆"}
                </button>
                <button onClick={() => removeItem(task.id)}>🗑️</button>
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
          );
        })}
    </div>
  );
}
