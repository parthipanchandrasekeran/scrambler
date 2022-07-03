import { useState, useEffect, useRef, useCallback } from "react";

export default function KeyInput({ actualText, splitArrays, updateValue }) {
  const [info, setInfo] = useState([]);

  const idRef = useRef([]);
  idRef.current = [];

  useEffect(() => {
    console.log(actualText);
    idRef.current[0] && idRef.current[0].focus();

    return () => {
      setInfo([]);
    };
  }, [actualText]);

  const addRef = (e) => {
    if (e && !idRef.current.includes(e)) {
      idRef.current.push(e);
    }
  };

  const functionFinalForm = (dataUpdated, textUpdate) => {
    console.log(dataUpdated);
    if (typeof dataUpdated === "undefined") {
      return <h1>Loading...</h1>;
    } else {
      const length = textUpdate.length - 1;

      const displayMain = textUpdate.split(" ").map((elements, index) => {
        if (index < textUpdate.split(" ").length) {
          return (
            <div
              key={index + elements}
              className="text-container__no-match-main"
            >
              {dataUpdated &&
                dataUpdated[index].map((element, index) => {
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
                            idRef.current[
                              Number(e.currentTarget.name) + 1
                            ].focus();
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
                          idRef.current[
                            Number(e.currentTarget.name) + 1
                          ].focus();
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
              {dataUpdated[index].map((element, index) => {
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
                          idRef.current[
                            Number(e.currentTarget.name) + 1
                          ].focus();
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
                          idRef.current[
                            Number(e.currentTarget.name) + 1
                          ].focus();
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

  return <> {actualText && functionFinalForm(splitArrays, actualText)}</>;
}
