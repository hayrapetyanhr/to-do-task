import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  mode: false,
  inputValue: "",
  selectedItem: {
    title: "",
    date: "",
    description: "",
    complated: false,
    important: false,
    status: "Main",
    userId: "",
  },
  show: false,
  login: false,
  name: "",
  password: "",
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
      console.log("state111111", state);
      console.log("action", action);
      state.tasks = action.payload;
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
    setName(state, action) {
      state.name = action.payload;
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
  setName,
  setPassword,
  setCategories,
  setCatValue,
  setCatModalShow,
} = appSlice.actions;

export default appSlice.reducer;
