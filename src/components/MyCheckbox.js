import { Checkbox, Form } from "antd";
import React from "react";

const MyCheckbox = ({ onChange, name, label }) => {
  return (
    <Form.Item
      className="my-checkbox-form-item"
      name={name}
      valuePropName="checked"
    >
      <Checkbox
        className="my-checkbox"
        onChange={(e) => {
          onChange && onChange(e.target.checked);
        }}
      >
        {label}
      </Checkbox>
    </Form.Item>
  );
};

export default MyCheckbox;
