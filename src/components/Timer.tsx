import { Progress, RingProgress, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useEvents } from "../hooks/useEvents";

//44 minutes
const MAX_TIME = 44 * 60 * 1000;
const MAX_TASKS = 15;

export const Timer = () => {
  const [lapStartedAt, setLapStartedAt] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const { currentTaskNumber, tasks } = useEvents();
  const firstTaskCreatedAt = tasks.find((t) => t.number === 1)?.createdAt;
  const timerStartedAt = firstTaskCreatedAt
    ? new Date(firstTaskCreatedAt).getTime()
    : 0;

  useEffect(() => {
    if (!currentTaskNumber) return;
    setLapStartedAt(Date.now());
  }, [currentTaskNumber]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timerStartedAt ? Date.now() - timerStartedAt : 0);
    }, 20);
    return () => clearInterval(interval);
  }, [timerStartedAt]);

  const timeRemaining = MAX_TIME - time;
  const currentTask = 1;
  const timePercent = (timeRemaining / MAX_TIME) * 100;
  const tasksRemaining = MAX_TASKS - currentTask + 1;
  const lapTime = timeRemaining / tasksRemaining;
  const lapTimeRemaining = lapTime - (Date.now() - (lapStartedAt || 0));
  const lapTimeRemainingPercent = Math.floor(
    (lapTimeRemaining / lapTime) * 100
  );
  const isLapOver = lapTimeRemaining <= 0;
  const lapTimeShown = !isLapOver
    ? lapTimeRemainingPercent
    : Math.min(Math.abs(lapTimeRemainingPercent), 100);

  const endDate = new Date(timerStartedAt + MAX_TIME);
  const endsAt = endDate.toLocaleTimeString();
  const isOver = endDate < new Date();

  const toTime = (timeArg: number) => {
    const time = timeArg / 1000;
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const toRingColor = (timePercent: number) => {
    if (timePercent > 75) return "green";
    if (timePercent > 50) return "yellow";
    if (timePercent > 25) return "orange";
    return "red";
  };

  return (
    <Stack align="center">
      <Title style={{ color: "white", textAlign: "center" }}>Idő</Title>
      {!isOver && (
        <>
          <RingProgress
            roundCaps
            sections={[{ value: timePercent, color: toRingColor(timePercent) }]}
            label={
              <Text color="white" align="center">
                {toTime(timeRemaining)}
              </Text>
            }
          />
          <Text color="white">{toTime(lapTimeRemaining)}</Text>
          <div style={{ width: "80%" }}>
            <Progress
              value={lapTimeShown}
              striped
              animate
              color={!isLapOver ? "blue" : "red"}
            />
          </div>

          <Text color="red">
            <>Vége: {endsAt}</>
          </Text>
        </>
      )}
    </Stack>
  );
};
