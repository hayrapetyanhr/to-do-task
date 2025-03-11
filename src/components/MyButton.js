import React from "react";
import { Button } from "antd";

const MyButton = ({ type, onClick, children, htmlType, color, style }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      htmlType={htmlType}
      color={color}
      style={style}
    >
      {children}
    </Button>
  );
};

export default MyButton;
