import React from "react";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import {
  setShow,
  setSelectedItem,
  addTask,
  updateTask,
} from "../redux/app/appSlice";
import { Checkbox, Form, Modal } from "antd";
import MyButton from "./MyButton";
import MyInput from "./MyInput";
import MyInputDatePicker from "./MyInputDatePicker";
import TextArea from "antd/es/input/TextArea";
import MyCheckbox from "./MyCheckbox";
import MyTextarea from "./MyTextarea";

const ModalForm = ({ updatedList }) => {
  const dispatch = useDispatch();

  const { show, selectedItem, tasks, categories } = useSelector(
    (state) => state.app
  );

  const handleClose = () => {
    dispatch(setShow(false));
    dispatch(
      setSelectedItem({
        title: "",
        date: "",
        description: "",
        completed: false,
        important: false,
        status: "main",
        userID: "",
      })
    );
  };

  const getCorrentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userID = getCorrentUser ? getCorrentUser.userID : null;

  const onFinish = (values) => {
    console.log("Success:", values);

    const isNew = !values?.id;

    const updatedTask = {
      ...values,
      userID,
      date: new Date(values.date).toISOString(),
    };

    console.log("isNew", isNew);

    if (isNew) {
      updatedTask.id = Date.now();
      dispatch(addTask(updatedTask));
      updatedList([...tasks, updatedTask]);
      console.log("[...tasks, updatedTask]", [...tasks, updatedTask]);
    } else {
      dispatch(updateTask({ id: values.id, updatedTask }));

      const updatedTasks = tasks.map((task) =>
        task.id === values.id ? updatedTask : task
      );
      updatedList(updatedTasks);
    }

    dispatch(setSelectedItem(values));
    handleClose();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Create new task"
      open={show}
      onOk={handleClose}
      onCancel={handleClose}
      footer={false}
    >
      <Form
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <MyInput labelName="Title" name="title" required={true} />
        <MyInputDatePicker
          labelName="Date"
          name="date"
          style={{
            width: "100%",
          }}
        />
        <MyTextarea labelName="Desctiption" name="description" />
        <MyCheckbox name="completed" label="Mark as completed" />
        <MyCheckbox name="important" label="Mark as important" />
        <select
          value={selectedItem?.status}
          onChange={(e) => {
            dispatch(
              setSelectedItem({
                ...selectedItem,
                status: e.target.value,
              })
            );
          }}
        >
          <option value="main">Main</option>
          {categories.map((item, index) => {
            return (
              <option value={item.name} key={index}>
                {item.name}
              </option>
            );
          })}
        </select>
        <MyButton htmlType="submit">Add a task</MyButton>
      </Form>
    </Modal>
  );
};

export default ModalForm;
