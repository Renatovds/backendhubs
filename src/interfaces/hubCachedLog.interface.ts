import { ITaskLogInterface } from './ITaskLogInterface';

export interface HubCachedLog {
    HubName: string;
    tasks: ITaskLogInterface[];
}
