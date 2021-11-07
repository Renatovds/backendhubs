import { Task } from './task.interface';

export interface DataHub {
  id_HUB: string;
  name: string;
  tasks: Task[];
}
