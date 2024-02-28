import "./App.css";
import { Button, Input } from "@chakra-ui/react";
import phrasalVerbs from "../src/assets/data.js";
import { useEffect, useRef, useState } from "react";
import Status from "../components/Status.jsx";

function App() {
  const initialPhrases = phrasalVerbs;
  const [phrases, setPhrases] = useState([]);
  const phrasesLength = phrases.length;
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const inputRef = useRef(null);
  const [status, setStatus] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    shufflePhrases();
  }, []);

  const shufflePhrases = () => {
    const shuffledPhrases = [...initialPhrases].sort(() => Math.random() - 0.5);
    setPhrases(shuffledPhrases);
  };

  const handleInputClick = (e) => {
    if (enterPressed(e)) {
      if (status) nextQuestion();
      else checkInput();
    }
  };

  const enterPressed = (e) => e.key === "Enter";

  const checkInput = () => {
    setStatus(phrases[currentPhrase].english === inputRef?.current?.value);
  };

  const toggleTranslation = () =>
    setShowTranslation((translation) => !translation);

  const nextQuestion = () => {
    if (currentPhrase < phrasesLength)
      setCurrentPhrase((phraseValue) => phraseValue + 1);
    inputRef.current.value = "";
    setStatus(null);
    inputRef.current.focus();
  };

  const reset = () => {
    setCurrentPhrase(0);
    setStatus(null);
    shufflePhrases();
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
}

export default App;
