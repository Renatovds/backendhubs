import { Module, CacheModule } from '@nestjs/common';
import { HubsController } from './hubs/hubs.controller';
import { HubsService } from './hubs/hubs.service';
import { HubsCached } from './hubs/hubsCached.service';
import { SchedulerService } from './scheduler/scheduler.service';
import { CheckLateTaskService } from './check-late-task/check-late-task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HubsapisModule } from './hubsapis/hubsapis.module';
import { FiltersModule } from './filters/filters.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hubsdb'),
    HubsapisModule,
    FiltersModule,
    CacheModule.register(),
    ScheduleModule.forRoot(),
  ],
  controllers: [HubsController],
  providers: [HubsService, CheckLateTaskService, HubsCached, SchedulerService],
  exports: [CheckLateTaskService],
})
export class AppModule {}
