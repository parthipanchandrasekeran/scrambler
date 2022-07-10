import { useState, useEffect, useRef, useCallback } from "react";

export default function KeyInput({
  actualText,
  splitArrays,
  updateValue,
  fetchvalue,
}) {
  const idRef = useRef([]);
  idRef.current = [];

  const addRef = (e) => {
    if (e && !idRef.current.includes(e)) {
      idRef.current.push(e);
    }
  };

  const moveSelection = (id, text) => {
    if (text !== "") {
      if (id !== idRef.current.length - 1) {
        idRef.current[id + 1].focus();
      }
    }
  };

  const functionFinalForm = () => {
    const displayMain = actualText.split(" ").map((elements, index) => {
      return (
        <div key={index + actualText} className="text-container__no-match-main">
          {splitArrays &&
            splitArrays[index].map((element, index) => {
              if (element.answer !== " ") {
                return (
                  <div
                    key={index + element}
                    className="text-container__end-section"
                  >
                    <input
                      ref={addRef}
                      autoFocus={element.id == 0}
                      name={element.id}
                      value={fetchvalue(element.id)}
                      style={{
                        backgroundColor: element.flag && "#4caf50",
                      }}
                      onChange={(e) => {
                        updateValue(element.id, e.target.value);

                        moveSelection(Number(e.target.name), e.target.value);
                      }}
                    ></input>
                  </div>
                );
              } else {
                return (
                  <input
                    ref={addRef}
                    key={index + element}
                    name={element.id}
                    className="text-container__end-section-sub"
                    value={fetchvalue(element.id)}
                    style={{
                      backgroundColor: element.flag && "#4caf50",
                    }}
                    onChange={(e) => {
                      updateValue(element.id, e.target.value);

                      moveSelection(Number(e.target.name), e.target.value);
                    }}
                  ></input>
                );
              }
            })}
        </div>
      );
    });

    return displayMain;
  };

  return <> {splitArrays && functionFinalForm()}</>;
}
