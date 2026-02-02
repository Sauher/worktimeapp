import { User } from "./user";

export interface WorkTime {
  id: string;
  userId: string;
  user? : User | null;
  date: Date;
  start: string;
  end: string;
}
