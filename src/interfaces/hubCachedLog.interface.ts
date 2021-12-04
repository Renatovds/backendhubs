import { TaskLog } from './taskLog.interface';

export interface HubCachedLog {
  hubID: string;
  name: string;
  tasks: TaskLog[];
}
