import React, { useState } from "react";
import InputStyles from "./Input.module.css";

type InputComponentProps = {
  onChange: any,
  icon?: string;
  placeholder: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  value?: string;
  type?: "password" | "text" | "number",
};

function InputComponent(props: InputComponentProps) {
  const { onChange, icon, placeholder, inputRef, value, type } = props;
  
  return (
    <div className={InputStyles["input-container"]}>
      {icon && <img src={icon} alt="Icon" />}
      <input type={type} placeholder={placeholder} onChange={onChange} ref={inputRef} value={value}/>
    </div>
  );
}

export default InputComponent;
