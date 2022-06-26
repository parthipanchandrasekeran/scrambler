import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Main.scss";
import Textcontainer from "./Textcontainer";

const URL = "https://api.hatchways.io/assessment/sentences/";

export default function Main() {
  const [data, setData] = useState("");
  const [actualText, setActualText] = useState("");

  useEffect(() => {
    const sentenceNumber = 1;
    axios
      .get(URL + sentenceNumber)
      .then((res) => {
        setData(wordSorter(res.data.data.sentence));
        setActualText(res.data.data.sentence);
      })
      .catch((er) => {
        console.error(er);
      });
  }, []);

  const randomiser = (array) => {
    let shuffled = array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return shuffled;
  };

  const arrayPopulater = (max) => {
    let arrayValue = [];
    for (let i = 1; i < max - 1; i++) {
      arrayValue.push(i);
    }

    return arrayValue;
  };

  const wordSorterSingle = (word) => {
    let temp = "";

    const randomArray = randomiser(arrayPopulater(word.length));

    const arrayWord = word.split("");

    arrayWord.forEach((letter, index) => {
      if (index === 0 || index === word.length - 1) {
        temp = temp + letter;
      } else {
        temp = temp + word[randomArray[index - 1]];
      }
    });

    while (word === temp) {
      return wordSorterSingle(word);
    }

    return temp;
  };

  const wordSorter = (text) => {
    const arraySentence = text.split(" ");

    const sentence = arraySentence.map((word) => {
      if (word.length === 1 || word.length === 2) {
        return word;
      } else if (word.length >= 3) {
        return wordSorterSingle(word);
      }
    });

    return sentence.join(" ");
  };

  console.log(actualText);
  return (
    <div className="word-main">
      <div className="word-main__sub">
        <h1 className="word-main__text" id="scrambled-word">
          {data}
        </h1>
        <section className="word-main__text">
          <p className="word-main__guess-text">
            Guess the sentence! Start typing.
          </p>
          <p className="word-main__clue-text">
            The yellow blocks are meant for spaces
          </p>
        </section>

        <h2 className="word-main__score-text">Score:0</h2>
      </div>
      <Textcontainer data={data} actualText={actualText} />
    </div>
  );
}