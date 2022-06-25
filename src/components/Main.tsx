import { Button, Group, Image, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { Certainty, postAnswer, Task } from "../api/api";
import { useEvents } from "../hooks/useEvents";
import { Answer, Answers } from "./Answers";
import { CertaintyContainer } from "./Certainty";

export const Main = () => {
  const { currentTaskNumber, currentTask, setCurrentTask, tasks, setTasks } =
    useEvents();
  const [answer, setAnswer] = useState<Answer>();
  const [certainty, setCertainty] = useState<Certainty>();

  const answerClick = (letter: Answer) =>
    letter === answer ? setAnswer(undefined) : setAnswer(letter);

  const certaintyClick = (option: Certainty) =>
    option === certainty ? setCertainty(undefined) : setCertainty(option);

  const sendClick = () =>
    currentTaskNumber &&
    postAnswer(currentTaskNumber, answer, certainty).then(() => {
      setTasks((prev) =>
        (
          [
            ...prev.filter((t) => t.number !== currentTaskNumber),
            { ...currentTask, answer, certainty },
          ] as Task[]
        ).sort((a, b) => a.number - b.number)
      );
      const nextTask = tasks.find((t) => t.number === currentTaskNumber + 1);
      if (nextTask) {
        setCurrentTask(nextTask);
      }
    });

  useEffect(() => {
    setAnswer(currentTask?.answer as any);
    setCertainty(currentTask?.certainty);
  }, [currentTask]);

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
