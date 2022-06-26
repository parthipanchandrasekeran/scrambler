import React from "react";

function Next({ nextClick }) {
  return (
    <button
      onClick={() => {
        nextClick();
      }}
      className="nextbutton-main"
    >
      Next
    </button>
  );
}

export default Next;
