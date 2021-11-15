import { Injectable } from '@nestjs/common';
import { isAfter } from 'date-fns';
import { Task } from '../interfaces/task.interface';
import { DataHub } from '../interfaces/dataHub.interface';
import { HubsService } from 'src/hubs/hubs.service';
import { HubsCached } from 'src/hubs/hubsCached.service';
import { CheckLateTaskService } from 'src/check-late-task/check-late-task.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  constructor(
    private hubsService: HubsService,
    private hubsCached: HubsCached,
    private checkLateTask: CheckLateTaskService,
  ) {}
  @Cron('45 * * * * *')
  async execute() {
    const data = await this.hubsService.execute();
    const checkedData = this.checkLateTask.execute(data);
    const filteredData = this.checkLateTask.filterTasks(checkedData);
    await this.hubsCached.setValue(filteredData);
    console.log('rodei');
  }
}
