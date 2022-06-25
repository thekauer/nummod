import { Button } from "@mantine/core";

export type Answer = "A" | "B" | "C" | "D";

interface AnswersProps {
  answer?: Answer;
  onClick: (answer: Answer) => void;
}

export const Answers = ({ answer, onClick }: AnswersProps) => {
  const answerClick = (letter: Answer) => {
    onClick(letter);
  };

  return (
    <>
      {["A", "B", "C", "D"].map((letter) => (
        <Button
          key={letter}
          color={answer === letter ? "teal" : "gray"}
          variant={answer === letter ? "filled" : "outline"}
          onClick={() => answerClick(letter as Answer)}
        >
          {letter}
        </Button>
      ))}
    </>
  );
};
