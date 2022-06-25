import { Group, Stack, Title } from "@mantine/core";
import { useEvents } from "../hooks/useEvents";
import { Status } from "./Status";
import { TaskList } from "./TaskList";

export const Left = () => {
  const { currentTaskNumber } = useEvents();
  return (
    <Group position="left">
      <Stack spacing="xs">
        <Title style={{ color: "white" }}>
          {currentTaskNumber ? <>{currentTaskNumber}. feladat</> : "Várakozás"}
        </Title>
        <Status />
        <TaskList />
      </Stack>
    </Group>
  );
};
