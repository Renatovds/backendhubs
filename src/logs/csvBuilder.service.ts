import * as fs from 'fs';
import { json2csvAsync } from 'json-2-csv';
import { Injectable } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CSVDTO } from 'src/interfaces/csvDTO.interface';
import { format } from 'date-fns';

@Injectable()
export class CSVBuilder {
  constructor(private readonly logsService: LogsService) {}

  async execute(csvData: CSVDTO) {
    console.log(csvData);
    const reps = await this.logsService.findDate(csvData.daysback);

    const formated = reps.map((task) => {
      return {
        HUB: task.hub,
        Numero_Tarefa: task.taskNumber,
        Nome_Tarefa: task.taskName,
        Status_de_erro: task.status,
        Ultima_Chamada: task.lastRun,
        Data_erro: format(task.createdAt, 'dd/MM/yyyy HH:mm:ss'),
        Data_Normalizacao: task.normalizationDate
          ? format(task.normalizationDate, 'dd/MM/yyyy HH:mm:ss')
          : 'EM ABERTO',
      };
    });
    json2csvAsync(formated)
      .then((data) => {
        fs.writeFile(`${csvData.username}log.csv`, data, (err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        throw err;
      });
  }
}
