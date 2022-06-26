import React from "react";
import "../styles/Main.scss";
import { useState, useEffect } from "react";

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

        return [{ id: count - 1, answer: word, value: "", flag: false }];
      } else {
        return word.split("").map((letter) => {
          count++;

          return { id: count - 1, answer: letter, value: "", flag: false };
        });
      }
    });
  };

  //value updater function

  const updateValue = (id, text) => {
    const valueused = splitArrays;
    console.log(actualText);

    const textLength = actualText.split(" ");

    const finalData = textLength.map((element, index) => {
      console.log(valueused[index]);
      return valueused[index].map((element) => {
        if (element.id === id) {
          const updatedFlag = element.answer === text ? true : false;
          console.log(updatedFlag);

          return {
            id: id,
            answer: element.answer,
            value: text,
            flag: updatedFlag,
          };
        } else {
          return element;
        }
      });
    });

    // setanswerMap(finalData);
    console.log(finalData);
    setsplitArrays(finalData);
  };

  //value fetcher

  const valueFetcher = (id) => {
    let stringValue = "";
    const selected = answerMap.map((element) => {
      if (element[0].id === id) {
        stringValue = element[0].value;
      }
    });

    return stringValue;
  };

  //flag indicator fetcher

  const flagFetcher = (id) => {
    const selectedFlag = answerMap.filter((element) => {
      console.log(element[0].flag);
      return element[0].id === id;
    });

    return selectedFlag[0].flag;
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
              if (element.answer !== " ") {
                return (
                  <div className="text-container__end-section">
                    <input
                      value={valueFetcher(element.id)}
                      style={{
                        backgroundColor: element.flag && "#4caf50",
                      }}
                      onChange={(e) => {
                        updateValue(element.id, e.target.value);
                      }}
                    ></input>
                  </div>
                );
              } else {
                return (
                  <input
                    className="text-container__end-section-sub"
                    value={valueFetcher(element.id)}
                    style={{
                      backgroundColor: element.flag && "#4caf50",
                    }}
                    onChange={(e) => {
                      updateValue(element.id, e.target.value);
                    }}
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
                    <input
                      style={{
                        backgroundColor: element.flag && "#4caf50",
                      }}
                      value={valueFetcher(element.id)}
                      onChange={(e) => {
                        updateValue(element.id, e.target.value);
                      }}
                    ></input>
                  </div>
                );
              } else {
                return (
                  <div className="text-container__matched-section">
                    <input
                      style={{
                        backgroundColor: element.flag && "#4caf50",
                      }}
                      value={valueFetcher(element.id)}
                      onChange={(e) => {
                        updateValue(element.id, e.target.value);
                      }}
                    ></input>
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

    console.log(actualText);
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
