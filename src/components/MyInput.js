import { Form, Input } from "antd";
import React from "react";

const MyInput = ({
  labelName,
  name,
  value,
  placeholder,
  onChange,
  required,
}) => {
  return (
    <Form.Item
      label={labelName}
      name={name}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      rules={[{ required, message: `${labelName} is required` }]}
    >
      <Input
        value={value}
        placeholder={placeholder || labelName}
        onChange={onChange}
      />
    </Form.Item>
  );
};

export default MyInput;
