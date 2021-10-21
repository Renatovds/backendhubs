import { Body, Controller, Get, Post } from '@nestjs/common';
import { HubsService } from './hubs.service';
import { CheckLateTaskService } from '../check-late-task/check-late-task.service';

@Controller('hubs')
export class HubsController {
  constructor(
    private service: HubsService,
    private checkLateTask: CheckLateTaskService,
  ) {}
  @Get('/')
  async gethubs() {
    const data = this.service.execute();
    const checkedData = this.checkLateTask.execute(data);
    return checkedData;
  }
}
