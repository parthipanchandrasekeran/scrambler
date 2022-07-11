import React from "react";
import { useRef } from "react";
import "./NextButton.scss";

function NextButton({ nextClick, flagchange }) {
  return (
    <button
      autoFocus
      type="submit"
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
