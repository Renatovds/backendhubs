import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Task } from '../interfaces/task.interface';
import * as hubData from './dataHUB.json';

@Injectable()
export class HubsService {
  execute() {
    const data: Task[] = [];
    hubData.forEach((item) =>
      Object.keys(item).forEach((key) => data.push(item[key])),
    );

    return data;
  }
}
