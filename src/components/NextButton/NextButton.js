import React from "react";
import "./NextButton.scss";

function NextButton({ nextClick, flagchange }) {
  return (
    <button
      onClick={() => {
        nextClick();

        flagchange();
      }}
      className="nextbutton-main"
    >
      Next
    </button>
  );
}

export default NextButton;
