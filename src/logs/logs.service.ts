import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogDocument, Log } from './entities/log.entity';
import { startOfDay, endOfDay, subDays } from 'date-fns';

@Injectable()
export class LogsService {
    constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

    async create(createLogDto: CreateLogDto) {
        console.log(createLogDto);
        const log = await new this.logModel(createLogDto);
        return log.save();
    }

    async findAll() {
        return await this.logModel.find();
    }

    async findOne(id: string) {
        return await this.logModel.findById({ _id: id });
    }

    async findDate(daysBack: number) {
        return await this.logModel.find({
            createdAt: {
                $gte:
                    daysBack == 0
                        ? startOfDay(new Date())
                        : subDays(new Date(), daysBack),
                $lte: endOfDay(new Date()),
            },
        });
    }

    async update(id: string, updateLogDto: UpdateLogDto) {
        return await this.logModel.findByIdAndUpdate(
            { _id: id },
            updateLogDto,
            {
                new: true,
                useFindAndModify: false,
            },
        );
    }

    //   remove(id: number) {
    //     return `This action removes a #${id} log`;
    //   }
}
