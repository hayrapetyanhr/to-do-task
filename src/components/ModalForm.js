import React, { useEffect } from "react";
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
import MyCheckbox from "./MyCheckbox";
import MyTextarea from "./MyTextarea";
import MySelect from "./MySelect";

const initialValues = {
  title: "",
  date: "",
  description: "",
  completed: false,
  important: false,
  status: "main",
  userID: "",
};

const ModalForm = ({ updatedList }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { show, tasks, categories, selectedItem } = useSelector(
    (state) => state.app
  );

  form.setFieldsValue(selectedItem.id ? selectedItem : initialValues);
  dispatch(setSelectedItem(selectedItem.id ? selectedItem : initialValues));
  const handleClose = () => {
    dispatch(setShow(false));
    form.setFieldsValue(initialValues);
    dispatch(setSelectedItem(initialValues));
  };

  const getCorrentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userID = getCorrentUser ? getCorrentUser.userID : null;

  const onFinish = (values) => {
    console.log("Success:", values);

    const isNew = !selectedItem?.id;

    const updatedTask = {
      ...values,
      userID,
      date: values.date ? new Date(values.date).toISOString() : "",
    };

    if (isNew) {
      console.log("isNewmtav!!", isNew);
      updatedTask.id = Date.now();
      dispatch(addTask(updatedTask));
      updatedList([...tasks, updatedTask]);
      console.log("[...tasks, updatedTask]", [...tasks, updatedTask]);
    } else {
      dispatch(updateTask({ id: values.id, updatedTask }));

      const updatedTasks = tasks.map((task) =>
        task.id === values.id ? updatedTask : task
      );
      console.log(updatedTasks);
      updatedList(updatedTasks);
    }

    dispatch(
      setSelectedItem({
        ...values,
        date: values.date ? new Date(values.date).toISOString() : "",
      })
    );
    handleClose();
  };

  const onFinishFailed = (errorInfo) => {
    alert("All required fields must be filled");
  };

  const options = [
    { value: "main", label: "Main" },
    ...categories.map((item) => ({
      value: item.name,
      label: item.name,
    })),
  ];

  return (
    <Modal
      title="Create new task"
      open={show}
      onOk={handleClose}
      onCancel={handleClose}
      footer={false}
    >
      <Form
        form={form}
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
        initialValues={selectedItem}
      >
        <MyInput labelName="Title" name="title" required={true} />
        {/* <MyInputDatePicker
          required={true}
          labelName="Date"
          name="date"
          style={{
            width: "100%",
          }}
        /> */}
        <MyTextarea
          labelName="Desctiption"
          name="description"
          required={true}
        />
        <MyCheckbox name="completed" label="Mark as completed" />
        <MyCheckbox name="important" label="Mark as important" />
        <MySelect name="status" style={{ width: 120 }} options={options} />
        <MyButton htmlType="submit">Add a task</MyButton>
      </Form>
    </Modal>
  );
};

export default ModalForm;
