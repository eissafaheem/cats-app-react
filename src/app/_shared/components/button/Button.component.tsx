import React from 'react'
import ButtonStyles from './Button.module.css'

type ButtonProps = {
    onClick?: any,
    text?: string,
    icon?: string
}

function ButtonComponent(props: ButtonProps) {

    const {
        onClick,
        text,
        icon
    } = props;

    return (
        <button>
            <div className={ButtonStyles['button-container']} onClick={onClick}>
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
