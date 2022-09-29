import React from "react";
import classes from "./Button.module.css";

const Button = ({ children, onClick, type, isActive }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${classes.button} ${isActive ? classes.active : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
