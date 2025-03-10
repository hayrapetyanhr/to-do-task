import { DatePicker, Form } from "antd";
import React from "react";

const MyInputDatePicker = ({ labelName, name, value, style }) => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <Form.Item
      label={labelName}
      name={name}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <DatePicker
        format={{
          format: "MM-DD-YYYY",
          type: "mask",
        }}
        value={value}
        onChange={onChange}
        style={style}
      />
    </Form.Item>
  );
};

export default MyInputDatePicker;
