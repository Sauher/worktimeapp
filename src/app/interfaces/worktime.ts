import { User } from "./user";

export interface WorkTime {
  id?: string;
  userId: string;
  user? : User | null;
  date: string | Date;
  start: string;
  end: string;
}
