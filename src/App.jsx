import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import WordsList from "../components/WordsList.jsx";
import CheckAllWords from "../components/CheckAllWords.jsx";
import { Card } from "@chakra-ui/react";
import Exam from "../components/Exam.jsx";

function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          position: "absolute",
          top: ".5rem",
          margin: "0 .5rem",
          display: "flex",
          gap: ".5rem",
        }}
      >
        <Card p={1}>
          <Link to="/phrasals-idioms/">Check all words</Link>
        </Card>
        <Card p={1}>
          <Link to="/phrasals-idioms/words-list">Words list</Link>
        </Card>
        <Card p={1}>
          <Link to="/phrasals-idioms/exam">Exam</Link>
        </Card>
      </nav>
      <Routes>
        <Route path="/phrasals-idioms/" element={<CheckAllWords />} />
        <Route
          path="/phrasals-idioms/words-list"
          index
          element={<WordsList />}
        />
        <Route path="/phrasals-idioms/exam" index element={<Exam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
