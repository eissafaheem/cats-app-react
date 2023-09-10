import React, { useState } from 'react'
import InputStyles from './Input.module.css' 

type InputComponentProps ={
    setValue: React.Dispatch<React.SetStateAction<string>>,
    icon?: string,
    placeholder: string
}

function InputComponent(props: InputComponentProps) {

    const {
        setValue,
        icon,
        placeholder
    } = props;

  return (
    <div className={InputStyles['input-container']}>
        {icon && <img src={icon} alt="Icon" />}
      <input type="text" placeholder={placeholder}/>
    </div>
  )
}

export default InputComponent
