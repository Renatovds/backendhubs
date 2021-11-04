import { Module } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FiltersController } from './filters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Filter, FilterSchema } from './entities/filter.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Filter.name, schema: FilterSchema }]),
  ],
  controllers: [FiltersController],
  providers: [FiltersService],
})
export class FiltersModule {}
