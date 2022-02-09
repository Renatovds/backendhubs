import { ITaskLogInterface } from './ItaskLoginterface';

export interface HubCachedLog {
  HubName: string;
  tasks: ITaskLogInterface[];
}
