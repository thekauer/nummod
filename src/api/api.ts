import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export type Certainty = "FIX" | "MAYBE" | "IDK" | "ERROR";

export interface Task {
  number: number;
  image: string;
  answer?: string;
  certainty?: Certainty;
  createdAt: Date;
}

export default api;

export const heartbeat = () => api.get("/heartbeat").then((res) => res.data);

export const getTask = (number: number) =>
  api.get<Task>(`/task/${number}`).then((res) => res.data);

export const getTasks = () => api.get<Task[]>("/tasks").then((res) => res.data);

export const postAnswer = (
  number: number,
  answer?: string,
  certainty?: Certainty
) => api.post<Task>(`/tasks/answer`, { number, answer, certainty });
