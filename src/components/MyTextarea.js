import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const MyTextarea = ({
  labelName,
  name,
  required,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Form.Item
      label={labelName}
      name={name}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      rules={[{ required, message: `${labelName} is required` }]}
    >
      <TextArea
        rows={4}
        placeholder={placeholder || labelName}
        value={value}
        onChange={onChange}
      />
    </Form.Item>
  );
};

export default MyTextarea;
