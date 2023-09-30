import React, { useState } from "react";
import InputStyles from "./Input.module.css";

type InputComponentProps = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  icon?: string;
  placeholder: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  value?: string;
  type?: "password" | "text" | "number"
};

function InputComponent(props: InputComponentProps) {
  const { setValue, icon, placeholder, inputRef, value, type } = props;

  function setInputValue(event: any) {
    setValue(event.target.value);
  }
  
  return (
    <div className={InputStyles["input-container"]}>
      {icon && <img src={icon} alt="Icon" />}
      <input type={type} placeholder={placeholder} onChange={setInputValue} ref={inputRef} value={value}/>
    </div>
  );
}

export default InputComponent;
