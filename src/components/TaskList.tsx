import { Group, List, Text } from "@mantine/core";
import { useEvents } from "../hooks/useEvents";

export const TaskList = () => {
  const { tasks, currentTaskNumber, setCurrentTask } = useEvents();
  return (
    <List listStyleType="none">
      {tasks.map((task) => (
        <List.Item key={task.number}>
          <Text
            style={{
              cursor: task.number !== currentTaskNumber ? "pointer" : "default",
            }}
            weight={task.number === currentTaskNumber ? "bold" : "normal"}
            onClick={() =>
              setCurrentTask(tasks.find((t) => t.number === task.number))
            }
          >
            <Group>
              {task.number}. feladat{" "}
              {task.answer && (
                <Text color={task.certainty === "FIX" ? "green" : "yellow"}>
                  {task.answer}
                </Text>
              )}
            </Group>
          </Text>
        </List.Item>
      ))}
    </List>
  );
};
