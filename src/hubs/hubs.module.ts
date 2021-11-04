import { Module } from '@nestjs/common';
import { HubsapisModule } from '../hubsapis/hubsapis.module';
import { HubsapisService } from '../hubsapis/hubsapis.service';
import { HubsController } from './hubs.controller';
import { HubsService } from './hubs.service';

@Module({
  imports: [HubsapisModule],
  controllers: [HubsController],
  providers: [HubsService],
  exports: [HubsService],
})
export class HubsModule {}
