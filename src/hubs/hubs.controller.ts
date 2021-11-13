import { Controller, Get } from '@nestjs/common';
import { SchedulerService } from '../scheduler/scheduler.service';
import { HubsCached } from './hubsCached.service';
import { CheckLateTaskService } from '../check-late-task/check-late-task.service';

@Controller('hubs')
export class HubsController {
  constructor(
    private hubsCached: HubsCached,
    private scheduler: SchedulerService,
  ) {}
  @Get('/')
  async gethubs() {
    await this.scheduler.execute();
    const response = await this.hubsCached.getValue('hubs');
    console.log(response);
    return response;
  }
}
