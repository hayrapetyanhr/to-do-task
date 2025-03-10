import { Select } from "antd";
import React from "react";

const MySelect = ({ options, onChange, value }) => {
  return <Select onChange={onChange} options={options} value={value}></Select>;
};

export default MySelect;
