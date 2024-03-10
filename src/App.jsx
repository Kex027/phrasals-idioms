import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import WordsList from "../components/WordsList.jsx";
import CheckAllWords from "../components/CheckAllWords.jsx";
import { Card, Select, Stack } from "@chakra-ui/react";
import Exam from "../components/Exam.jsx";
import { useEffect, useState } from "react";
import idioms from "../src/assets/idioms.js";
import phrasalVerbs from "../src/assets/phrasal_verbs.js";
import phrasal_verbs from "../src/assets/phrasal_verbs.js";

function App() {
  const [data, setData] = useState([]);
  const [selectValue, setSelectValue] = useState("all");

  const handleSettingData = (value) => {
    if (value === "all") setData([...phrasal_verbs, ...idioms]);
    else if (value === "phrasal_verbs") {
      setData(phrasalVerbs);
    } else if (value === "idioms") setData(idioms);
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
