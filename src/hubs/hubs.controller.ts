import { Controller, Get } from '@nestjs/common';
// import { SchedulerService } from '../scheduler/scheduler.service';
import { HubsCached } from './hubsCached.service';
// import { CheckLateTaskService } from '../check-late-task/check-late-task.service';
import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
@Controller('hubs')
export class HubsController {
  constructor(
    private hubsCached: HubsCached,
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // private scheduler: SchedulerService,
  ) {}
  @Get('/')
  async gethubs() {
    const response = await this.cacheManager.get('hubs');
    console.log(response);
    return response;
  }
}
