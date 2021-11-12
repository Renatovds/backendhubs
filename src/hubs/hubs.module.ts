import { Module } from '@nestjs/common';
import { HubsapisModule } from '../hubsapis/hubsapis.module';
import { HubsController } from './hubs.controller';
import { HubsService } from './hubs.service';
import { HubsCached } from './hubsCached.service';

@Module({
  imports: [HubsapisModule],
  controllers: [HubsController],
  providers: [HubsService, HubsCached],
  exports: [HubsService, HubsCached],
})
export class HubsModule {}
