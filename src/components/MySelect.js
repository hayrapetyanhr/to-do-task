import { Form, Select } from "antd";
import React from "react";

const MySelect = ({ name, labelName, options, onChange, value }) => {
  return (
    <Form.Item label={labelName} name={name}>
      <Select onChange={onChange} options={options} value={value}></Select>
    </Form.Item>
  );
};

export default MySelect;
