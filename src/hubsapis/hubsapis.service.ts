import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHubsapiDto } from './dto/create-hubsapi.dto';
import { UpdateHubsapiDto } from './dto/update-hubsapi.dto';
import { Hub, HubDocument } from './entities/hubapi.schema';

@Injectable()
export class HubsapisService {
  constructor(@InjectModel(Hub.name) private hubModel: Model<HubDocument>) {}
  create(createHubsapiDto: CreateHubsapiDto) {
    const hub = new this.hubModel(createHubsapiDto);
    return hub.save();
  }

  async findAll() {
    return await this.hubModel.find();
  }

  async findOne(id: string) {
    return await this.hubModel.findById(id);
  }

  async update(id: string, updateHubsapiDto: UpdateHubsapiDto) {
    console.log(updateHubsapiDto);
    return await this.hubModel.findByIdAndUpdate(
      { _id: id },
      updateHubsapiDto,
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.hubModel.deleteOne({ _id: id }).exec();
  }
}
