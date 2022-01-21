import { Task } from './task.interface';

export interface DataHub {
  id_HUB: string;
  name: string;
  error: boolean;
  url_hub: string;
  url_icon: string;
  tasks: Task[];
}
