import React from "react";
import "../styles/Main.scss";
import { useState, useEffect } from "react";

let mainCount = 0;

function Textcontainer({ data, actualText }) {
  const [input, setInput] = useState("");
  const [answerMap, setanswerMap] = useState([]);
  const [splitArrays, setsplitArrays] = useState();

  const splitArray = (answerMap) => {
    let arrayFinal = {};
    let count = 0;

    answerMap.forEach((element) => {
      if (arrayFinal[count] === undefined) {
        arrayFinal[count] = [];
      }
      if (element[0].answer !== " ") {
        arrayFinal[count].push(element[0]);
      } else {
        arrayFinal[count].push(element[0]);

        count = count + 1;
      }
    });
    return arrayFinal;
  };

  //function to map the actual sentence to an object - use it later to compare the text

  const answerObject = (text, count = 0) => {
    return text.split("").map((word) => {
      if (word === " ") {
        count++;

        return [{ id: count - 1, answer: word, value: "" }];
      } else {
        return word.split("").map((letter) => {
          count++;

          return { id: count - 1, answer: letter, value: "" };
        });
      }
    });
  };

  const functionFinalForm = () => {
    const arrayref = () => {
      return actualText.split(" ").map((e) => {
        return e;
      });
    };
    const length = actualText.length - 1;

    const value = arrayref();
    const displayMain = value.map((elements, index) => {
      if (index < value.length) {
        return (
          <div className="text-container__no-match-main">
            {splitArrays[index].map((element) => {
              console.log(element);
              if (element.answer !== " ") {
                return (
                  <div className="text-container__end-section">
                    <input value={element.answer}></input>
                  </div>
                );
              } else {
                return (
                  <input
                    className="text-container__end-section-sub"
                    value={element.answer}
                  ></input>
                );
              }
            })}
          </div>
        );
      } else {
        return (
          <div className="text-container__match-main">
            {splitArrays[index].map((element) => {
              console.log(element);
              if (element.answer !== " ") {
                return (
                  <div>
                    <input value={element.answer}></input>
                  </div>
                );
              } else {
                return (
                  <div className="text-container__matched-section">
                    <input value={element.answer}></input>
                  </div>
                );
              }
            })}
          </div>
        );
      }
    });

    return displayMain;
  };

  useEffect(() => {
    setanswerMap(answerObject(actualText));

    setsplitArrays(splitArray(answerObject(actualText)));
    console.log(answerObject(actualText));
  }, []);

  return (
    <>
      <div className="text-container__main">
        {functionFinalForm(splitArray(answerObject(actualText)))}
      </div>
    </>
  );
}

export default Textcontainer;
