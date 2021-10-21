import { Module } from '@nestjs/common';
import { HubsController } from './hubs/hubs.controller';
import { HubsService } from './hubs/hubs.service';
import { CheckLateTaskService } from './check-late-task/check-late-task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HubsapisModule } from './hubsapis/hubsapis.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hubsdb'),
    HubsapisModule,
  ],
  controllers: [HubsController],
  providers: [HubsService, CheckLateTaskService],
})
export class AppModule {}
