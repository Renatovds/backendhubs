import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';
import { Filter, FilterDocument } from './entities/filter.entity';

@Injectable()
export class FiltersService {
  constructor(
    @InjectModel(Filter.name) private filterModel: Model<FilterDocument>,
  ) {}
  create(createFilterDto: CreateFilterDto) {
    const filter = new this.filterModel(createFilterDto);
    return filter.save();
  }

  async findAll() {
    return await this.filterModel.find();
  }

  async findOne(id: string) {
    return await this.filterModel.findById(id);
  }

  async update(id: string, updateFilterDto: UpdateFilterDto) {
    return await this.filterModel.findByIdAndUpdate(
      { _id: id },
      updateFilterDto,
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.filterModel.deleteOne({ _id: id }).exec();
  }
}
