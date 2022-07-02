import React from "react";
import "./NextButton.scss";

function NextButton({ nextClick, clearValue, flagchange }) {
  return (
    <button
      onClick={() => {
        nextClick();
        clearValue();
        flagchange();
      }}
      className="nextbutton-main"
    >
      Next
    </button>
  );
}

export default NextButton;
