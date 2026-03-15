import React, { useEffect, useRef, useState } from "react";
import "../src/App.css";
import shufflePhrases, { enterPressed } from "../src/assets/functions.js";
import Status from "./Status.js";
import { Button, Input } from "@chakra-ui/react";
import type { StudyItem } from "../src/types/word_list.js";

const CheckAllWords = ({ data }: { data: StudyItem[] }) => {
  const initialPhrases = data;
  const [phrases, setPhrases] = useState<StudyItem[]>([]);
  const phrasesLength = phrases.length;
  const [currentPhrase, setCurrentPhrase] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<boolean | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    setPhrases(shufflePhrases(initialPhrases));
  }, [data]);

  const handleInputClick = (e: React.KeyboardEvent) => {
    if (enterPressed(e)) {
      if (status) nextQuestion();
      else checkInput();
    }
  };

  const checkInput = () => {
    setStatus(
      phrases[currentPhrase]?.foreign ===
        inputRef?.current?.value?.toLowerCase().trim(),
    );
  };

  const toggleTranslation = () => {
    setShowTranslation((translation) => !translation);
    inputRef?.current?.focus();
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const nextQuestion = () => {
    if (currentPhrase < phrasesLength)
      setCurrentPhrase((phraseValue) => phraseValue + 1);
    clearInput();
    setStatus(null);
    setShowTranslation(false);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const reset = () => {
    setCurrentPhrase(0);
    setStatus(null);
    inputRef?.current?.focus();
    setPhrases(shufflePhrases(initialPhrases));
  };

  return (
    <div className={"container"}>
      <div className={"content"}>
        <span>
          {currentPhrase} / {phrasesLength}
        </span>
        {currentPhrase !== phrasesLength ? (
          <>
            <span>Translate: {phrases[currentPhrase]?.polish}</span>
            <Status state={status} />
            <Input ref={inputRef} onKeyDown={handleInputClick} />
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
                ` Translation: ${phrases[currentPhrase]?.foreign}`}
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

export default CheckAllWords;
