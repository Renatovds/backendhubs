import { Module, CacheModule } from '@nestjs/common';
import { HubsController } from './hubs/hubs.controller';
import { HubsService } from './hubs/hubs.service';
import { HubsCached } from './hubs/hubsCached.service';
import { CheckLateTaskService } from './check-late-task/check-late-task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HubsapisModule } from './hubsapis/hubsapis.module';
import { FiltersModule } from './filters/filters.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hubsdb'),
    HubsapisModule,
    FiltersModule,
    CacheModule.register(),
  ],
  controllers: [HubsController],
  providers: [HubsService, CheckLateTaskService, HubsCached],
  exports: [CheckLateTaskService],
})
export class AppModule {}
