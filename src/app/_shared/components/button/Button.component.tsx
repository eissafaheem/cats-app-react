import React from 'react'
import ButtonStyles from './Button.module.css'

type ButtonProps = {
    onClick?: any,
    text?: string,
    icon?: string,
    isDisabled?: boolean
}

function ButtonComponent(props: ButtonProps) {

    const {
        onClick,
        text,
        icon,
        isDisabled
    } = props;

    return (
        <button disabled={isDisabled}>
            <div className={`${ButtonStyles['button-container']} ${isDisabled && ButtonStyles['disabled-button']}`} onClick={onClick}>
                {
                    text
                    &&
                    <div className={ButtonStyles["button-text"]}>
                        {text}
                    </div>
                }
                <div className={ButtonStyles["button-image"]}>
                    <img src={icon} alt="" />
                </div>
            </div>
        </button>
    )
}

export default ButtonComponent
