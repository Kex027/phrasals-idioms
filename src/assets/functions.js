const shufflePhrases = (array) => [...array].sort(() => Math.random() - 0.5);

export const enterPressed = (e) => e.key === "Enter";

export default shufflePhrases;
