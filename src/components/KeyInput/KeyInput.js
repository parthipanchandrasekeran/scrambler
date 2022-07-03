import { useState, useEffect, useRef, useCallback } from "react";

export default function KeyInput({ actualText, flagFinal }) {
  const [info, setInfo] = useState([]);
  const [splitArrays, setsplitArrays] = useState();
  const idRef = useRef([]);
  idRef.current = [];

  useEffect(() => {
    setsplitArrays(() => splitArray(answerObject(actualText)));
    idRef.current[0] && idRef.current[0].focus();

    return () => {
      setInfo([]);

      setsplitArrays();
    };
  }, [actualText]);

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

  const answerObject = useCallback(
    (text) => {
      let count = 0;
      console.log(text);

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
    },
    [actualText]
  );

  //value updater function

  const updateValue = (id, text) => {
    const stringvalue = id + 1;
    const textLength = actualText.split(" ");

    const finalData = textLength.map((element, index) => {
      return splitArrays[index].map((element) => {
        if (element.id === id) {
          const updatedFlag = element.answer === text ? true : false;

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

    setsplitArrays((e) => finalData);

    if (text !== "") {
      if (id !== idRef.current.length - 1) {
        idRef.current[id + 1].focus();
      }
    }

    if (allCorrectCheck(finalData)) {
      flagFinal();
    }
  };
  //flag indicator fetcher

  const allCorrectCheck = (splitArrays) => {
    const valueused = splitArrays;
    const textLength = actualText.split(" ");

    const finalData = textLength.map((element, index) => {
      return valueused[index].filter((element) => {
        return element.flag === false;
      });
    });

    const flag = finalData.every((data) => {
      return data.length === 0;
    });

    return flag;
  };

  const addRef = (e) => {
    if (e && !idRef.current.includes(e)) {
      idRef.current.push(e);
    }
  };

  const functionFinalForm = () => {
    if (!splitArrays) {
      return <h1>Loading...</h1>;
    } else {
      const length = actualText.length - 1;

      const displayMain = actualText.split(" ").map((elements, index) => {
        if (index < actualText.split(" ").length) {
          return (
            <div
              key={index + elements}
              className="text-container__no-match-main"
            >
              {splitArrays &&
                splitArrays[index].map((element, index) => {
                  if (element.answer !== " ") {
                    return (
                      <div
                        key={index + element}
                        className="text-container__end-section"
                      >
                        <input
                          name={element.id}
                          value={info[element.id] ? info[element.id] : ""}
                          style={{
                            backgroundColor: element.flag && "#4caf50",
                          }}
                          onChange={(e) => {
                            updateValue(element.id, e.target.value);
                            setInfo({
                              ...info,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          ref={addRef}
                        ></input>
                      </div>
                    );
                  } else {
                    return (
                      <input
                        key={index + element}
                        name={element.id}
                        className="text-container__end-section-sub"
                        value={info[element.id] ? info[element.id] : ""}
                        style={{
                          backgroundColor: element.flag && "#4caf50",
                        }}
                        onChange={(e) => {
                          updateValue(element.id, e.target.value);
                          setInfo({
                            ...info,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        ref={addRef}
                      ></input>
                    );
                  }
                })}
            </div>
          );
        } else {
          return (
            <div key={index + elements} className="text-container__match-main">
              {splitArrays[index].map((element, index) => {
                if (element.answer !== " ") {
                  return (
                    <div key={index + element}>
                      <input
                        name={element.id}
                        style={{
                          backgroundColor: element.flag && "#4caf50",
                        }}
                        value={
                          //valueFetcher(element.id)

                          info[element.id] ? info[element.id] : ""
                        }
                        onChange={(e) => {
                          updateValue(element.id, e.target.value);
                          setInfo({
                            ...info,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        ref={addRef}
                      ></input>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index + element}
                      className="text-container__matched-section"
                    >
                      <input
                        name={element.id}
                        style={{
                          backgroundColor: element.flag && "#4caf50",
                        }}
                        value={info[element.id] ? info[element.id] : ""}
                        onChange={(e) => {
                          updateValue(element.id, e.target.value);
                          setInfo({
                            ...info,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        ref={addRef}
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
    }
  };

  return <> {splitArrays && functionFinalForm()}</>;
}
