import { Controller, Get } from '@nestjs/common';
import { HubsService } from './hubs.service';
import { HubsCached } from './hubsCached.service';
import { CheckLateTaskService } from '../check-late-task/check-late-task.service';

@Controller('hubs')
export class HubsController {
  constructor(
    private hubsService: HubsService,
    private hubsCached: HubsCached,
    private checkLateTask: CheckLateTaskService,
  ) {}
  @Get('/')
  async gethubs() {
    const data = await this.hubsService.execute();
    const checkedData = this.checkLateTask.execute(data);
    const filteredData = this.checkLateTask.filterTasks(checkedData);

    await this.hubsCached.setValue(filteredData);
    const response = await this.hubsCached.getValue('hubs');
    console.log(response);
    return response;
  }
}
