import { Body, Controller, Get, Post } from '@nestjs/common';
import { HubsService } from './hubs.service';
import { CheckLateTaskService } from '../check-late-task/check-late-task.service';

@Controller('hubs')
export class HubsController {
  constructor(
    private hubsService: HubsService,
    private checkLateTask: CheckLateTaskService,
  ) {}
  @Get('/')
  async gethubs() {
    const data = await this.hubsService.execute();
    const checkedData = this.checkLateTask.execute(data);
    const filteredData = this.checkLateTask.filterTasks(checkedData);
    return filteredData;
  }
}
