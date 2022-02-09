import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CSVBuilder } from './csvBuilder.service';
import { LogsController } from './logs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LogSchema, Log } from './entities/log.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  controllers: [LogsController],
  providers: [LogsService, CSVBuilder],
  exports: [LogsService, CSVBuilder],
})
export class LogsModule {}
