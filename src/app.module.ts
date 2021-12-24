import { Module, CacheModule } from '@nestjs/common';
import { HubsController } from './hubs/hubs.controller';
import { LogsController } from './logs/logs.controller';
import { HubsService } from './hubs/hubs.service';
import { Logger } from './logs/logger.service';
import { LogsService } from './logs/logs.service';
import { LoggerWinston } from './logs/loggerWinston.service';
import { HubsCached } from './hubs/hubsCached.service';
import { SchedulerService } from './scheduler/scheduler.service';
import { CheckLateTaskService } from './check-late-task/check-late-task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HubsapisModule } from './hubsapis/hubsapis.module';
import { FiltersModule } from './filters/filters.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './users/users.module';
import { LogsModule } from './logs/logs.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hubsdb'),
    HubsapisModule,
    FiltersModule,
    CacheModule.register({
      store: redisStore,
      host: '192.168.99.101',
      port: 6379,
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    LogsModule,
  ],
  controllers: [HubsController, LogsController],
  providers: [
    HubsService,
    CheckLateTaskService,
    HubsCached,
    SchedulerService,
    Logger,
    LoggerWinston,
  ],
  exports: [CheckLateTaskService],
})
export class AppModule {}
