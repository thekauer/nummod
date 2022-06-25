import { Button, Group, Image, Stack } from "@mantine/core";
import { useState } from "react";
import { Certainty, postAnswer } from "../api/api";
import { useEvents } from "../hooks/useEvents";
import { Answer, Answers } from "./Answers";
import { CertaintyContainer } from "./Certainty";

export const Main = () => {
  const { currentTaskNumber, currentTask } = useEvents();
  const [answer, setAnswer] = useState<Answer>();
  const [certainty, setCertainty] = useState<Certainty>();

  const answerClick = (letter: Answer) =>
    letter === answer ? setAnswer(undefined) : setAnswer(letter);

  const certaintyClick = (option: Certainty) =>
    option === certainty ? setCertainty(undefined) : setCertainty(option);

  const sendClick = () =>
    currentTaskNumber && postAnswer(currentTaskNumber, answer, certainty);

  const canSend = !!currentTaskNumber && (!!answer || !!certainty);
  return (
    <Group position="center">
      <Stack spacing="xs" style={{ maxWidth: "500px" }}>
        <div>
          <Image
            src={currentTask?.image}
            alt={`${currentTaskNumber}. feladat`}
            radius="md"
            height={375}
            withPlaceholder={!currentTask}
          />
        </div>
        <Answers answer={answer} onClick={answerClick} />
        <CertaintyContainer certainty={certainty} onClick={certaintyClick} />
        <Button onClick={sendClick} disabled={!canSend}>
          Küldés
        </Button>
      </Stack>
    </Group>
  );
};
