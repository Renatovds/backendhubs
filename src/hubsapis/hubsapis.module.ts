import { Module } from '@nestjs/common';
import { HubsapisService } from './hubsapis.service';
import { HubsapisController } from './hubsapis.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HubSchema, Hub } from './entities/hubapi.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Hub.name, schema: HubSchema }])],
  controllers: [HubsapisController],
  providers: [HubsapisService],
  exports: [HubsapisService],
})
export class HubsapisModule {}
