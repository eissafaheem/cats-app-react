import React from "react";
import ChipStyles from "./Chip.module.css";
import closeIcon from './../../../../assets/close-icon.svg'

type ChipProps = {
  text: string;
  onCrossClick: () => void;
};

function ChipConponent(props: ChipProps) {
  const { onCrossClick, text } = props;

  return (
    <span className={ChipStyles["chip-container"]}>
      <span>{text}</span>
      <img src={closeIcon} alt="Close" onClick={onCrossClick}/>
    </span>
  );
}

export default ChipConponent;
