import { Injectable } from '@nestjs/common';
import { HubsService } from 'src/hubs/hubs.service';
import { HubsCached } from 'src/hubs/hubsCached.service';
import { CheckLateTaskService } from 'src/check-late-task/check-late-task.service';
import { Cron } from '@nestjs/schedule';
import { Logger } from '../logs/logger.service';
import { LoggerWinston } from '../logs/loggerWinston.service';

@Injectable()
export class SchedulerService {
  constructor(
    private hubsService: HubsService,
    private hubsCached: HubsCached,
    private checkLateTask: CheckLateTaskService,
    private logger: Logger,
    private loggerWinston: LoggerWinston,
  ) {}
  @Cron('45 * * * * *')
  async execute() {
    const data = await this.hubsService.execute();
    const checkedData = this.checkLateTask.execute(data);
    const filteredData = this.checkLateTask.filterTasks(checkedData);
    // this.logger.wrFile(filteredData);
    this.loggerWinston.wrFile(filteredData);

    await this.hubsCached.setValue(filteredData);
  }
}
