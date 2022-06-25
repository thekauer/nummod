import { createContext, useContext, useEffect, useState } from "react";
import { getTasks, Task } from "../api/api";

interface EventsContext {
  currentTask: Task | undefined;
  setCurrentTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const EventContext = createContext<EventsContext>(null as any);

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTask, setCurrentTask] = useState<Task>();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const subscribe = () => {
      const source = new EventSource(
        `${process.env.REACT_APP_API_URL}/events/facilitator`
      );

      source.onmessage = ({ data }) => {
        const fetchedTask = JSON.parse(data);

        setTasks((prev) =>
          prev.every((t) => t.number < fetchedTask.number)
            ? [...prev, fetchedTask]
            : prev
        );

        setCurrentTask((prev) => (!prev ? fetchedTask : undefined));
      };
    };
    subscribe();
    getTasks().then((fetchedTasks) => {
      setCurrentTask(fetchedTasks.find((t) => t.answer === null));
      setTasks((prev) => (prev.length === 0 ? fetchedTasks : prev));
    });
  }, []);

  const value = {
    currentTask,
    setCurrentTask,
    tasks,
    setTasks,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);

  const currentTaskNumber = context.currentTask?.number;
  return { ...context, currentTaskNumber };
};
