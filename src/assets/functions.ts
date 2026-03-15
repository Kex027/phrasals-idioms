import type { StudyItem } from "../types/word_list.js";
import React from "react";

const shufflePhrases = (array: StudyItem[]): StudyItem[] =>
  [...array].sort(() => Math.random() - 0.5);

export const enterPressed = (e: React.KeyboardEvent) => e.key === "Enter";

export default shufflePhrases;
