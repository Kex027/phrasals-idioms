import React, { useEffect, useRef, useState } from "react";
import Status from "./Status.jsx";
import { Button, Input } from "@chakra-ui/react";
import shufflePhrases from "../src/assets/functions.js";

const Form = ({ data }) => {
  const initialPhrases = data;
  const [phrases, setPhrases] = useState([]);
  const phrasesLength = phrases.length;
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const inputRef = useRef(null);
  const [status, setStatus] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    setPhrases(shufflePhrases(initialPhrases));
  }, []);

  const handleInputClick = (e) => {
    if (enterPressed(e)) {
      if (status) nextQuestion();
      else checkInput();
    }
  };

  const enterPressed = (e) => e.key === "Enter";

  const checkInput = () => {
    setStatus(
      phrases[currentPhrase].english ===
        inputRef?.current?.value?.toLowerCase().trim(),
    );
  };

  const toggleTranslation = () => {
    setShowTranslation((translation) => !translation);
    inputRef?.current?.focus();
  };

  const nextQuestion = () => {
    if (currentPhrase < phrasesLength)
      setCurrentPhrase((phraseValue) => phraseValue + 1);
    inputRef.current.value = "";
    setStatus(null);
    setShowTranslation(false);
    inputRef.current.focus();
  };

  const reset = () => {
    setCurrentPhrase(0);
    setStatus(null);
    inputRef?.current?.focus();
  };

  return (
    <div className={"container"}>
      <div className={"content"}>
        <span>
          {currentPhrase} / {phrasesLength}
        </span>
        {currentPhrase !== phrasesLength ? (
          <>
            <span>Translate: {phrases[currentPhrase].polish}</span>
            <Status state={status} />
            <Input text={"ess"} ref={inputRef} onKeyDown={handleInputClick} />
            {status ? (
              <Button color="teal" variant="outline" onClick={nextQuestion}>
                Next question
              </Button>
            ) : (
              <Button color="teal" variant="outline" onClick={checkInput}>
                Check
              </Button>
            )}
            <Button
              color="orange"
              variant="outline"
              onClick={toggleTranslation}
            >
              Show translation
            </Button>
            <span>
              {showTranslation &&
                ` Translation: ${phrases[currentPhrase].english}`}
            </span>
          </>
        ) : (
          <>
            <span>That's all</span>
            <Button onClick={reset}>Reset</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Form;
