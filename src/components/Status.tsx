import { Badge, Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { heartbeat } from "../api/api";

export const Status = () => {
  const [status, setStatus] = useState<"error" | "pending" | "ok">("pending");
  const updateStatus = () => {
    heartbeat()
      .then(() => setStatus("ok"))
      .catch(() => setStatus("error"));
  };

  useEffect(() => {
    let interval = setInterval(updateStatus, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const color =
    status === "error" ? "red" : status === "ok" ? "green" : "yellow";
  const text =
    status === "error" ? "error" : status === "ok" ? "OK" : "pending";

  return (
    <Group>
      <Text color="white" size="sm">
        Status:
      </Text>
      <Badge color={color} size="xs">
        {text}
      </Badge>
    </Group>
  );
};
