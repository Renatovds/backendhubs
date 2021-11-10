import { Injectable } from '@nestjs/common';
import { isAfter } from 'date-fns';
import { Task } from '../interfaces/task.interface';
import { DataHub } from '../interfaces/dataHub.interface';
@Injectable()
export class CheckLateTaskService {
  execute(data: DataHub[]) {
    const delayMilliseconds = 5 * 60 * 1000;
    data.forEach((hub) => {
      hub.tasks.forEach((item) => {
        const islate = isAfter(
          Date.now(),
          new Date(Number(item.ProximaChamada) * 1000 + delayMilliseconds),
        );
        item.Atrasada = islate ? true : false;
        console.log(
          'Proxima Chamada:',
          new Date(
            Number(item.ProximaChamada) * 1000 + delayMilliseconds,
          ).toLocaleString('pt-BR'),
          hub.name,
          item.TarefaId,
          'Data Atual:',
          new Date(Date.now()).toLocaleString('pt-BR'),
        );
      });
    });
    return data;
  }

  filterTasks(data: DataHub[]) {
    data.forEach((hub) => {
      hub.tasks = hub.tasks.filter(
        (task) =>
          task.Atrasada === true && task.Status !== '2' && task.Status !== '',
      );
    });
    return data;
  }
}
