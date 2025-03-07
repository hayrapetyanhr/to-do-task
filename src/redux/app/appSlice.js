import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  originalTasks: [],
  mode: false,
  inputValue: "",
  selectedItem: {
    title: "",
    date: "",
    description: "",
    completed: false,
    important: false,
    id: Date.now(),
    status: "main",
    userID: "",
  },
  show: false,
  name: "",
  categories: [],
  catValue: "",
  catModalShow: false,
  result: 0,
  maxResult: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        ...action.payload,
      };
      state.tasks.push(newTask);
      state.originalTasks.push(newTask);
    },
    updateTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index >= 0) {
        state.tasks[index] = { ...state.tasks[index], ...updatedTask };
      }
    },
    removeTask: (state, action) => {
      console.log("Removing task with id:", action.payload);
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleCompleted: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    toggleImportant: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.important = !task.important;
      }
    },

    setMode(state, action) {
      state.mode = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setMaxResult: (state, action) => {
      state.maxResult = action.payload;
    },
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    resetTasks(state) {
      state.tasks = [...state.originalTasks];
    },
    setInputValue(state, action) {
      state.inputValue = action.payload;
    },
    setSelectedItem(state, action) {
      state.selectedItem = action.payload;
    },
    setShow(state, action) {
      state.show = action.payload;
    },
    setLogin(state, action) {
      state.login = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setCatValue(state, action) {
      state.catValue = action.payload;
    },
    setCatModalShow(state, action) {
      state.catModalShow = action.payload;
    },
  },
});

export const {
  setMode,
  setTasks,
  setInputValue,
  setSelectedItem,
  setShow,
  setLogin,
  setCurrentUserID,
  setPassword,
  setCategories,
  setCatValue,
  setCatModalShow,
  addTask,
  updateTask,
  removeTask,
  toggleCompleted,
  toggleImportant,
  resetTasks,
} = appSlice.actions;

export default appSlice.reducer;
