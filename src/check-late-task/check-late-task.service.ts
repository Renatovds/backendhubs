import { Injectable } from '@nestjs/common';
import { isAfter } from 'date-fns';
import { Task } from '../interfaces/task.interface';
@Injectable()
export class CheckLateTaskService {
  execute(data: Task[]) {
    data.forEach((item) => {
      const islate = isAfter(
        Date.now(),
        new Date(Number(item.ProximaChamada) * 1000),
      );
      item.Atrasada = islate ? true : false;
    });
    return data;
  }
}
