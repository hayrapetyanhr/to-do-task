import React from "react";
import { Button } from "antd";

const MyButton = ({ type, onClick, children, htmlType }) => {
  return (
    <Button type={type} onClick={onClick} htmlType={htmlType}>
      {children}
    </Button>
  );
};

export default MyButton;
