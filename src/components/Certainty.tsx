import { Button, Group } from "@mantine/core";
import { Certainty } from "../api/api";

interface CertaintyProps {
  certainty?: Certainty;
  onClick: (certainty: Certainty) => void;
}

export const CertaintyContainer = ({ certainty, onClick }: CertaintyProps) => {
  const certaintyClick = (option: Certainty) => {
    onClick(option);
  };

  return (
    <Group position="apart">
      <Button
        color="red"
        variant={certainty === "ERROR" ? "filled" : "outline"}
        onClick={() => certaintyClick("ERROR")}
      >
        Error
      </Button>
      <Button
        color="orange"
        variant={certainty === "IDK" ? "filled" : "outline"}
        onClick={() => certaintyClick("IDK")}
      >
        Nem tudom
      </Button>
      <Button
        color="yellow"
        variant={certainty === "MAYBE" ? "filled" : "outline"}
        onClick={() => certaintyClick("MAYBE")}
      >
        Talán
      </Button>
      <Button
        color="green"
        variant={certainty === "FIX" ? "filled" : "outline"}
        onClick={() => certaintyClick("FIX")}
      >
        Fix
      </Button>
    </Group>
  );
};
