import { Task } from './task.interface';

export interface DataHub {
  id_HUB: string;
  name: string;
  error: boolean;
  url_hub: string;
  tasks: Task[];
}
