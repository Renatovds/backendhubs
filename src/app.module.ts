import { ConfigModule } from '@nestjs/config';
import { Module, CacheModule } from '@nestjs/common';
import { HubsController } from './hubs/hubs.controller';
import { LogsController } from './logs/logs.controller';
import { HubsService } from './hubs/hubs.service';
import { Logger } from './logs/logger.service';
import { HubsCached } from './hubs/hubsCached.service';
import { SchedulerService } from './scheduler/scheduler.service';
import { CheckLateTaskService } from './check-late-task/check-late-task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HubsapisModule } from './hubsapis/hubsapis.module';
import { FiltersModule } from './filters/filters.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './users/users.module';
import { LogsModule } from './logs/logs.module';
import { AuthModule } from './auth/auth.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(`${process.env.MONGODB_PATH}`),
    HubsapisModule,
    FiltersModule,
    CacheModule.register({
      store: redisStore,
      host: `${process.env.REDIS_HOST}`,
      port: process.env.REDIS_PORT,
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    LogsModule,
    AuthModule,
  ],
  controllers: [HubsController, LogsController],
  providers: [
    HubsService,
    CheckLateTaskService,
    HubsCached,
    SchedulerService,
    Logger,
  ],
  exports: [CheckLateTaskService],
})
export class AppModule {}
