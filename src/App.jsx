import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import WordsList from "../components/WordsList.jsx";
import CheckAllWords from "../components/CheckAllWords.jsx";
import { Card, Select, Stack } from "@chakra-ui/react";
import Exam from "../components/Exam.jsx";
import { useEffect, useState } from "react";
import idioms from "../src/assets/idioms.js";
import phrasal_verbs from "../src/assets/phrasal_verbs.js";
import school_book from "../src/assets/school_book.js";
import pg_unit_1 from "../src/assets/pg_unit_1.js";
import pg_technical_english from "../src/assets/pg_technical_english.js";

function App() {
  const [data, setData] = useState([]);
  const [selectValue, setSelectValue] = useState("all");
  const allWords = [
    ...phrasal_verbs,
    ...idioms,
    ...school_book,
    ...pg_unit_1,
    ...pg_technical_english,
  ];

  const handleSettingData = (value) => {
    if (value === "all") setData(allWords);
    else if (value === "phrasal_verbs") setData(phrasal_verbs);
    else if (value === "idioms") setData(idioms);
    else if (value === "school_book") setData(school_book);
    else if (value === "pg_unit_1") setData(pg_unit_1);
    else if (value === "pg_technical_english") setData(pg_technical_english);
    else setData([]);
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
    handleSettingData(e.target.value);
  };

  useEffect(() => {
    handleSettingData(selectValue);
  }, [selectValue]);

  return (
    <BrowserRouter>
      <nav className="navigation">
        <Stack direction="row">
          <Card p={1}>
            <Link to="/phrasals-idioms/">Check all words</Link>
          </Card>
          <Card p={1}>
            <Link to="/phrasals-idioms/words-list">Words list</Link>
          </Card>
          <Card p={1}>
            <Link to="/phrasals-idioms/exam">Exam</Link>
          </Card>
        </Stack>
        <Stack spacing={3}>
          <Select size="sm" onChange={handleSelectChange}>
            <option value="all">All</option>
            <option value="phrasal_verbs">Phrasal verbs</option>
            <option value="idioms">Idioms</option>
            <option value="school_book">School book</option>
            <option value="pg_unit_1">PG unit 1</option>
            <option value="pg_technical_english">PG technical english</option>
          </Select>
        </Stack>
      </nav>
      <Routes>
        <Route
          path="/phrasals-idioms/"
          element={<CheckAllWords data={data} />}
        />
        <Route
          path="/phrasals-idioms/words-list"
          index
          element={<WordsList data={data} />}
        />
        <Route
          path="/phrasals-idioms/exam"
          index
          element={<Exam data={data} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
